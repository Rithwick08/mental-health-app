import React, { useState, useEffect } from "react";

const LeafSVG = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ color: 'var(--sage)' }}>
    <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20C19 20 22 3 22 3c-1 2-8 5-8 5z" />
  </svg>
);

export default function Navigation({ navigate }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`mh-landing-nav ${scrolled ? "scrolled" : ""}`}>
      <a href="/" className="mh-nav-brand">
        <LeafSVG /> MentiHaven
      </a>
      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
        <button
          onClick={() => navigate("/login")}
          style={{
            background: 'transparent', border: 'none',
            fontFamily: "'Nunito', sans-serif", fontWeight: 600,
            fontSize: '0.9rem', cursor: 'pointer',
            color: scrolled ? 'var(--text-medium)' : 'var(--forest)',
            padding: '0.45rem 0.9rem', borderRadius: '50px',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'var(--sage-bg)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
        >
          Sign In
        </button>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/register")}
          style={{ fontSize: '0.9rem', padding: '0.5rem 1.25rem' }}
        >
          Get Started
        </button>
      </div>
    </nav>
  );
}
