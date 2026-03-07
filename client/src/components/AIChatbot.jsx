import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";

export default function AIChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "👋 Hi! I’m MentiAI — your personal mental health companion. How are you feeling today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL || "http://localhost:4000"}/api/ai`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      setMessages([...newMessages, { role: "assistant", text: data.reply }]);
    } catch (err) {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          text: "⚠️ Sorry, I’m having trouble connecting right now. Try again soon!",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* 🌟 Floating Glowing Button */}
      <button
        onClick={() => setOpen(!open)}
        className="position-fixed bottom-4 end-4 rounded-circle text-white d-flex align-items-center justify-content-center shadow-lg"
        style={{
          width: "65px",
          height: "65px",
          zIndex: 1050,
          background: "linear-gradient(135deg, #007bff, #66b2ff)",
          border: "none",
          boxShadow: "0 0 15px rgba(0, 123, 255, 0.8)",
          animation: "pulse 2.5s infinite",
        }}
      >
        {open ? <X size={28} /> : <MessageCircle size={28} />}
      </button>

      {/* 💬 Chat Window */}
      {open && (
        <div
          className="card shadow-lg position-fixed bottom-5 end-5 border-0"
          style={{
            width: "370px",
            height: "470px",
            zIndex: 1049,
            borderRadius: "18px",
            overflow: "hidden",
          }}
        >
          <div
            className="card-header text-white fw-bold d-flex justify-content-between align-items-center"
            style={{
              background: "linear-gradient(135deg, #007bff, #66b2ff)",
            }}
          >
            <span>💬 MentiAI Companion</span>
            <button
              onClick={() => setOpen(false)}
              className="btn btn-sm btn-light text-primary"
            >
              Close
            </button>
          </div>

          <div
            className="card-body overflow-auto p-3"
            style={{ height: "360px", background: "#f5f9ff" }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`d-flex mb-2 ${
                  msg.role === "assistant" ? "justify-content-start" : "justify-content-end"
                }`}
              >
                <div
                  className={`p-2 px-3 rounded-3 shadow-sm ${
                    msg.role === "assistant"
                      ? "bg-white text-dark"
                      : "bg-primary text-white"
                  }`}
                  style={{ maxWidth: "75%" }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="text-muted small mt-2">MentiAI is thinking...</div>
            )}
          </div>

          <form
            onSubmit={handleSend}
            className="card-footer d-flex border-top"
            style={{ background: "#f0f5ff" }}
          >
            <input
              type="text"
              className="form-control me-2"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
            />
            <button
              className="btn btn-primary"
              type="submit"
              disabled={loading}
              style={{ borderRadius: "8px" }}
            >
              Send
            </button>
          </form>
        </div>
      )}

      {/* ✨ Glow Animation */}
      <style>{`
        @keyframes pulse {
          0% { box-shadow: 0 0 10px rgba(0, 123, 255, 0.6); }
          50% { box-shadow: 0 0 25px rgba(0, 123, 255, 0.9); }
          100% { box-shadow: 0 0 10px rgba(0, 123, 255, 0.6); }
        }
      `}</style>
    </>
  );
}