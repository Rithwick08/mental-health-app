import React, { useEffect, useState } from "react";

export default function QuoteBox() {
  const [quote, setQuote] = useState("Fetching a little inspiration for you…");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    async function fetchQuote() {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL || "http://localhost:4000"}/api/quotes`);
        const data = await res.json();
        setQuote(data.quote);
        setVisible(true);
      } catch {
        setQuote("Even the darkest night will end and the sun will rise.");
        setVisible(true);
      }
    }
    fetchQuote();
  }, []);

  return (
    <div className="card" style={{
      background: 'linear-gradient(135deg, var(--forest) 0%, var(--sage) 100%)',
      color: 'var(--white)',
      padding: '2.5rem 2rem',
      textAlign: 'center',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Decorative circles */}
      <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '140px', height: '140px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
      <div style={{ position: 'absolute', bottom: '-30px', left: '-30px', width: '100px', height: '100px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <p style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.6)', marginBottom: '1rem' }}>
          🌟 Daily Reflection
        </p>
        <blockquote style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: '1.45rem',
          fontStyle: 'italic',
          fontWeight: 500,
          lineHeight: 1.5,
          color: 'rgba(255,255,255,0.95)',
          margin: 0,
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.8s ease',
        }}>
          "{quote}"
        </blockquote>
      </div>
    </div>
  );
}
