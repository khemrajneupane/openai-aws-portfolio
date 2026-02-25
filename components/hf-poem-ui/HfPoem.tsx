"use client";
import { useState } from "react";
import { Client } from "@gradio/client";

export default function PoemPage() {
  const [input, setInput] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  // async function send() {
  //   setLoading(true);

  //   const res = await fetch("/api/auth/hf-poem", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ message: input }),
  //   });

  //   const data = await res.json();
  //   setReply(data.reply);
  //   setLoading(false);
  // }
  async function send() {
    setLoading(true);

    try {
      const client = await Client.connect("khemn/poetic-assistant-space");

      const result = await client.predict("/generate_poem", {
        message: input,
      });

      setReply(result.data as string);
    } catch (err) {
      console.error(err);
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
            Thinking...
          </span>
        ) : (
          <span className="cursor-pointer">Ask</span>
        )}
      </button>

      {reply && (
        <pre className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200 font-mono text-sm whitespace-pre-wrap break-words text-gray-800">
          {reply}
        </pre>
      )}
    </div>
  );
}
