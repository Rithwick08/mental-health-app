import React, { useState } from "react";

export default function JournalForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const token = localStorage.getItem("mh_token");
    const res = await fetch(`${process.env.REACT_APP_API_URL || "http://localhost:4000"}/api/journal`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: token },
      body: JSON.stringify({ title, content }),
    });
    const data = await res.json();
    if (res.ok) {
      onAdd(data);
      setTitle("");
      setContent("");
    }
    setSaving(false);
  };

  return (
    <div className="card p-4 mb-4">
      <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.3rem', color: 'var(--forest)', marginBottom: '1.25rem' }}>
        ✍️ New Entry
      </h4>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '0.85rem' }}>
          <input
            type="text"
            className="form-control"
            placeholder="Give this entry a title…"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem', fontWeight: 500 }}
            required
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <textarea
            className="form-control"
            placeholder="What's on your mind today? This space is entirely yours…"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={5}
            style={{ resize: 'vertical', lineHeight: 1.8 }}
            required
          />
        </div>
        <button className="btn btn-primary" type="submit" disabled={saving}>
          {saving ? "Saving…" : "Save Entry"}
        </button>
      </form>
    </div>
  );
}
