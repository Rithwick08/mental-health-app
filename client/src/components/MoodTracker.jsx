import { useEffect, useState } from "react";

export default function MoodTracker() {
  const [moods, setMoods] = useState([]);
  const [mood, setMood] = useState("");

  const token = localStorage.getItem("mh_token");

  async function fetchMoods() {
    const res = await fetch("http://localhost:4000/api/mood/", {
  headers: { Authorization: token }
});
    const data = await res.json();
    if (res.ok) setMoods(data);
  }

  async function addMood(e) {
    e.preventDefault();
    const res = await fetch("http://localhost:4000/api/mood/", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: token
  },
  body: JSON.stringify({ mood })
});
    if (res.ok) {
      setMood("");
      fetchMoods();
    }
  }

  useEffect(() => { if (token) fetchMoods(); }, [token]);

  return (
    <div className="card p-3 shadow">
      <h2>Log Your Mood</h2>
      <form onSubmit={addMood} className="d-flex mb-3">
        <input
          className="form-control me-2"
          value={mood}
          onChange={e => setMood(e.target.value)}
          placeholder="e.g. happy, sad, stressed"
          required
        />
        <button className="btn btn-primary" type="submit">Add</button>
      </form>

      <h5>History</h5>
      <ul className="list-group">
        {moods.map(m => (
          <li key={m._id} className="list-group-item">
            {new Date(m.date).toLocaleString()} — <strong>{m.mood}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}