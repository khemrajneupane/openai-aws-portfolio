"use client";

import { useSession } from "next-auth/react";
import React, { useState } from "react";

export default function RAGDashboard() {
  const [file, setFile] = useState<File | null>(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { data } = useSession();

  //const API_BASE = "https://rag-pipeline-langchain.onrender.com";
  const API_BASE = process.env.NEXT_PUBLIC_API_URL;
  //const API_BASE = process.env.NEXT_PUBLIC_API_URL;
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY_PROTECTION || "";

  // ----------------------------
  // Upload new PDF
  // ----------------------------
  async function handleUpload() {
    if (data?.user?.email) {
      if (!file) {
        setError("Please select a PDF first.");
        return;
      }

      setUploading(true);
      setError(null);

      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await fetch(`${API_BASE}/upload_pdf`, {
          method: "POST",
          headers: {
            "X-API-Key": API_KEY,
          },
          body: formData,
        });

        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`Upload failed: ${res.status} ${errorText}`);
        }

        const data = await res.json();

        alert(
          `PDF uploaded successfully! Created ${
            data.chunks_created || "unknown"
          } chunks.`
        );
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.error("Upload error:", err);
        setError(err.message || "Upload failed. Check console for details.");
      } finally {
        setUploading(false);
      }
    } else {
      setError("Please login first.");
    }
  }

  // ----------------------------
  // Ask a RAG question
  // ----------------------------
  async function askQuestion() {
    if (!question.trim()) {
      setError("Please enter a question.");
      return;
    }

    setLoading(true);
    setError(null);
    setAnswer("");

    try {
      console.log("Sending question:", question); // Debug log

      const res = await fetch(`${API_BASE}/ask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-API-Key": API_KEY,
        },
        body: JSON.stringify({ query: question }),
      });

      console.log("Response status:", res.status); // Debug log

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Server error response:", errorText); // Debug log
        throw new Error(`Request failed: ${res.status} ${errorText}`);
      }

      const data = await res.json();
      console.log("Response data:", data); // Debug log

      if (!data.answer) {
        throw new Error("No answer received from server");
      }

      setAnswer(data.answer);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Ask question error:", err);
      setError(
        err.message || "Error asking question. Check console for details."
      );
      setAnswer("");
    } finally {
      setLoading(false);
    }
  }

  // ----------------------------
  // Delete current index (wipe Pinecone)
  // ----------------------------
  async function deleteIndex() {
    if (data?.user?.email) {
      if (!confirm("Are you sure you want to delete all embeddings?")) return;

      setDeleting(true);
      setError(null);

      try {
        const res = await fetch(`${API_BASE}/delete_index`, {
          method: "DELETE",
        });

        if (!res.ok) {
          throw new Error(`Delete failed: ${res.status}`);
        }

        await res.json();

        alert("Index deleted successfully.");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.error("Delete error:", err);
        setError(err.message || "Failed to delete index.");
      } finally {
        setDeleting(false);
      }
    } else {
      setError("Please login first.");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
      <div className="w-full max-w-4xl space-y-8">
        {/* Page Title */}
        <h1 className="text-4xl font-bold text-gray-800 text-center">
          📄 RAG Pipeline Showcase
        </h1>
        <p className="text-center text-gray-600">
          LLM is prompted to answer based on domain specific knowledge. You can
          upload your own document and try to ask questions based on that.
          Currently, only PDF is supported!
        </p>

        {/* Error Display */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <strong>Error: </strong>
            {error}
          </div>
        )}

        {/* Upload Section */}
        <section className="bg-white shadow-md p-6 rounded-xl border">
          <h2 className="text-xl font-semibold mb-3">Upload New PDF</h2>

          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => {
                setFile(e.target.files?.[0] ?? null);
                setError(null);
              }}
              className="w-full border rounded-md p-2"
            />

            <button
              onClick={handleUpload}
              disabled={uploading || !file}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {uploading ? "Uploading..." : "Upload & Process"}
            </button>
          </div>
        </section>

        {/* Ask Question Section */}
        <section className="bg-white shadow-md p-6 rounded-xl border">
          <h2 className="text-xl font-semibold mb-3">Ask Question</h2>

          <textarea
            value={question}
            onChange={(e) => {
              setQuestion(e.target.value);
              setError(null);
            }}
            placeholder="Type your question about the document..."
            className="w-full border rounded-md p-3 h-24"
            onKeyPress={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                askQuestion();
              }
            }}
          />

          <div className="flex gap-3 mt-3">
            <button
              onClick={askQuestion}
              disabled={loading || !question.trim()}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Thinking..." : "Ask Question"}
            </button>
          </div>

          {answer && (
            <div className="mt-4 p-4 bg-gray-100 rounded-md border leading-relaxed">
              <strong className="text-gray-700">Answer:</strong>
              <p className="text-gray-800 mt-2 whitespace-pre-wrap">{answer}</p>
            </div>
          )}
        </section>

        {/* Delete Index Section */}
        <section className="bg-white shadow-md p-6 rounded-xl border">
          <h2 className="text-xl font-semibold mb-3 text-red-600">
            Danger Zone
          </h2>
          <p className="text-gray-600 mb-3 text-sm">
            This will delete all embeddings from Pinecone. You will need to
            re-upload PDFs.
          </p>

          <button
            onClick={deleteIndex}
            disabled={deleting}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition disabled:opacity-60"
          >
            {deleting ? "Deleting..." : "Delete All Embeddings"}
          </button>
        </section>
      </div>
    </div>
  );
}
