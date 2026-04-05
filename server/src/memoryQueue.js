/**
 * In-process FIFO queue when REDIS_URL is unset (local dev without Redis).
 */

const fs = require("fs-extra");

function createMemoryQueue() {
  const jobs = new Map();
  const queue = [];
  let processing = false;

  function jobPublic(job) {
    const q = queue.indexOf(job.id);
    return {
      id: job.id,
      status: job.status,
      queuePosition:
        job.status === "queued" && q >= 0 ? q : undefined,
      error: job.error || undefined,
      progress: job.progress,
      stats: job.stats,
      outputPath: job.outputPath,
    };
  }

  async function runNext() {
    if (processing || queue.length === 0) return;
    processing = true;
    const id = queue.shift();
    const job = jobs.get(id);
    if (!job || job.status !== "queued") {
      processing = false;
      return runNext();
    }

    job.status = "active";
    job.progress = { step: "convert", current: 0, total: 1 };

    try {
      const { convertSchematicToMcworld } = require("./convert");
      const result = await convertSchematicToMcworld(job.buffer, job.templatePath, {
        onProgress(current, total) {
          job.progress = { step: "convert", current, total };
        },
      });
      job.buffer = null;
      job.outputPath = result.outputPath;
      job.tmpRoot = result.tmpRoot;
      job.stats = result.stats;
      job.status = "completed";
      job.completedAt = Date.now();
    } catch (err) {
      job.status = "failed";
      job.error = err.message || String(err);
      job.buffer = null;
    }

    job.progress = undefined;
    processing = false;
    runNext();
  }

  function enqueue(jobId) {
    queue.push(jobId);
    runNext();
  }

  return {
    jobs,
    async addJob(jobId, buffer, ext, tpl) {
      jobs.set(jobId, {
        id: jobId,
        status: "queued",
        buffer,
        templatePath: tpl,
        createdAt: Date.now(),
      });
      enqueue(jobId);
    },
    getJobView(id) {
      const job = jobs.get(id);
      if (!job) return null;
      return jobPublic(job);
    },
  };
}

module.exports = { createMemoryQueue };
