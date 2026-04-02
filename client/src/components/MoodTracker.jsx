import { useEffect, useState, useCallback } from "react";

const MOODS = [
  { emoji: "😄", label: "Happy", value: "happy", color: "#A8D5A2" },
  { emoji: "😌", label: "Calm", value: "calm", color: "#A8C3D5" },
  { emoji: "😐", label: "Neutral", value: "neutral", color: "#C5C5A0" },
  { emoji: "😟", label: "Stressed", value: "stressed", color: "#D5B8A0" },
  { emoji: "😢", label: "Sad", value: "sad", color: "#B8A0D5" },
];

export default function MoodTracker() {
  const [moods, setMoods] = useState([]);
  const [selected, setSelected] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const token = localStorage.getItem("mh_token");

  // ✅ FIXED: useCallback
  const fetchMoods = useCallback(async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL || "http://localhost:4000"}/api/mood/`,
        {
          headers: { Authorization: token },
        }
      );
      const data = await res.json();
      if (res.ok) setMoods(data);
    } catch (err) {
      console.error("Error fetching moods:", err);
    }
  }, [token]);

  // ✅ FIXED: addMood wrapped too (optional but clean)
  const addMood = useCallback(async () => {
    if (!selected) return;

    setSaving(true);

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL || "http://localhost:4000"}/api/mood/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({ mood: selected }),
        }
      );

      if (res.ok) {
        setSaved(true);
        setSelected(null);
        fetchMoods();
        setTimeout(() => setSaved(false), 2500);
      }
    } catch (err) {
      console.error("Error adding mood:", err);
    }

    setSaving(false);
  }, [selected, token, fetchMoods]);

  // ✅ FIXED: dependency added
  useEffect(() => {
    if (token) fetchMoods();
  }, [token, fetchMoods]);

  return (
    <div className="card p-4 h-100">
      <h3
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "1.5rem",
          color: "var(--forest)",
          marginBottom: "0.25rem",
        }}
      >
        How are you feeling?
      </h3>

      <p
        style={{
          color: "var(--text-light)",
          fontSize: "0.85rem",
          marginBottom: "1.25rem",
        }}
      >
        Tap to log your mood
      </p>

      {/* Emoji Picker */}
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          justifyContent: "center",
          marginBottom: "1.25rem",
          flexWrap: "wrap",
        }}
      >
        {MOODS.map((m) => (
          <button
            key={m.value}
            onClick={() => setSelected(m.value)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "0.6rem 0.8rem",
              borderRadius: "var(--radius-sm)",
              border:
                selected === m.value
                  ? `2px solid var(--sage)`
                  : "2px solid var(--sage-mist)",
              background:
                selected === m.value ? "var(--sage-bg)" : "var(--cream)",
              boxShadow:
                selected === m.value
                  ? "0 8px 24px rgba(134, 197, 158, 0.25)"
                  : "none",
              cursor: "pointer",
              transition: "all 0.2s ease",
              transform:
                selected === m.value ? "scale(1.08)" : "scale(1)",
            }}
          >
            <span style={{ fontSize: "1.8rem", lineHeight: 1 }}>
              {m.emoji}
            </span>
            <span
              style={{
                fontSize: "0.7rem",
                color: "var(--text-medium)",
                marginTop: "0.2rem",
                fontWeight: 600,
              }}
            >
              {m.label}
            </span>
          </button>
        ))}
      </div>

      <button
        onClick={addMood}
        disabled={!selected || saving}
        className="btn btn-primary w-100"
        style={{ marginBottom: "1.25rem" }}
      >
        {saving ? "Saving…" : saved ? "✓ Logged!" : "Log Mood"}
      </button>

      {/* History */}
      <div>
        <p
          style={{
            fontSize: "0.8rem",
            fontWeight: 700,
            color: "var(--text-light)",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginBottom: "0.5rem",
          }}
        >
          Recent
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.4rem",
            maxHeight: "130px",
            overflowY: "auto",
          }}
        >
          {moods.slice(0, 6).map((m) => {
            const found =
              MOODS.find(
                (x) => x.value === m.mood.toLowerCase()
              ) || { emoji: "💭" };

            return (
              <div
                key={m._id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  padding: "0.4rem 0.6rem",
                  background: "var(--cream)",
                  borderRadius: "var(--radius-sm)",
                }}
              >
                <span style={{ fontSize: "1.1rem" }}>
                  {found.emoji}
                </span>
                <span
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--text-medium)",
                    fontWeight: 600,
                  }}
                >
                  {m.mood}
                </span>
                <span
                  style={{
                    marginLeft: "auto",
                    fontSize: "0.75rem",
                    color: "var(--text-light)",
                  }}
                >
                  {new Date(m.date).toLocaleDateString()}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
