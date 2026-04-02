import React, { useEffect, useState } from "react";

const CATEGORIES = [
  { value: "relaxation", label: "Relaxation", emoji: "🌊", color: "var(--teal)" },
  { value: "mindfulness", label: "Mindfulness", emoji: "🪷", color: "var(--sage)" },
  { value: "focus", label: "Focus", emoji: "🎯", color: "var(--forest)" },
];

const DURATIONS = [
  { value: 60, label: "1 min" },
  { value: 180, label: "3 min" },
  { value: 300, label: "5 min" },
  { value: 600, label: "10 min" },
];

export default function ExerciseList() {
  const [exercises, setExercises] = useState([]);
  const [category, setCategory] = useState("relaxation");
  const [selected, setSelected] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [duration, setDuration] = useState(300);
  const [timerRunning, setTimerRunning] = useState(false);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customMinutes, setCustomMinutes] = useState("");

  const isCustomDuration = !DURATIONS.find(d => d.value === duration);

  function handleCustomApply(val) {
    const mins = parseInt(val, 10);
    if (!isNaN(mins) && mins >= 1 && mins <= 120) {
      const secs = mins * 60;
      setDuration(secs);
      if (!timerRunning) setTimeLeft(secs);
      setShowCustomInput(false);
    }
  }

  function selectPreset(val) {
    setDuration(val);
    if (!timerRunning) setTimeLeft(val);
    setShowCustomInput(false);
    setCustomMinutes("");
  }

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API_URL || "http://localhost:4000"}/api/exercises?category=${category}`)
      .then((res) => res.json())
      .then((data) => { setExercises(data); setLoading(false); })
      .catch((err) => { console.error("Error fetching exercises:", err); setLoading(false); });
  }, [category]);

  useEffect(() => {
    if (!timerRunning || timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    if (timeLeft === 1) { setTimerRunning(false); setDone(true); }
    return () => clearInterval(timer);
  }, [timerRunning, timeLeft]);

  const currentCategory = CATEGORIES.find(c => c.value === category);

  const handleStart = (exercise) => {
    setSelected(exercise);
    setTimeLeft(duration);
    setTimerRunning(true);
    setDone(false);
    setActiveStep(0);
  };

  const handleStop = () => {
    setTimerRunning(false);
    setTimeLeft(0);
    setSelected(null);
    setDone(false);
    setActiveStep(0);
  };

  const handleRestart = () => {
    setTimeLeft(duration);
    setTimerRunning(true);
    setDone(false);
    setActiveStep(0);
  };

  const radius = 78;
  const circumference = 2 * Math.PI * radius;
  const progress = timeLeft > 0 ? (timeLeft / duration) * circumference : 0;
  const mins = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const secs = String(timeLeft % 60).padStart(2, "0");

  // ── Exercise Detail Overlay View ──────────────────────────────
  if (selected) {
    return (
      <div>
        <button
          onClick={handleStop}
          style={{ background: 'none', border: 'none', color: 'var(--text-light)', cursor: 'pointer', fontSize: '0.9rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem', padding: 0 }}
        >
          ← Back to exercises
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', alignItems: 'start' }}>

          {/* Left: Steps & Info */}
          <div>
            <div style={{ marginBottom: '1.25rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: currentCategory.color }}>
                {currentCategory.emoji} {currentCategory.label}
              </span>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', color: 'var(--forest)', margin: '0.25rem 0 0.5rem' }}>
                {selected.title}
              </h2>
              <p style={{ color: 'var(--text-medium)', fontSize: '0.95rem', lineHeight: 1.7, margin: 0 }}>
                {selected.description}
              </p>
            </div>

            {/* Benefits */}
            {selected.benefits && selected.benefits.length > 0 && (
              <div className="card" style={{ padding: '1rem 1.25rem', marginBottom: '1.25rem', background: 'var(--sage-bg)', boxShadow: 'none' }}>
                <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-light)', marginBottom: '0.5rem' }}>Benefits</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {selected.benefits.map((b, i) => (
                    <span key={i} style={{ fontSize: '0.8rem', background: 'var(--white)', color: 'var(--sage)', border: '1px solid var(--sage-mist)', borderRadius: '50px', padding: '0.2rem 0.7rem', fontWeight: 600 }}>
                      ✓ {b}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Step-by-step instructions */}
            {selected.steps && selected.steps.length > 0 && (
              <div>
                <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-light)', marginBottom: '0.75rem' }}>
                  Step-by-Step Guide
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {selected.steps.map((step, i) => (
                    <div
                      key={i}
                      onClick={() => setActiveStep(i)}
                      style={{
                        display: 'flex', gap: '0.75rem', alignItems: 'flex-start',
                        padding: '0.75rem 1rem',
                        borderRadius: 'var(--radius-sm)',
                        background: activeStep === i ? 'var(--sage-bg)' : 'var(--white)',
                        border: activeStep === i ? '1.5px solid var(--sage)' : '1.5px solid var(--sage-mist)',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                    >
                      <div style={{
                        minWidth: '24px', height: '24px', borderRadius: '50%',
                        background: activeStep === i ? 'var(--sage)' : 'var(--sage-mist)',
                        color: activeStep === i ? 'white' : 'var(--text-medium)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '0.75rem', fontWeight: 700, flexShrink: 0,
                        transition: 'all 0.2s',
                      }}>
                        {i + 1}
                      </div>
                      <p style={{ margin: 0, fontSize: '0.88rem', color: activeStep === i ? 'var(--forest)' : 'var(--text-medium)', lineHeight: 1.6, fontWeight: activeStep === i ? 500 : 400 }}>
                        {step}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Step navigation */}
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
                  <button
                    onClick={() => setActiveStep(s => Math.max(0, s - 1))}
                    disabled={activeStep === 0}
                    style={{ padding: '0.4rem 0.9rem', borderRadius: '50px', border: '1.5px solid var(--sage-mist)', background: 'transparent', color: 'var(--text-medium)', cursor: activeStep === 0 ? 'not-allowed' : 'pointer', fontSize: '0.85rem', opacity: activeStep === 0 ? 0.4 : 1 }}
                  >
                    ← Prev
                  </button>
                  <button
                    onClick={() => setActiveStep(s => Math.min(selected.steps.length - 1, s + 1))}
                    disabled={activeStep === selected.steps.length - 1}
                    style={{ padding: '0.4rem 0.9rem', borderRadius: '50px', border: '1.5px solid var(--sage)', background: 'var(--sage-bg)', color: 'var(--forest)', cursor: activeStep === selected.steps.length - 1 ? 'not-allowed' : 'pointer', fontSize: '0.85rem', opacity: activeStep === selected.steps.length - 1 ? 0.4 : 1 }}
                  >
                    Next →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right: Timer */}
          <div style={{ textAlign: 'center', padding: '1rem' }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-light)', marginBottom: '0.75rem' }}>Session Timer</p>

            {/* Duration selector */}
            <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'center', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
              {DURATIONS.map((d) => (
                <button
                  key={d.value}
                  onClick={() => { if (!timerRunning) { selectPreset(d.value); setDone(false); } }}
                  style={{
                    padding: '0.3rem 0.7rem', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 600,
                    border: duration === d.value && !isCustomDuration ? '2px solid var(--teal)' : '2px solid var(--sage-mist)',
                    background: duration === d.value && !isCustomDuration ? 'var(--white)' : 'transparent',
                    color: duration === d.value && !isCustomDuration ? 'var(--teal)' : 'var(--text-medium)',
                    cursor: timerRunning ? 'not-allowed' : 'pointer', opacity: timerRunning ? 0.6 : 1,
                  }}
                >
                  {d.label}
                </button>
              ))}
              {/* Custom button */}
              <button
                onClick={() => { if (!timerRunning) setShowCustomInput(s => !s); }}
                style={{
                  padding: '0.3rem 0.7rem', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 600,
                  border: isCustomDuration || showCustomInput ? '2px solid var(--teal)' : '2px dashed var(--sage-mist)',
                  background: isCustomDuration ? 'var(--white)' : 'transparent',
                  color: isCustomDuration || showCustomInput ? 'var(--teal)' : 'var(--text-medium)',
                  cursor: timerRunning ? 'not-allowed' : 'pointer', opacity: timerRunning ? 0.6 : 1,
                }}
              >
                {isCustomDuration ? `${Math.floor(duration / 60)} min ✎` : '＋ Custom'}
              </button>
            </div>
            {/* Custom input */}
            {showCustomInput && !timerRunning && (
              <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'center', alignItems: 'center', marginBottom: '1rem' }}>
                <input
                  type="number" min="1" max="120"
                  value={customMinutes}
                  onChange={e => setCustomMinutes(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleCustomApply(customMinutes)}
                  placeholder="e.g. 15"
                  autoFocus
                  style={{
                    width: '80px', padding: '0.3rem 0.6rem', borderRadius: 'var(--radius-sm)',
                    border: '1.5px solid var(--teal)', fontSize: '0.88rem', textAlign: 'center',
                    outline: 'none', color: 'var(--forest)', fontWeight: 600,
                  }}
                />
                <span style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>min</span>
                <button
                  onClick={() => handleCustomApply(customMinutes)}
                  style={{
                    padding: '0.3rem 0.8rem', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 700,
                    background: 'var(--teal)', color: 'white', border: 'none', cursor: 'pointer',
                  }}
                >
                  Set
                </button>
              </div>
            )}

            {/* Circular Timer */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem', position: 'relative' }}>
              {timerRunning && (
                <div style={{
                  position: 'absolute', inset: '10px', borderRadius: '50%',
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
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                {done ? (
                  <div style={{ fontSize: '2.5rem' }}>✨</div>
                ) : (
                  <>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.2rem', fontWeight: 600, color: 'var(--forest)', lineHeight: 1 }}>
                      {mins}:{secs}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-light)', marginTop: '0.2rem' }}>
                      {timerRunning ? 'breathe…' : 'ready'}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Active step reminder */}
            {!done && selected.steps && (
              <div className="card" style={{ padding: '0.85rem 1rem', marginBottom: '1.25rem', background: 'var(--sage-bg)', boxShadow: 'none', textAlign: 'left' }}>
                <p style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-light)', marginBottom: '0.3rem' }}>
                  Step {activeStep + 1} of {selected.steps.length}
                </p>
                <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--forest)', lineHeight: 1.6, fontWeight: 500 }}>
                  {selected.steps[activeStep]}
                </p>
              </div>
            )}

            {done ? (
              <div>
                <p style={{ color: 'var(--sage)', fontWeight: 600, marginBottom: '1rem' }}>Well done! 🌿 Take a moment to notice how you feel.</p>
                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                  <button className="btn btn-primary" onClick={handleRestart}>Do it again</button>
                  <button className="btn btn-outline-primary" onClick={handleStop}>Back</button>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                {!timerRunning ? (
                  <button className="btn btn-success px-4" onClick={() => { setTimerRunning(true); setDone(false); }}>
                    ▶ Start Session
                  </button>
                ) : (
                  <button
                    onClick={handleStop}
                    style={{ padding: '0.5rem 1.5rem', borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--sage-mist)', background: 'transparent', color: 'var(--text-medium)', cursor: 'pointer', fontSize: '0.9rem' }}
                  >
                    ✕ End Session
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ── Exercise List View ─────────────────────────────────────────
  return (
    <div>
      <div className="mb-4">
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', color: 'var(--forest)' }}>
          Mindful Exercises 🌿
        </h2>
        <p style={{ color: 'var(--text-medium)', marginTop: '-0.25rem' }}>Choose a practice. Follow the steps. Feel the difference.</p>
      </div>

      {/* Controls */}
      <div className="card p-3 mb-4" style={{ background: 'var(--sage-bg)', boxShadow: 'none' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.4rem' }}>Category</p>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {CATEGORIES.map((c) => (
                <button
                  key={c.value}
                  onClick={() => setCategory(c.value)}
                  style={{
                    padding: '0.4rem 0.9rem', borderRadius: '50px',
                    border: category === c.value ? `2px solid ${c.color}` : '2px solid var(--sage-mist)',
                    background: category === c.value ? 'var(--white)' : 'transparent',
                    color: category === c.value ? c.color : 'var(--text-medium)',
                    fontFamily: "'Nunito', sans-serif", fontWeight: 600, fontSize: '0.85rem',
                    cursor: 'pointer', transition: 'all 0.2s',
                  }}
                >
                  {c.emoji} {c.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.4rem' }}>Session Duration</p>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {DURATIONS.map((d) => (
                <button
                  key={d.value}
                  onClick={() => selectPreset(d.value)}
                  style={{
                    padding: '0.4rem 0.75rem', borderRadius: '50px',
                    border: duration === d.value && !isCustomDuration ? '2px solid var(--teal)' : '2px solid var(--sage-mist)',
                    background: duration === d.value && !isCustomDuration ? 'var(--white)' : 'transparent',
                    color: duration === d.value && !isCustomDuration ? 'var(--teal)' : 'var(--text-medium)',
                    fontFamily: "'Nunito', sans-serif", fontWeight: 600, fontSize: '0.85rem',
                    cursor: 'pointer', transition: 'all 0.2s',
                  }}
                >
                  {d.label}
                </button>
              ))}
              {/* Custom */}
              <button
                onClick={() => setShowCustomInput(s => !s)}
                style={{
                  padding: '0.4rem 0.75rem', borderRadius: '50px',
                  border: isCustomDuration || showCustomInput ? '2px solid var(--teal)' : '2px dashed var(--sage-mist)',
                  background: isCustomDuration ? 'var(--white)' : 'transparent',
                  color: isCustomDuration || showCustomInput ? 'var(--teal)' : 'var(--text-medium)',
                  fontFamily: "'Nunito', sans-serif", fontWeight: 600, fontSize: '0.85rem',
                  cursor: 'pointer', transition: 'all 0.2s',
                }}
              >
                {isCustomDuration ? `${Math.floor(duration / 60)} min ✎` : '＋ Custom'}
              </button>
            </div>
            {showCustomInput && (
              <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', marginTop: '0.6rem' }}>
                <input
                  type="number" min="1" max="120"
                  value={customMinutes}
                  onChange={e => setCustomMinutes(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleCustomApply(customMinutes)}
                  placeholder="e.g. 15"
                  autoFocus
                  style={{
                    width: '75px', padding: '0.3rem 0.5rem', borderRadius: 'var(--radius-sm)',
                    border: '1.5px solid var(--teal)', fontSize: '0.85rem', textAlign: 'center',
                    outline: 'none', color: 'var(--forest)', fontWeight: 600,
                  }}
                />
                <span style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>min</span>
                <button
                  onClick={() => handleCustomApply(customMinutes)}
                  style={{
                    padding: '0.3rem 0.75rem', borderRadius: '50px', fontSize: '0.82rem', fontWeight: 700,
                    background: 'var(--teal)', color: 'white', border: 'none', cursor: 'pointer',
                  }}
                >
                  Set
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Exercise Cards */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-light)' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🌿</div>
          <p>Loading exercises…</p>
        </div>
      ) : exercises.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-light)' }}>
          <p>No exercises found for this category.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
          {exercises.map((ex) => (
            <div key={ex._id} className="card exercise-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'default' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ fontSize: '2rem', lineHeight: 1 }}>
                  {currentCategory.emoji}
                </div>
                {ex.duration && (
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-light)', background: 'var(--sage-bg)', borderRadius: '50px', padding: '0.2rem 0.6rem', fontWeight: 600 }}>
                    ~{ex.duration} min
                  </span>
                )}
              </div>

              <div>
                <h5 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.25rem', color: 'var(--forest)', marginBottom: '0.3rem' }}>
                  {ex.title}
                </h5>
                <p style={{ fontSize: '0.87rem', color: 'var(--text-medium)', lineHeight: 1.6, margin: 0 }}>
                  {ex.description}
                </p>
              </div>

              {/* Benefits preview */}
              {ex.benefits && ex.benefits.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                  {ex.benefits.slice(0, 2).map((b, i) => (
                    <span key={i} style={{ fontSize: '0.72rem', background: 'var(--sage-bg)', color: 'var(--sage)', borderRadius: '50px', padding: '0.15rem 0.55rem', fontWeight: 600 }}>
                      ✓ {b}
                    </span>
                  ))}
                  {ex.benefits.length > 2 && (
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-light)', padding: '0.15rem 0.3rem' }}>+{ex.benefits.length - 2} more</span>
                  )}
                </div>
              )}

              {/* Steps count */}
              {ex.steps && ex.steps.length > 0 && (
                <p style={{ fontSize: '0.78rem', color: 'var(--text-light)', margin: 0 }}>
                  📋 {ex.steps.length}-step guide included
                </p>
              )}

              <button
                className="btn btn-success mt-auto"
                onClick={() => handleStart(ex)}
                style={{ alignSelf: 'flex-start' }}
              >
                Begin Exercise →
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
