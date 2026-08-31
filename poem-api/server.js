require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Client } = require("@gradio/client");

const app = express();
const port = process.env.PORT || 4000;

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

    const appReference =
      process.env.GRADIO_APP_REFERENCE || "khemn/poetic-assistant-space";
    const client = await Client.connect(appReference);
    const result = await client.predict("/generate_poem", {
      message: String(message),
    });

    const poem = Array.isArray(result.data) ? result.data[0] : undefined;

    if (typeof poem !== "string" || poem.trim() === "") {
      return res.status(500).json({
        error: "Poem generation returned an invalid response",
      });
    }

    return res.json({ reply: poem });
  } catch (error) {
    console.error("Poem generation error:", error);
    return res.status(500).json({ error: "Failed to generate poem" });
  }
});

app.listen(port, () => {
  console.log(`Poem API running on http://localhost:${port}`);
});
