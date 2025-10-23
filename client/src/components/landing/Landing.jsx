import React from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "./Navigation";
import FeatureCard from "./FeatureCard";
import QuoteSection from "./QuoteSection";
import heroImage from "../../assets/hero-mental-health.jpg";
import "./landing.css";

export default function Landing() {
  const navigate = useNavigate();

  const features = [
    {
      icon: "❤️",
      title: "Mood Check-in",
      description: "Track your emotions and feelings daily to understand your mental health better.",
    },
    {
      icon: "📈",
      title: "Mood History",
      description: "Visualize your mental health trends through interactive charts.",
    },
    {
      icon: "📓",
      title: "Journal Entries",
      description: "Write and save reflections to gain clarity and insight.",
    },
    {
      icon: "📚",
      title: "View Journal",
      description: "Revisit past entries and see your growth.",
    },
    {
      icon: "💪",
      title: "Mental Health Exercises",
      description: "Discover mindfulness, breathing, and wellness practices.",
    },
    {
      icon: "🤖",
      title: "AI Support",
      description: "Get personalized AI guidance for better mental health.",
    },
  ];

  return (
    <div style={{ backgroundColor: "#f9f9f9" }}>
      <Navigation navigate={navigate} />

      {/* Hero Section */}
      <section
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
          padding: "100px 20px",
          textAlign: "center",
        }}
      >
        <h1 className="display-4 fw-bold">
          <span style={{ color: "#FFD1A4" }}>
          Your Safe Space for <br />
          Mental Wellness</span>
        </h1>
        <p className="lead mt-3">
          MentiHaven provides tools to track moods, journal your thoughts, and build resilience with AI-powered insights.
        </p>
        <div className="mt-4">
          <button
            className="btn btn-light btn-lg me-3"
            onClick={() => navigate("/register")}
          >
            Start Your Journey
          </button>
          <a href="#features" className="btn btn-outline-light btn-lg">
            Learn More
          </a>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-5 bg-white">
        <div className="container">
          <QuoteSection />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-5">
        <div className="container text-center">
          <h2 className="mb-4 fw-bold">Comprehensive Mental Health Tools</h2>
          <p className="text-muted mb-5">
            Everything you need for mental wellness in one easy-to-use platform.
          </p>
          <div className="row">
            {features.map((f, i) => (
              <div key={i} className="col-md-4 mb-4">
                <FeatureCard {...f} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-4 bg-primary text-white text-center">
        <p className="mb-0">
          🧠 MentiHaven — Supporting mental wellness, one person at a time.
        </p>
      </footer>
    </div>
  );
}