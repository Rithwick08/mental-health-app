import React, { useEffect, useState } from "react";

export default function QuoteBox({ dark = false }) {
  const [quote, setQuote] = useState("Fetching a little motivation for you...");

  useEffect(() => {
    async function fetchQuote() {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL || "http://localhost:4000"}/api/quotes`);
        const data = await res.json();
        setQuote(data.quote);
      } catch (err) {
        console.error("Failed to fetch quote:", err);
        setQuote("Even the darkest night will end and the sun will rise ☀️");
      }
    }
    fetchQuote();
  }, []);

  return (
    <div
      className={`card shadow-sm p-4 mt-4 text-center ${
        dark ? "bg-dark text-light" : "bg-light"
      }`}
      style={{ borderRadius: "12px" }}
    >
      <h5 className={`fw-bold mb-3 ${dark ? "text-warning" : "text-primary"}`}>
        🌟 Daily Motivation
      </h5>
      <blockquote className="blockquote mb-0">
        <p className="fs-5 fst-italic">“{quote}”</p>
      </blockquote>
    </div>
  );
}