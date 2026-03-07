import React, { useState } from "react";

export default function JournalForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("mh_token");
    const res = await fetch(`${process.env.REACT_APP_API_URL || "http://localhost:4000"}/api/journal`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "Authorization": `Bearer ${token}`,
        Authorization: token,
      },
      body: JSON.stringify({ title, content }),
    });
    const data = await res.json();
    if (res.ok) {
      onAdd(data);
      setTitle("");
      setContent("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Journal Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        className="form-control mb-2"
        placeholder="Write your thoughts..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <button className="btn btn-primary w-100">Save Journal</button>
    </form>
  );
}