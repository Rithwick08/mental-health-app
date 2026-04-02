import React, { useState } from "react";

export default function StressCheckup() {
  const [formData, setFormData] = useState({
    sleep: 3,
    headaches: 0,
    academic: 3,
    studyLoad: 3,
    extraAct: 3
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: parseInt(value, 10) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    const token = localStorage.getItem("mh_token");

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || "http://localhost:4000"}/api/stress/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token ? token : "",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to get prediction");
      }

      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Custom slider style class logic
  const sliderStyle = {
    width: "100%",
    cursor: "pointer",
    accentColor: "var(--sage)",
    height: "6px",
    background: "var(--sage-mist)",
    borderRadius: "var(--radius-xl)",
    outline: "none",
    WebkitAppearance: "none", // standard properties need proper CSS handling normally, but this is a simple fallback
  };

  // Modern input wrapper function
  const renderRangeInput = (label, name, min, max, displayLabels) => (
    <div style={{ marginBottom: "2rem" }}>
      <label style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem", fontWeight: 600, color: "var(--text-dark)" }}>
        <span>{label}</span>
        <span style={{ color: "var(--sage)", fontWeight: "bold" }}>{formData[name]}</span>
      </label>
      <input
        type="range"
        name={name}
        min={min}
        max={max}
        value={formData[name]}
        onChange={handleChange}
        style={sliderStyle}
        className="mh-custom-slider"
      />
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", color: "var(--text-light)", marginTop: "0.5rem" }}>
        <span>{displayLabels.min}</span>
        <span>{displayLabels.max}</span>
      </div>
    </div>
  );

  return (
    <div className="container py-5 mh-page-wrapper">
      {/* We add a custom CSS class injection for sleek sliders since standard React style object blocks pseudo elements */}
      <style>{`
        .mh-custom-slider {
          -webkit-appearance: none;
          background: var(--sage-mist);
        }
        .mh-custom-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%; 
          background: var(--sage);
          cursor: pointer;
          box-shadow: 0 0 10px rgba(134, 197, 158, 0.4);
          transition: background .15s ease-in-out;
        }
        .mh-custom-slider::-webkit-slider-thumb:hover {
          background: var(--sage-light);
          transform: scale(1.1);
        }
      `}</style>
      
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card p-4 p-md-5">
            <div className="text-center mb-4">
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--forest)" }}>
                AI Stress Checkup
              </h2>
              <p style={{ color: "var(--text-medium)" }}>
                Use this intelligent assessment tool to understand your current stress levels. Let's start by checking in.
              </p>
            </div>

            {error && (
              <div className="alert alert-danger" style={{ background: "var(--danger-bg)", color: "var(--danger-soft)", border: "none" }}>
                {error}
              </div>
            )}

            {!result ? (
              <form onSubmit={handleSubmit}>
                {renderRangeInput("Sleep Quality", "sleep", 1, 5, { min: "1 - Very Poor", max: "5 - Excellent" })}
                
                {/* Headaches is slightly different - it's a counter up to 7 */}
                {renderRangeInput("Weekly Headaches", "headaches", 0, 7, { min: "0 - None", max: "7 - Every day" })}
                
                {renderRangeInput("Academic Satisfaction", "academic", 1, 5, { min: "1 - Struggling", max: "5 - Thriving" })}
                
                {renderRangeInput("Current Study Load", "studyLoad", 1, 5, { min: "1 - Very Light", max: "5 - Overwhelming" })}
                
                {renderRangeInput("Extracurricular Activity", "extraAct", 1, 5, { min: "1 - Not Active", max: "5 - Highly Active" })}

                <button 
                  type="submit" 
                  className="btn btn-primary w-100 mt-3 py-2" 
                  style={{ fontSize: "1.1rem" }}
                  disabled={loading}
                >
                  {loading ? "Analyzing..." : "Analyze Stress Level"}
                </button>
              </form>
            ) : (
              <div className="animation-fade-in">
                <div className="text-center mb-4">
                  <div style={{
                    width: "90px", height: "90px", borderRadius: "50%", 
                    background: result.risk === "High Risk" ? "var(--danger-bg)" : "var(--sage-bg)",
                    color: result.risk === "High Risk" ? "var(--danger-soft)" : "var(--sage)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "3rem", margin: "0 auto 1.5rem"
                  }}>
                    {result.risk === "High Risk" ? "⚠️" : "🌱"}
                  </div>
                  <h3 style={{ color: result.risk === "High Risk" ? "var(--danger-soft)" : "var(--forest)", marginBottom: "0.25rem" }}>
                    {result.risk}
                  </h3>
                  <p style={{ color: "var(--text-medium)", fontSize: "0.95rem" }}>
                    Confidence Score: {result.confidence}%
                  </p>
                </div>

                {/* Visual Stress Meter */}
                <div className="mb-5">
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem", fontSize: "0.85rem", fontWeight: 600, color: "var(--text-light)" }}>
                    <span>0% Stable</span>
                    <span>100% Critical</span>
                  </div>
                  <div style={{ width: "100%", height: "12px", background: "var(--sage-mist)", borderRadius: "var(--radius-xl)", overflow: "hidden" }}>
                    <div style={{ 
                      width: `${result.confidence}%`, 
                      height: "100%", 
                      background: result.confidence < 30 ? "var(--sage)" : result.confidence < 60 ? "#F59E0B" : "var(--danger-soft)",
                      transition: "width 1s cubic-bezier(0.4, 0, 0.2, 1)",
                      borderRadius: "var(--radius-xl)"
                    }} />
                  </div>
                </div>

                {/* Factor Attribution & Recommendations */}
                <div className="mb-4 text-start">
                  <h5 style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--forest)", marginBottom: "1rem" }}>
                    Insights & Prescriptions
                  </h5>
                  
                  {result.suggestions && result.suggestions.length > 0 ? (
                    <ul className="list-group list-group-flush" style={{ borderRadius: "var(--radius-md)", overflow: "hidden", border: "1px solid var(--sage-mist)" }}>
                      {result.suggestions.map((tip, idx) => (
                        <li key={idx} className="list-group-item d-flex align-items-start" style={{ padding: "1rem", background: "var(--cream)" }}>
                          <span style={{ fontSize: "1.2rem", marginRight: "1rem", color: "var(--sage)" }}>✦</span>
                          <span style={{ color: "var(--text-dark)", fontSize: "0.95rem", lineHeight: 1.5 }}>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="p-3" style={{ background: "var(--sage-bg)", borderRadius: "var(--radius-sm)", color: "var(--forest)" }}>
                      Your metrics look highly stable across the board. Keep up the excellent balance!
                    </div>
                  )}
                </div>

                <div className="text-center mt-4">
                  <button 
                    className="btn btn-outline-primary px-4"
                    onClick={() => { setResult(null); setFormData({sleep: 3, headaches: 0, academic: 3, studyLoad: 3, extraAct: 3}); }}
                  >
                    Retake Assessment
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
