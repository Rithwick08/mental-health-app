import React, { useEffect, useState } from "react";

const CATEGORIES = [
  { value: "relaxation", label: "Relaxation", emoji: "🌿" },
  { value: "mindfulness", label: "Mindfulness", emoji: "🪷" },
  { value: "focus", label: "Focus", emoji: "🎯" },
];

const DURATIONS = [
  { value: 60, label: "1 min" },
  { value: 180, label: "3 min" },
  { value: 300, label: "5 min" },
];

export default function ExerciseList() {
  const [exercises, setExercises] = useState([]);
  const [category, setCategory] = useState("relaxation");
  const [selected, setSelected] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [duration, setDuration] = useState(60);
  const [timerRunning, setTimerRunning] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL || "http://localhost:4000"}/api/exercises?category=${category}`)
      .then((res) => res.json())
      .then((data) => setExercises(data))
      .catch((err) => console.error("Error fetching exercises:", err));
  }, [category]);

  useEffect(() => {
    if (!timerRunning || timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    if (timeLeft === 1) { setTimerRunning(false); setDone(true); }
    return () => clearInterval(timer);
  }, [timerRunning, timeLeft]);

  const handleStart = (exercise) => {
    setSelected(exercise);
    setTimeLeft(duration);
    setTimerRunning(true);
    setDone(false);
  };

  const handleStop = () => {
    setTimerRunning(false);
    setTimeLeft(0);
    setSelected(null);
    setDone(false);
  };

  const handleRestart = () => {
    setTimeLeft(duration);
    setTimerRunning(true);
    setDone(false);
  };

  const radius = 78;
  const circumference = 2 * Math.PI * radius;
  const progress = timeLeft > 0 ? (timeLeft / duration) * circumference : 0;
  const mins = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const secs = String(timeLeft % 60).padStart(2, "0");

  return (
    <div>
      {!selected ? (
        <>
          <div className="mb-4">
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', color: 'var(--forest)' }}>
              Mindful Exercises 🌿
            </h2>
            <p style={{ color: 'var(--text-medium)', marginTop: '-0.25rem' }}>Breathe, slow down, and be present.</p>
          </div>

          {/* Controls */}
          <div className="card p-3 mb-4" style={{ background: 'var(--sage-bg)', boxShadow: 'none !important' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.4rem' }}>Category</p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {CATEGORIES.map((c) => (
                    <button
                      key={c.value}
                      onClick={() => setCategory(c.value)}
                      style={{
                        padding: '0.4rem 0.9rem',
                        borderRadius: '50px',
                        border: category === c.value ? '2px solid var(--sage)' : '2px solid var(--sage-mist)',
                        background: category === c.value ? 'var(--white)' : 'transparent',
                        color: category === c.value ? 'var(--forest)' : 'var(--text-medium)',
                        fontFamily: "'Nunito', sans-serif",
                        fontWeight: 600,
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                    >
                      {c.emoji} {c.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.4rem' }}>Duration</p>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {DURATIONS.map((d) => (
                    <button
                      key={d.value}
                      onClick={() => setDuration(d.value)}
                      style={{
                        padding: '0.4rem 0.75rem',
                        borderRadius: '50px',
                        border: duration === d.value ? '2px solid var(--teal)' : '2px solid var(--sage-mist)',
                        background: duration === d.value ? 'var(--white)' : 'transparent',
                        color: duration === d.value ? 'var(--teal)' : 'var(--text-medium)',
                        fontFamily: "'Nunito', sans-serif",
                        fontWeight: 600,
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Exercise Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
            {exercises.map((ex) => (
              <div key={ex._id} className="card exercise-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ fontSize: '2rem', lineHeight: 1 }}>
                  {category === 'relaxation' ? '🌊' : category === 'mindfulness' ? '🪷' : '🎯'}
                </div>
                <div>
                  <h5 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', color: 'var(--forest)', marginBottom: '0.3rem' }}>
                    {ex.title}
                  </h5>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-medium)', lineHeight: 1.6, margin: 0 }}>
                    {ex.description.slice(0, 110)}{ex.description.length > 110 ? '…' : ''}
                  </p>
                </div>
                <button
                  className="btn btn-success mt-auto"
                  onClick={() => handleStart(ex)}
                  style={{ alignSelf: 'flex-start' }}
                >
                  Begin →
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        /* Timer View */
        <div style={{ maxWidth: '480px', margin: '0 auto', textAlign: 'center', padding: '2rem 1rem' }}>
          <button
            onClick={handleStop}
            style={{ background: 'none', border: 'none', color: 'var(--text-light)', cursor: 'pointer', fontSize: '0.9rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
          >
            ← Back to exercises
          </button>

          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', color: 'var(--forest)', marginBottom: '0.5rem' }}>
            {selected.title}
          </h3>
          <p style={{ color: 'var(--text-medium)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '2rem' }}>
            {selected.description}
          </p>

          {/* Circular Timer */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem', position: 'relative' }}>
            {timerRunning && (
              <div style={{
                position: 'absolute', inset: '10px',
                borderRadius: '50%',
                background: 'rgba(107,143,113,0.08)',
                animation: 'pulse-ring 2s ease-out infinite',
              }} />
            )}
            <svg width="200" height="200" style={{ transform: 'rotate(-90deg)' }}>
              <circle cx="100" cy="100" r={radius} fill="transparent" stroke="var(--sage-mist)" strokeWidth="8" />
              <circle
                cx="100" cy="100" r={radius}
                fill="transparent"
                stroke={done ? "var(--teal)" : "var(--sage)"}
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={circumference - progress}
                strokeLinecap="round"
                style={{ transition: "stroke-dashoffset 1s linear" }}
              />
            </svg>
            <div style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
            }}>
              {done ? (
                <div style={{ fontSize: '2.5rem' }}>✨</div>
              ) : (
                <>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.2rem', fontWeight: 600, color: 'var(--forest)', lineHeight: 1 }}>
                    {mins}:{secs}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-light)', marginTop: '0.2rem' }}>
                    {timerRunning ? 'breathe…' : 'paused'}
                  </div>
                </>
              )}
            </div>
          </div>

          {done ? (
            <div>
              <p style={{ color: 'var(--sage)', fontWeight: 600, marginBottom: '1rem' }}>Well done! 🌿 Take a moment to notice how you feel.</p>
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                <button className="btn btn-primary" onClick={handleRestart}>Do it again</button>
                <button className="btn btn-outline-primary" onClick={handleStop}>Back to exercises</button>
              </div>
            </div>
          ) : (
            <button
              className="btn btn-danger px-4"
              onClick={handleStop}
              style={{ background: 'var(--sage-mist) !important', color: 'var(--text-medium) !important' }}
            >
              Stop Session
            </button>
          )}
        </div>
      )}
    </div>
  );
}
