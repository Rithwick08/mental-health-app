import { useEffect, useState } from "react";
import { Quote } from "lucide-react";

export default function QuoteSection() {
  const [quote, setQuote] = useState("Loading inspirational thoughts...");

  useEffect(() => {
    fetch("http://localhost:4000/api/quotes")
      .then(res => res.json())
      .then(data => setQuote(data.quote))
      .catch(() => setQuote("Stay strong. Every day is a new beginning."));
  }, []);

  return (
    <div className="card p-4 text-center shadow">
      <Quote className="w-6 h-6 text-primary mx-auto mb-3" />
      <blockquote className="fs-5 fst-italic mb-2">“{quote}”</blockquote>
      <p className="text-muted">Daily Motivation ✨</p>
    </div>
  );
}