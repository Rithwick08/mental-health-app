import { useEffect, useState, useCallback } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const moodMap = { happy: 5, excited: 5, calm: 4, neutral: 3, stressed: 2, sad: 1 };
const moodLabels = { 5: "😄", 4: "😌", 3: "😐", 2: "😟", 1: "😢" };

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const val = payload[0].value;
    return (
      <div
        style={{
          background: 'var(--white)',
          border: '1px solid var(--sage-mist)',
          borderRadius: 'var(--radius-sm)',
          padding: '0.5rem 0.75rem',
          fontSize: '0.85rem',
          color: 'var(--text-dark)',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        <span style={{ fontSize: '1.2rem' }}>
          {moodLabels[val] || '💭'}
        </span>
        <span
          style={{
            marginLeft: '0.4rem',
            fontWeight: 600,
            color: 'var(--text-medium)'
          }}
        >
          {payload[0].payload.date}
        </span>
      </div>
    );
  }
  return null;
};

export default function MoodChart() {
  const [moods, setMoods] = useState([]);
  const token = localStorage.getItem("mh_token");

  // ✅ FIXED: useCallback added
  const fetchMoods = useCallback(async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL || "http://localhost:4000"}/api/mood/`,
        {
          headers: { Authorization: token },
        }
      );

      const data = await res.json();

      if (res.ok) {
        const mapped = data.map(m => ({
          date: new Date(m.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric"
          }),
          mood: moodMap[m.mood.toLowerCase()] ?? 3,
        }));

        setMoods(mapped.reverse().slice(-10));
      }
    } catch (err) {
      console.error("Error fetching moods:", err);
    }
  }, [token]);

  // ✅ FIXED: dependency added
  useEffect(() => {
    if (token) fetchMoods();
  }, [token, fetchMoods]);

  return (
    <div className="card p-4 h-100">
      <h3
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '1.5rem',
          color: 'var(--forest)',
          marginBottom: '0.25rem'
        }}
      >
        Mood Journey
      </h3>

      <p
        style={{
          color: 'var(--text-light)',
          fontSize: '0.85rem',
          marginBottom: '1.25rem'
        }}
      >
        Your last 10 check-ins
      </p>

      {moods.length === 0 ? (
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-light)',
            fontSize: '0.9rem',
            textAlign: 'center',
            padding: '2rem'
          }}
        >
          <div>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
              🌱
            </div>
            Log your first mood to see your journey here.
          </div>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart
            data={moods}
            margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="moodGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6B8F71" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6B8F71" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--sage-mist)"
              vertical={false}
            />

            <XAxis
              dataKey="date"
              tick={{
                fill: 'var(--text-light)',
                fontSize: 11,
                fontFamily: 'Nunito'
              }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              domain={[0, 5]}
              ticks={[1, 2, 3, 4, 5]}
              tick={{
                fill: 'var(--text-light)',
                fontSize: 11
              }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip content={<CustomTooltip />} />

            <Area
              type="monotone"
              dataKey="mood"
              stroke="var(--sage)"
              strokeWidth={2.5}
              fill="url(#moodGrad)"
              dot={{ fill: 'var(--sage)', r: 4, strokeWidth: 0 }}
              activeDot={{ r: 6, fill: 'var(--forest)' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      )}

      <div
        style={{
          display: 'flex',
          gap: '1rem',
          marginTop: '0.75rem',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}
      >
        {Object.entries(moodLabels)
          .reverse()
          .map(([val, emoji]) => (
            <span
              key={val}
              style={{
                fontSize: '0.78rem',
                color: 'var(--text-light)'
              }}
            >
              {emoji} {['', 'Sad', 'Stressed', 'Neutral', 'Calm', 'Happy'][val]}
            </span>
          ))}
      </div>
    </div>
  );
}
