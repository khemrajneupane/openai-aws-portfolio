require("dotenv").config();
const express = require("express");
const cors = require("cors");
const crypto = require("crypto");
const { Client } = require("@gradio/client");

const app = express();
const port = process.env.PORT || 4000;
const appReference =
  process.env.GRADIO_APP_REFERENCE || "khemn/poetic-assistant-space";

const jobs = new Map();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/poem", async (req, res) => {
  try {
    const { message } = req.body || {};

    if (!message || !String(message).trim()) {
      return res.status(400).json({ error: "Message is required" });
    }

    const jobId = crypto.randomUUID();
    jobs.set(jobId, {
      status: "queued",
      result: null,
      error: null,
    });

    setImmediate(async () => {
      const job = jobs.get(jobId);
      if (!job) return;

      job.status = "running";

      try {
        const client = await Client.connect(appReference);
        const result = await client.predict("/generate_poem", {
          message: String(message),
        });

        const poem = Array.isArray(result.data) ? result.data[0] : undefined;

        if (typeof poem !== "string" || poem.trim() === "") {
          throw new Error("Poem generation returned an invalid response");
        }

        job.status = "completed";
        job.result = poem;
        job.error = null;
      } catch (error) {
        console.error("Poem generation error:", error);
        job.status = "failed";
        job.result = null;
        job.error = error?.message || "Failed to generate poem";
      }
    });

    return res.status(202).json({ jobId, status: "queued" });
  } catch (error) {
    console.error("Poem job creation error:", error);
    return res.status(500).json({ error: "Failed to create poem job" });
  }
});

app.get("/api/poem/:jobId/status", (req, res) => {
  const job = jobs.get(req.params.jobId);

  if (!job) {
    return res.status(404).json({ error: "Job not found" });
  }

  return res.json({
    jobId: req.params.jobId,
    status: job.status,
    result: job.result,
    error: job.error,
  });
});

app.listen(port, () => {
  console.log(`Poem API running on http://localhost:${port}`);
});
