/**
 * BullMQ + Redis: global FIFO queue, concurrency 1, job progress for GET /api/jobs/:id
 */

const fs = require("fs-extra");
const path = require("path");
const os = require("os");
const { Queue, Worker } = require("bullmq");
const IORedis = require("ioredis");
const { TEMPLATE_PATH } = require("./paths");

const QUEUE_NAME = "schematic-convert";

function createRedisConnection(url) {
  return new IORedis(url, { maxRetriesPerRequest: null });
}

function createBullmqHandlers(redisUrl) {
  const connection = createRedisConnection(redisUrl);
  const workerConnection = connection.duplicate();
  const queue = new Queue(QUEUE_NAME, {
    connection,
    defaultJobOptions: {
      removeOnComplete: { age: 24 * 3600, count: 5000 },
      removeOnFail: { age: 7 * 24 * 3600 },
      attempts: 1,
    },
  });

  const worker = new Worker(
    QUEUE_NAME,
    async (job) => {
      const { convertSchematicToMcworld } = require("./convert");
      const { uploadPath, templatePath } = job.data;
      const buf = await fs.readFile(uploadPath);
      const result = await convertSchematicToMcworld(buf, templatePath, {
        onProgress(current, total) {
          return job
            .updateProgress({ step: "convert", current, total })
            .catch(() => {});
        },
      });
      await fs.remove(uploadPath).catch(() => {});
      const parent = path.dirname(uploadPath);
      await fs.remove(parent).catch(() => {});
      return {
        outputPath: result.outputPath,
        tmpRoot: result.tmpRoot,
        stats: result.stats,
      };
    },
    { connection: workerConnection, concurrency: 1 },
  );

  worker.on("failed", (job, err) => {
    console.error("[worker]", job?.id, err);
    if (job?.data?.uploadPath) {
      fs.remove(path.dirname(job.data.uploadPath)).catch(() => {});
    }
  });

  async function addJob(jobId, buffer, ext) {
    const dir = path.join(os.tmpdir(), "ct-uploads", jobId);
    await fs.mkdir(dir, { recursive: true });
    const uploadPath = path.join(dir, `input${ext}`);
    await fs.writeFile(uploadPath, buffer);
    await queue.add(
      "convert",
      { uploadPath, templatePath: TEMPLATE_PATH, jobId },
      { jobId },
    );
  }

  async function getJobView(id) {
    const job = await queue.getJob(id);
    if (!job) return null;
    const state = await job.getState();
    const progress = job.progress;

    let queuePosition;
    if (state === "waiting" || state === "delayed") {
      const waiting = await queue.getWaiting(0, 5000);
      const idx = waiting.findIndex((j) => String(j.id) === String(id));
      queuePosition = idx >= 0 ? idx : undefined;
    }

    const statusMap = {
      waiting: "queued",
      delayed: "queued",
      active: "active",
      completed: "completed",
      failed: "failed",
      paused: "queued",
    };
    const status = statusMap[state] || state;

    let error;
    let stats;
    let outputPath;
    if (state === "failed") {
      error = job.failedReason || "Job failed";
    }
    let rv = job.returnvalue;
    if (rv && typeof rv === "string") {
      try {
        rv = JSON.parse(rv);
      } catch {
        rv = null;
      }
    }
    if (state === "completed" && rv) {
      stats = rv.stats;
      outputPath = rv.outputPath;
    }

    return {
      id: String(job.id),
      status,
      queuePosition,
      error,
      progress,
      stats,
      outputPath,
      tmpRoot: rv?.tmpRoot,
    };
  }

  async function close() {
    await worker.close();
    await queue.close();
    await workerConnection.quit();
    await connection.quit();
  }

  return { queue, worker, connection, addJob, getJobView, close };
}

module.exports = { createBullmqHandlers, QUEUE_NAME };
