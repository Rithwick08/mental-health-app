import React from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "./Navigation";
import FeatureCard from "./FeatureCard";
import QuoteSection from "./QuoteSection";
import heroImage from "../../assets/hero-mental-health.jpg";
import "./landing.css";

const features = [
  {
    icon: "🌡️",
    title: "Mood Check-In",
    description: "Log how you feel each day with a simple, intuitive emoji picker. Build emotional self-awareness over time.",
  },
  {
    icon: "📈",
    title: "Mood Journey",
    description: "Visualise your emotional trends with a calm, beautiful chart. See your growth unfold over days and weeks.",
  },
  {
    icon: "📓",
    title: "Private Journal",
    description: "Write freely in your safe, private space. Journaling helps process thoughts and find clarity.",
  },
  {
    icon: "🌿",
    title: "Mindful Exercises",
    description: "Guided breathing, relaxation, and mindfulness practices with a gentle timer to anchor you in the present.",
  },
  {
    icon: "🤖",
    title: "AI Companion",
    description: "A warm, empathetic AI companion — always available to listen, reflect, and support your mental health journey.",
  },
  {
    icon: "🌟",
    title: "Daily Reflection",
    description: "Start each day with a curated, thoughtful quote to inspire your mood and set a peaceful intention.",
  },
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div style={{ background: 'var(--cream)', overflowX: 'hidden' }}>
      <Navigation navigate={navigate} />

      {/* Hero */}
      <section className="mh-hero">
        <div className="mh-hero-bg" />

        <div className="mh-hero-image">
          <img src={heroImage} alt="Peaceful nature scene" />
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 2, paddingTop: '6rem', paddingBottom: '4rem' }}>
          <div className="mh-hero-content">
            <div className="mh-hero-eyebrow">
              🌿 Mental Wellness Sanctuary
            </div>

            <h1>
              Find your <em>calm</em> within the storm
            </h1>

            <p className="mh-hero-lead">
              MentiHaven is a gentle space for tracking your mood, journaling your thoughts, and practising mindfulness — with a caring AI companion by your side.
            </p>

            <div className="mh-hero-actions">
              <button
                className="btn btn-primary"
                onClick={() => navigate("/register")}
                style={{ padding: '0.75rem 2rem', fontSize: '1rem' }}
              >
                Start Your Journey
              </button>
              <a
                href="#features"
                className="btn btn-outline-primary"
                style={{ padding: '0.75rem 1.75rem', fontSize: '1rem' }}
              >
                Explore Features
              </a>
            </div>

            {/* Trust signals */}
            <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              {["🔒 Private & Secure", "💚 Free to Use", "🌍 Always Available"].map((tag) => (
                <span key={tag} style={{ fontSize: '0.82rem', color: 'var(--text-medium)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quote Band */}
      <QuoteSection />

      {/* Features */}
      <section id="features" className="mh-features">
        <div className="container">
          <div style={{ maxWidth: '520px', marginBottom: '3.5rem' }}>
            <p className="mh-section-label">What's inside</p>
            <h2 className="mh-section-title">
              Everything you need for mental well-being
            </h2>
            <p style={{ color: 'var(--text-medium)', fontSize: '1rem', lineHeight: 1.8, margin: 0 }}>
              A thoughtfully crafted set of tools — simple to use, designed to genuinely support how you feel.
            </p>
          </div>

          <div className="row g-4">
            {features.map((f, i) => (
              <div key={i} className="col-md-4 col-sm-6">
                <FeatureCard {...f} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mh-cta">
        <div>
          <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🌱</div>
          <h2>You deserve to feel well.</h2>
          <p>
            Join MentiHaven today and start building a healthier, more mindful relationship with your emotions.
          </p>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/register")}
            style={{ padding: '0.8rem 2.5rem', fontSize: '1rem' }}
          >
            Create Free Account
          </button>
          <div style={{ marginTop: '1rem' }}>
            <button
              onClick={() => navigate("/login")}
              style={{ background: 'none', border: 'none', color: 'var(--sage)', fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem', fontFamily: "'Nunito', sans-serif" }}
            >
              Already have an account? Sign in →
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mh-footer">
        <p style={{ margin: 0 }}>
          <strong>MentiHaven</strong> — Supporting mental wellness, one breath at a time. 🌿
        </p>
      </footer>
    </div>
  );
}
