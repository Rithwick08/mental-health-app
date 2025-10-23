import React from "react";

export default function FeatureCard({ icon, title, description }) {
  return (
    <div className="card shadow-sm border-0 h-100">
      <div className="card-body text-center">
        <div style={{ fontSize: "2rem" }}>{icon}</div>
        <h5 className="mt-3 fw-bold">{title}</h5>
        <p className="text-muted">{description}</p>
      </div>
    </div>
  );
}