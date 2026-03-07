import React, { useEffect, useState } from "react";

export default function ExerciseList() {
  const [exercises, setExercises] = useState([]);
  const [category, setCategory] = useState("relaxation");
  const [selected, setSelected] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [duration, setDuration] = useState(60);
  const [timerRunning, setTimerRunning] = useState(false);

  // Fetch exercises from backend
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL || "http://localhost:4000"}/api/exercises?category=${category}`)
      .then((res) => res.json())
      .then((data) => setExercises(data))
      .catch((err) => console.error("Error fetching exercises:", err));
  }, [category]);

  // Timer logic
  useEffect(() => {
    if (!timerRunning || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    if (timeLeft === 1) setTimerRunning(false);
    return () => clearInterval(timer);
  }, [timerRunning, timeLeft]);

  const handleStart = (exercise) => {
    setSelected(exercise);
    setTimeLeft(duration);
    setTimerRunning(true);
  };

  const handleStop = () => {
    setTimerRunning(false);
    setTimeLeft(0);
    setSelected(null);
  };

  // Circle progress animation
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const progress = timeLeft > 0 ? (timeLeft / duration) * circumference : 0;

  return (
    <div className="card shadow p-4 mt-4">
      <h3 className="text-center mb-3 text-primary">
        🧘 Mental Health Exercises
      </h3>

      {!selected ? (
        <>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <select
              className="form-select w-auto"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="relaxation">🌿 Relaxation</option>
              <option value="mindfulness">🪷 Mindfulness</option>
              <option value="focus">🎯 Focus</option>
            </select>

            <select
              className="form-select w-auto"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value))}
            >
              <option value={60}>1 min</option>
              <option value={180}>3 min</option>
              <option value={300}>5 min</option>
            </select>
          </div>

          <div className="row">
            {exercises.map((ex) => (
              <div key={ex._id} className="col-md-6 mb-3">
                <div
                  className="p-3 border rounded shadow-sm h-100 d-flex flex-column justify-content-between"
                  style={{ backgroundColor: "#f9faff" }}
                >
                  <div>
                    <h5>{ex.title}</h5>
                    <p className="text-muted small mb-3">
                      {ex.description.slice(0, 100)}...
                    </p>
                  </div>
                  <button
                    className="btn btn-success mt-auto"
                    onClick={() => handleStart(ex)}
                  >
                    Start Exercise
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center mt-4">
          <h4 className="mb-3">{selected.title}</h4>
          <p className="text-muted mb-4">{selected.description}</p>

          <div className="d-flex justify-content-center mb-3">
            <svg width="200" height="200" className="position-relative">
              <circle
                stroke="#e0e0e0"
                fill="transparent"
                strokeWidth="8"
                r={radius}
                cx="100"
                cy="100"
              />
              <circle
                stroke="#4CAF50"
                fill="transparent"
                strokeWidth="8"
                r={radius}
                cx="100"
                cy="100"
                strokeDasharray={circumference}
                strokeDashoffset={circumference - progress}
                strokeLinecap="round"
                style={{ transition: "stroke-dashoffset 1s linear" }}
              />
              <text
                x="100"
                y="110"
                textAnchor="middle"
                fontSize="28"
                fill="#4CAF50"
                fontWeight="bold"
              >
                {timeLeft}s
              </text>
            </svg>
          </div>

          {timeLeft > 0 ? (
            <button className="btn btn-danger px-4" onClick={handleStop}>
              Stop
            </button>
          ) : (
            <button
              className="btn btn-success px-4"
              onClick={() => setTimerRunning(true)}
            >
              Restart
            </button>
          )}
        </div>
      )}
    </div>
  );
}