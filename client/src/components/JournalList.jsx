import React, { useEffect, useState } from "react";

export default function JournalList() {
  const [journals, setJournals] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const fetchJournals = async () => {
      const token = localStorage.getItem("mh_token");
      const res = await fetch(`${process.env.REACT_APP_API_URL || "http://localhost:4000"}/api/journal`, {
        headers: { Authorization: token },
      });
      const data = await res.json();
      if (res.ok) setJournals(data);
    };
    fetchJournals();
  }, []);

  const deleteJournal = async (id) => {
    setDeletingId(id);
    const token = localStorage.getItem("mh_token");
    await fetch(`${process.env.REACT_APP_API_URL || "http://localhost:4000"}/api/journal/${id}`, {
      method: "DELETE",
      headers: { Authorization: token },
    });
    setJournals(journals.filter((j) => j._id !== id));
    setDeletingId(null);
  };

  if (journals.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-light)' }}>
        <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>📓</div>
        <p style={{ fontSize: '1rem' }}>No entries yet. Your first reflection awaits.</p>
      </div>
    );
  }

  return (
    <div>
      <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.3rem', color: 'var(--forest)', marginBottom: '1.25rem' }}>
        Past Reflections
      </h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {journals.map((j) => (
          <div
            key={j._id}
            className="card"
            style={{
              padding: '1.25rem 1.5rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              borderLeft: '3px solid var(--sage) !important',
            }}
            onClick={() => setExpanded(expanded === j._id ? null : j._id)}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
              <div style={{ flex: 1 }}>
                <h5 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '1.15rem',
                  color: 'var(--forest)',
                  fontWeight: 600,
                  marginBottom: '0.2rem',
                }}>
                  {j.title}
                </h5>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-light)', margin: 0 }}>
                  {new Date(j.date).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-light)', transition: 'transform 0.2s', display: 'inline-block', transform: expanded === j._id ? 'rotate(180deg)' : 'none' }}>
                  ▾
                </span>
                <button
                  onClick={(e) => { e.stopPropagation(); deleteJournal(j._id); }}
                  disabled={deletingId === j._id}
                  style={{
                    background: 'transparent',
                    border: '1px solid var(--sage-mist)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '0.25rem 0.6rem',
                    fontSize: '0.78rem',
                    color: 'var(--danger-soft)',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'var(--danger-bg)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  {deletingId === j._id ? '…' : 'Delete'}
                </button>
              </div>
            </div>

            {expanded === j._id && (
              <div style={{
                marginTop: '1rem',
                paddingTop: '1rem',
                borderTop: '1px solid var(--sage-mist)',
                fontSize: '0.95rem',
                color: 'var(--text-medium)',
                lineHeight: 1.8,
                animation: 'fadeIn 0.25s ease',
              }}>
                {j.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
