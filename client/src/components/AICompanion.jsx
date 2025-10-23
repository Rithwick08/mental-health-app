import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export default function AICompanion() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [typingText, setTypingText] = useState("");
  const [riskAlert, setRiskAlert] = useState(false);
  const [resources, setResources] = useState([]);

  const location = useLocation();
  const endOfChatRef = useRef(null);

  const getTone = () => {
    if (location.pathname.includes("journal")) return "empathetic and reflective";
    if (location.pathname.includes("exercises")) return "calm and mindful";
    if (location.pathname.includes("dashboard")) return "motivational and supportive";
    return "friendly and general";
  };

  // Scroll to latest message
  useEffect(() => {
    if (endOfChatRef.current) {
      endOfChatRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat, typingText]);

  const typeText = (text) => {
    setTypingText("");
    let i = 0;
    const interval = setInterval(() => {
      setTypingText((prev) => prev + text.charAt(i));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 25);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newChat = [...chat, { sender: "user", text: message }];
    setChat(newChat);
    setMessage("");
    setLoading(true);
    setTypingText("");
    setRiskAlert(false);
    setResources([]);

    try {
      const recentMessages = newChat.slice(-6);
      const res = await fetch("http://localhost:4000/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversation: recentMessages,
          tone: getTone(),
        }),
      });

      const data = await res.json();
      const replyText = data.reply || "I'm here for you.";

      // Check for risk response
      if (data.risk) {
        setRiskAlert(true);
        setResources(data.resources || []);
      }

      typeText(replyText);

      setTimeout(() => {
        setChat((prev) => [...prev, { sender: "ai", text: replyText }]);
        setTypingText("");
      }, replyText.length * 25 + 300);
    } catch (err) {
      console.error("AI fetch error:", err);
      setChat([...newChat, { sender: "ai", text: "Sorry, something went wrong." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 9999,
      }}
    >
      {!open && (
        <button
          onClick={() => setOpen(true)}
          style={{
            backgroundColor: "#4A90E2",
            border: "none",
            color: "white",
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
            fontSize: "28px",
            cursor: "pointer",
            transition: "transform 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          title="Chat with AI Companion"
        >
          💬
        </button>
      )}

      {open && (
        <div
          className="shadow-lg"
          style={{
            width: "320px",
            height: "480px",
            backgroundColor: "#fff",
            borderRadius: "16px",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            boxShadow: "0 0 15px rgba(0,0,0,0.25)",
          }}
        >
          {/* Header */}
          <div
            style={{
              backgroundColor: "#4A90E2",
              color: "white",
              padding: "10px 15px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <strong>AI Companion</strong>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: "none",
                border: "none",
                color: "white",
                fontSize: "20px",
                cursor: "pointer",
              }}
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              padding: "10px",
              overflowY: "auto",
              backgroundColor: "#f8f9fa",
            }}
          >
            {chat.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  textAlign: msg.sender === "user" ? "right" : "left",
                  marginBottom: "10px",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    backgroundColor: msg.sender === "user" ? "#DCF8C6" : "#E9ECEF",
                    color: "#333",
                    padding: "8px 12px",
                    borderRadius: "15px",
                    maxWidth: "75%",
                    wordWrap: "break-word",
                  }}
                >
                  {msg.text}
                </span>
              </div>
            ))}

            {typingText && (
              <div
                style={{
                  textAlign: "left",
                  backgroundColor: "#E9ECEF",
                  color: "#333",
                  display: "inline-block",
                  padding: "8px 12px",
                  borderRadius: "15px",
                  marginBottom: "10px",
                }}
              >
                {typingText}
                <span className="blinking-cursor">▋</span>
              </div>
            )}

            {/* Crisis alert box */}
            {riskAlert && (
              <div
                style={{
                  backgroundColor: "#ffe6e6",
                  border: "1px solid #ff4d4d",
                  borderRadius: "10px",
                  padding: "10px",
                  marginTop: "10px",
                }}
              >
                <strong style={{ color: "#c00" }}>
                  ⚠️ If you're in immediate danger, please call your local emergency number.
                </strong>
                <p style={{ fontSize: "14px", marginTop: "5px" }}>
                  Here are some helpful resources:
                </p>
                <ul style={{ textAlign: "left", fontSize: "13px", paddingLeft: "15px" }}>
                  {resources.map((r, i) => (
                    <li key={i}>
                      <strong>{r.title}</strong>
                      {r.phone && (
                        <div>
                          📞 <a href={`tel:${r.phone}`}>{r.phone}</a>
                        </div>
                      )}
                      {r.url && (
                        <div>
                          🔗{" "}
                          <a href={r.url} target="_blank" rel="noreferrer">
                            Visit
                          </a>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div ref={endOfChatRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSend}
            style={{
              display: "flex",
              borderTop: "1px solid #ddd",
              padding: "8px",
            }}
          >
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                padding: "8px",
              }}
            />
            <button
              type="submit"
              style={{
                backgroundColor: "#4A90E2",
                color: "white",
                border: "none",
                borderRadius: "8px",
                padding: "8px 12px",
                marginLeft: "6px",
              }}
              disabled={loading}
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}