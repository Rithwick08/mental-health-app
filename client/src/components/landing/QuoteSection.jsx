import { useEffect, useState } from "react";

export default function QuoteSection() {
  const [quote, setQuote] = useState("Loading a thought for you…");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL || "http://localhost:4000"}/api/quotes`)
      .then(res => res.json())
      .then(data => { setQuote(data.quote); setVisible(true); })
      .catch(() => { setQuote("Every moment of stillness is a seed of peace."); setVisible(true); });
  }, []);

  return (
    <section className="mh-quote-band">
      <p style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.5)', marginBottom: '1.25rem', position: 'relative' }}>
        🌟 Daily Reflection
      </p>
      <blockquote style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.8s ease', position: 'relative' }}>
        "{quote}"
      </blockquote>
    </section>
  );
}
