require("dotenv").config();

const fs = require("fs-extra");
const path = require("path");
const { randomUUID } = require("crypto");
const fastify = require("fastify");
const cors = require("@fastify/cors");
const multipart = require("@fastify/multipart");
const { createMemoryQueue } = require("./memoryQueue");
const { TEMPLATE_PATH } = require("./paths");

const PORT = Number(process.env.PORT) || 3001;
const MAX_UPLOAD_MB = Number(process.env.MAX_UPLOAD_MB) || 32;
const JOB_TTL_MS = Number(process.env.JOB_TTL_MS) || 45 * 60 * 1000;
const REDIS_URL = process.env.REDIS_URL?.trim();

let backend;
let bullClose;

if (REDIS_URL) {
  const { createBullmqHandlers } = require("./bullmqApp");
  const b = createBullmqHandlers(REDIS_URL);
  backend = {
    type: "redis",
    addJob: (id, buffer, ext) => b.addJob(id, buffer, ext),
    getJobView: (id) => b.getJobView(id),
    getOutputPath: async (id) => {
      const v = await b.getJobView(id);
      if (!v) return { missing: "job" };
      if (v.status !== "completed") return { missing: "not-ready" };
      const p = v.outputPath;
      if (!p || !(await fs.pathExists(p)))
        return { missing: "gone" };
      return { path: p };
    },
  };
  bullClose = () => b.close();
} else {
  const m = createMemoryQueue();
  const jobs = m.jobs;
  backend = {
    type: "memory",
    addJob: (id, buffer, ext) => m.addJob(id, buffer, ext, TEMPLATE_PATH),
    getJobView: (id) => Promise.resolve(m.getJobView(id)),
    getOutputPath: async (id) => {
      const job = jobs.get(id);
      if (!job) return { missing: "job" };
      if (job.status !== "completed") return { missing: "not-ready" };
      const p = job.outputPath;
      if (!p || !(await fs.pathExists(p)))
        return { missing: "gone" };
      return { path: p };
    },
  };

  setInterval(() => {
    const now = Date.now();
    for (const [id, job] of jobs) {
      if (job.completedAt && now - job.completedAt > JOB_TTL_MS) {
        if (job.tmpRoot) fs.remove(job.tmpRoot).catch(() => {});
        jobs.delete(id);
      }
    }
  }, 60 * 1000);
}

async function buildServer() {
  const app = fastify({ logger: true });

  await app.register(cors, { origin: true });
  await app.register(multipart, {
    limits: { fileSize: MAX_UPLOAD_MB * 1024 * 1024 },
  });

  app.get("/api/health", async () => ({
    ok: true,
    queue: REDIS_URL ? "redis+bullmq" : "memory",
    template: (await fs.pathExists(TEMPLATE_PATH)) ? "present" : "missing",
  }));

  app.post("/api/jobs", async (request, reply) => {
    if (!(await fs.pathExists(TEMPLATE_PATH))) {
      return reply.code(503).send({
        error:
          "Base world template is missing. Place void-world-bedrock.mcworld in server/assets/ or set VOID_WORLD_PATH.",
      });
    }

    const file = await request.file();
    if (!file) {
      return reply.code(400).send({ error: "Expected multipart field \"file\"." });
    }

    const ext = path.extname(file.filename || "").toLowerCase();
    if (ext !== ".schem" && ext !== ".schematic") {
      return reply
        .code(400)
        .send({ error: "Only .schem or .schematic files are accepted." });
    }

    const buf = await file.toBuffer();
    const id = randomUUID();
    await backend.addJob(id, buf, ext);
    return { jobId: id };
  });

  app.get("/api/jobs/:id", async (request, reply) => {
    const view = await backend.getJobView(request.params.id);
    if (!view) return reply.code(404).send({ error: "Job not found." });
    return {
      id: view.id,
      status: view.status,
      queuePosition: view.queuePosition,
      error: view.error,
      progress: view.progress,
      stats: view.stats,
    };
  });

  app.get("/api/jobs/:id/download", async (request, reply) => {
    const out = await backend.getOutputPath(request.params.id);
    if (out.missing === "job") {
      return reply.code(404).send({ error: "Job not found." });
    }
    if (out.missing === "not-ready") {
      return reply.code(409).send({ error: "Job is not ready for download." });
    }
    if (out.missing === "gone") {
      return reply
        .code(410)
        .send({ error: "Download expired or output was removed." });
    }

    const stream = fs.createReadStream(out.path);
    reply.header("Content-Type", "application/zip");
    reply.header(
      "Content-Disposition",
      'attachment; filename="converted.mcworld"',
    );
    return reply.send(stream);
  });

  return app;
}

buildServer()
  .then(async (app) => {
    await app.listen({ port: PORT, host: "0.0.0.0" });
    app.log.info(
      `Listening on ${PORT} (queue: ${REDIS_URL ? "Redis+BullMQ" : "in-memory"})`,
    );
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

async function shutdown() {
  if (bullClose) await bullClose();
  process.exit(0);
}
process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
