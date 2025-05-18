"use client";

import { useState } from "react";

interface Props {
  onClose: () => void;
}

export default function ChatWindow({ onClose }: Props) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>(
    []
  );

  async function sendMessage() {
    if (!input) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ message: input }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    const botMsg = { sender: "bot", text: data.reply };
    setMessages((prev) => [...prev, botMsg]);
  }

  return (
    <div className="w-80 h-96 bg-white border rounded-xl shadow-xl flex flex-col">
      <div className="flex justify-between items-center p-2 border-b bg-blue-100">
        <span className="font-bold">Ask Me</span>
        <button onClick={onClose} className="text-sm text-red-500">
          ×
        </button>
      </div>
      <div className="flex-1 overflow-auto p-2 space-y-2 text-sm">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`p-2 rounded-md \${m.sender === "user" ? "bg-blue-100" : "bg-gray-100"}`}
          >
            <strong>{m.sender === "user" ? "You" : "AI"}:</strong> {m.text}
          </div>
        ))}
      </div>
      <div className="p-2 border-t flex">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 border rounded-l px-2 py-1 text-sm"
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-3 rounded-r text-sm"
        >
          Send
        </button>
      </div>
    </div>
  );
}
