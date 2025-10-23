import React, { useState } from "react";
import ExerciseList from "./ExerciseList";

export default function ExercisesPage() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    { id: "relaxation", name: "🕯️ Relaxation" },
    { id: "mindfulness", name: "🧘 Mindfulness" },
    { id: "focus", name: "🎯 Focus" },
  ];

  return (
    <div className="card p-4 shadow-sm">
      <h2 className="text-center mb-4 text-primary">Mental Health Exercises</h2>

      {!selectedCategory ? (
        <div className="text-center">
          <p className="text-muted mb-4">
            Choose a category that matches your current mood or need.
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className="btn btn-outline-primary btn-lg"
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <>
          <button
            className="btn btn-secondary mb-3"
            onClick={() => setSelectedCategory(null)}
          >
            ← Back to Categories
          </button>
          <ExerciseList category={selectedCategory} />
        </>
      )}
    </div>
  );
}