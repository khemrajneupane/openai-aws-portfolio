"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import React from "react";
import "./OpenAiChatWindow.css";

const ChatWindow = () => {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  const { data } = useSession();
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    if (data?.user?.email) {
      setLoading(true);
      try {
        const res = await fetch(
          `https://chatbot-flask-gr15.onrender.com/chat`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: input }),
          }
        );
        const data = await res.json();

        setMessages((prev) => [
          ...prev,
          { role: "bot", content: data.response },
        ]);
      } catch (error) {
        setMessages((prev) => [
          ...prev,
          { role: "bot", content: `Something went wrong! Error: ${error}` },
        ]);
      } finally {
        setLoading(false);
      }
    } else {
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: `no session, please login to use chat` },
      ]);
    }
  };

  return (
    <>
      <div className="chat-widget-container">
        <div className="chat-widget-relative">
          {isOpen && (
            <button
              onClick={() => setIsOpen(false)}
              className="chat-widget-close-button"
            >
              <i className="ri-close-circle-fill chat-widget-close-icon"></i>
            </button>
          )}
          {isOpen && (
            <div className="chat-widget-box">
              <h1 className="hello-title">Hello I am OpenAI Chat</h1>
              <div className="chat-widget-messages-container">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`chat-widget-message ${
                      msg.role === "user"
                        ? "chat-widget-user-message"
                        : "chat-widget-bot-message"
                    }`}
                  >
                    {msg.role === "user" ? (
                      <i className="ri-chat-ai-fill chat-widget-message-icon"></i>
                    ) : (
                      <i className="ri-robot-3-line chat-widget-message-icon"></i>
                    )}
                    {`: ${msg.content}`}
                  </div>
                ))}
                {loading && (
                  <div className="chat-widget-message chat-widget-bot-message">
                    <i className="ri-robot-3-line chat-widget-message-icon"></i>
                    : Loading...
                  </div>
                )}
              </div>
              <div className="chat-widget-input-container">
                <input
                  className="chat-widget-input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Ask anything..."
                />
                <button
                  onClick={sendMessage}
                  className="chat-widget-send-button"
                >
                  <i className="ri-send-plane-fill chat-widget-send-icon"></i>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="chat-widget-toggle-button"
        >
          <i className="ri-chat-4-line chat-widget-toggle-icon"></i>
        </button>
      )}
    </>
  );
};
export default ChatWindow;
