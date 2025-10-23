import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function MoodChart() {
  const [moods, setMoods] = useState([]);
  const token = localStorage.getItem("mh_token");

  async function fetchMoods() {
    const res = await fetch("http://localhost:4000/api/mood/", {
  headers: { Authorization: token }
});
    const data = await res.json();
    if (res.ok) {
      const mapped = data.map(m => ({
        date: new Date(m.date).toLocaleDateString(),
        mood: mapMoodToValue(m.mood)
      }));
      setMoods(mapped.reverse());
    }
  }

  function mapMoodToValue(mood) {
    switch (mood.toLowerCase()) {
      case "happy": return 5;
      case "excited": return 4;
      case "neutral": return 3;
      case "stressed": return 2;
      case "sad": return 1;
      default: return 3;
    }
  }

  useEffect(() => { if (token) fetchMoods(); }, [token]);

  return (
    <div className="card p-3 shadow">
      <h2>Mood Over Time</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={moods}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={[0, 5]} ticks={[1,2,3,4,5]} />
          <Tooltip />
          <Line type="monotone" dataKey="mood" stroke="#0d6efd" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
      <p className="mt-2">Scale: 1=Sad, 2=Stressed, 3=Neutral, 4=Excited, 5=Happy</p>
    </div>
  );
}