import React from "react";

export default function Navigation({ navigate }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <a className="navbar-brand fw-bold" href="/">
          🧠 MentiHaven
        </a>
        <div className="d-flex">
          <button
            className="btn btn-outline-light me-2"
            onClick={() => navigate("/login")}
          >
            Sign In
          </button>
          <button
            className="btn btn-light"
            onClick={() => navigate("/register")}
          >
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
}