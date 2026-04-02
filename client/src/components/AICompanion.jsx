import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const LeafBubble = () => (
  <div style={{
    width: 42, height: 42, borderRadius: '50%',
    background: 'linear-gradient(135deg, var(--sage), var(--teal))',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '1.1rem', flexShrink: 0,
  }}>🌿</div>
);

export default function AICompanion() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([{ sender: "ai", text: "Hello 🌿 I'm here with you. How are you feeling right now?" }]);
  const [loading, setLoading] = useState(false);
  const [typingText, setTypingText] = useState("");
  const [riskAlert, setRiskAlert] = useState(false);
  const [resources, setResources] = useState([]);
  const location = useLocation();
  const endRef = useRef(null);
  const inputRef = useRef(null);

  const getTone = () => {
    if (location.pathname.includes("journal")) return "empathetic and reflective";
    if (location.pathname.includes("exercises")) return "calm and mindful";
    if (location.pathname.includes("dashboard")) return "motivational and supportive";
    return "warm and caring";
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat, typingText]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 200);
  }, [open]);

  const typeText = (text) => {
    setTypingText("");
    let i = 0;
    const interval = setInterval(() => {
      setTypingText((prev) => prev + text.charAt(i));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 22);
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
      const res = await fetch(`${process.env.REACT_APP_API_URL || "http://localhost:4000"}/api/ai`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversation: recentMessages, tone: getTone() }),
      });
      const data = await res.json();
      const replyText = data.reply || "I'm here for you. 🌿";
      if (data.risk) { setRiskAlert(true); setResources(data.resources || []); }
      typeText(replyText);
      setTimeout(() => {
        setChat((prev) => [...prev, { sender: "ai", text: replyText }]);
        setTypingText("");
      }, replyText.length * 22 + 300);
    } catch {
      setChat((prev) => [...prev, { sender: "ai", text: "I'm sorry, something went wrong. Please try again 🌿" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: "fixed", bottom: "24px", right: "24px", zIndex: 9999 }}>
      {/* Floating button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          style={{
            width: "58px", height: "58px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, var(--sage), var(--teal))",
            border: "none",
            color: "white",
            fontSize: "1.5rem",
            cursor: "pointer",
            boxShadow: "0 4px 20px rgba(107,143,113,0.45)",
            transition: "all 0.25s ease",
            display: "flex", alignItems: "center", justifyContent: "center",
            position: "relative",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.1)"; e.currentTarget.style.boxShadow = "0 6px 28px rgba(107,143,113,0.55)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(107,143,113,0.45)"; }}
          title="Chat with your AI Companion"
        >
          🌿
          {/* Pulse ring */}
          <span style={{
            position: 'absolute', inset: '-4px', borderRadius: '50%',
            border: '2px solid var(--sage-light)',
            animation: 'pulse-ring 2.5s ease-out infinite',
            pointerEvents: 'none',
          }} />
        </button>
      )}

      {/* Chat window */}
      {open && (
        <div style={{
          width: "340px",
          height: "500px",
          background: "var(--cream)",
          borderRadius: "var(--radius-xl)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          boxShadow: "0 12px 48px rgba(45,74,53,0.22)",
          animation: "fadeUp 0.3s ease",
        }}>
          {/* Header */}
          <div style={{
            background: "linear-gradient(135deg, var(--forest), var(--sage))",
            padding: "1rem 1.25rem",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            flexShrink: 0,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>
                🌿
              </div>
              <div>
                <div style={{ color: "white", fontWeight: 700, fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem", lineHeight: 1.1 }}>
                  Your Companion
                </div>
                <div style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.72rem" }}>
                  Always here for you
                </div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{ background: "rgba(255,255,255,0.15)", border: "none", color: "white", width: 28, height: 28, borderRadius: "50%", cursor: "pointer", fontSize: "1rem", display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.25)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, padding: "1rem", overflowY: "auto", display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {chat.map((msg, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'flex-end', gap: '0.5rem', flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row' }}>
                {msg.sender === 'ai' && <LeafBubble />}
                <div style={{
                  maxWidth: "72%",
                  padding: "0.65rem 0.9rem",
                  borderRadius: msg.sender === 'user' ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                  background: msg.sender === 'user' ? 'linear-gradient(135deg, var(--sage), var(--teal))' : 'var(--white)',
                  color: msg.sender === 'user' ? 'white' : 'var(--text-dark)',
                  fontSize: "0.88rem",
                  lineHeight: 1.6,
                  boxShadow: 'var(--shadow-sm)',
                  wordBreak: 'break-word',
                }}>
                  {msg.text}
                </div>
              </div>
            ))}

            {typingText && (
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.5rem' }}>
                <LeafBubble />
                <div style={{
                  maxWidth: "72%", padding: "0.65rem 0.9rem",
                  borderRadius: "18px 18px 18px 4px",
                  background: 'var(--white)', fontSize: "0.88rem", lineHeight: 1.6,
                  boxShadow: 'var(--shadow-sm)', color: 'var(--text-dark)',
                }}>
                  {typingText}
                  <span style={{ display: 'inline-block', width: '2px', height: '14px', background: 'var(--sage)', marginLeft: '2px', verticalAlign: 'middle', animation: 'fadeIn 0.6s ease infinite alternate' }} />
                </div>
              </div>
            )}

            {/* Crisis alert */}
            {riskAlert && (
              <div style={{
                background: 'var(--danger-bg)', border: '1px solid rgba(192,97,79,0.3)',
                borderRadius: 'var(--radius-sm)', padding: '0.85rem',
                fontSize: '0.82rem', color: 'var(--text-dark)',
              }}>
                <div style={{ fontWeight: 700, color: 'var(--danger-soft)', marginBottom: '0.4rem' }}>
                  ⚠️ If you're in immediate danger, please call emergency services.
                </div>
                <ul style={{ paddingLeft: '1rem', margin: 0 }}>
                  {resources.map((r, i) => (
                    <li key={i} style={{ marginBottom: '0.3rem' }}>
                      <strong>{r.title}</strong>
                      {r.phone && <div>📞 <a href={`tel:${r.phone}`} style={{ color: 'var(--teal)' }}>{r.phone}</a></div>}
                      {r.url && <div>🔗 <a href={r.url} target="_blank" rel="noreferrer" style={{ color: 'var(--teal)' }}>Visit resource</a></div>}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {loading && !typingText && (
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.5rem' }}>
                <LeafBubble />
                <div style={{ padding: '0.65rem 0.9rem', borderRadius: "18px 18px 18px 4px", background: 'var(--white)', boxShadow: 'var(--shadow-sm)', display: 'flex', gap: '4px', alignItems: 'center' }}>
                  {[0, 1, 2].map(i => (
                    <span key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--sage-light)', display: 'inline-block', animation: `fadeIn 0.8s ease ${i * 0.2}s infinite alternate` }} />
                  ))}
                </div>
              </div>
            )}

            <div ref={endRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSend} style={{
            display: "flex", gap: "0.5rem",
            padding: "0.75rem 1rem",
            borderTop: "1px solid var(--sage-mist)",
            background: 'var(--white)',
            flexShrink: 0,
          }}>
            <input
              ref={inputRef}
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Share what's on your mind…"
              style={{
                flex: 1, border: "1.5px solid var(--sage-mist)", borderRadius: "50px",
                padding: "0.55rem 1rem", outline: "none", fontSize: "0.88rem",
                background: 'var(--cream)', color: 'var(--text-dark)', fontFamily: "'Nunito', sans-serif",
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--sage)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--sage-mist)'}
            />
            <button
              type="submit"
              disabled={loading || !message.trim()}
              style={{
                background: message.trim() ? 'linear-gradient(135deg, var(--sage), var(--teal))' : 'var(--sage-mist)',
                color: message.trim() ? 'white' : 'var(--text-light)',
                border: "none", borderRadius: "50px",
                padding: "0.55rem 1rem", cursor: message.trim() ? "pointer" : "default",
                fontSize: "0.85rem", fontWeight: 600, fontFamily: "'Nunito', sans-serif",
                transition: 'all 0.2s',
              }}
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
