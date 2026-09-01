"use client";
import { useState } from "react";

const backendBaseUrl =
  process.env.NEXT_PUBLIC_POEM_BACKEND_URL?.replace(/\/$/, "") || "";

export default function PoemPage() {
  const [input, setInput] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  async function pollForPoem(jobId: string) {
    const startedAt = Date.now();

    while (true) {
      const statusRes = await fetch(
        `${backendBaseUrl}/api/poem/${jobId}/status`,
      );
      const statusData = await statusRes.json();

      if (!statusRes.ok) {
        throw new Error(statusData?.error || "Failed to check poem status");
      }

      if (statusData.status === "completed") {
        return statusData.result;
      }

      if (statusData.status === "failed") {
        throw new Error(statusData.error || "Poem generation failed");
      }

      const elapsedSeconds = Math.floor((Date.now() - startedAt) / 1000);
      const note =
        elapsedSeconds < 20
          ? "Generating your poem... this can take a little while."
          : "Still working on it — the model is processing your prompt.";

      setStatusMessage(note);
      await new Promise((resolve) => setTimeout(resolve, 4000));
    }
  }

  async function send() {
    if (!backendBaseUrl) {
      setReply("The poem backend is not configured yet.");
      return;
    }

    setLoading(true);
    setReply("");
    setStatusMessage("Preparing your poem request...");

    try {
      const res = await fetch(`${backendBaseUrl}/api/poem`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: input,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Failed to generate poem");
      }

      const poem = await pollForPoem(data.jobId);
      setReply(poem);
      setStatusMessage("");
    } catch (err) {
      console.error(err);
      setReply(
        err instanceof Error
          ? err.message
          : "Something went wrong while generating the poem.",
      );
      setStatusMessage("The request could not be completed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white mx-auto my-10 p-6 rounded-lg shadow-lg border border-gray-200">
      <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">
        Poetic Assistant (Fine-Tuned Phi-3 Model)
      </h1>
      <p className="text-slate-500">
        This assistant is a custom fine-tuned language model trained to
        transform any question into a titled poem. It generates structured
        verses with rhythm and imagery, demonstrating instruction-based
        fine-tuning and controlled text generation. The model is deployed on a
        free-tier CPU environment in HuggingFace without GPU support. Hence,
        inference latency can range from 1-3 minutes per request.
      </p>
      <textarea
        rows={3}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none mb-4 font-mono"
        placeholder="Ask me something poetic...I will reply with a poem!"
      />

      <button
        onClick={send}
        disabled={loading || !input.trim()}
        className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] ${
          loading
            ? "bg-indigo-300 cursor-not-allowed"
            : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-md"
        }`}
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Generating poem...
          </span>
        ) : (
          <span className="cursor-pointer">Ask</span>
        )}
      </button>

      {statusMessage && !reply && (
        <p className="mt-4 text-sm text-slate-600 text-center">
          {statusMessage}
        </p>
      )}

      {reply && (
        <pre className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200 font-mono text-sm whitespace-pre-wrap break-words text-gray-800">
          {reply}
        </pre>
      )}
    </div>
  );
}
