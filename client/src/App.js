import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import MoodTracker from "./components/MoodTracker";
import MoodChart from "./components/MoodChart";
import Navbar from "./components/Navbar";
import JournalForm from "./components/JournalForm";
import JournalList from "./components/JournalList";
import Landing from "./components/landing/Landing";
import QuoteBox from "./components/QuoteBox";
import ExerciseList from "./components/ExerciseList";
import AICompanion from "./components/AICompanion";
import "./App.css";

function AppContent() {
  const [user, setUser] = useState(null);
  const location = useLocation();

  function handleLogout() {
    localStorage.removeItem("mh_token");
    setUser(null);
  }

  const hideAIOn = ["/", "/login", "/register"];
  const showAI = user && !hideAIOn.includes(location.pathname);
  const showNavbar = location.pathname !== "/";

  return (
    <div className="mh-page-wrapper">
      {showNavbar && <Navbar user={user} onLogout={handleLogout} />}

      <div className={showNavbar ? "container mt-4 pb-5" : ""}>
        <Routes>
          <Route path="/" element={!user ? <Landing /> : <Navigate to="/dashboard" />} />

          <Route
            path="/login"
            element={
              !user ? (
                <div className="mh-auth-page">
                  <div className="mh-auth-card card">
                    <LoginForm onLogin={setUser} />
                  </div>
                </div>
              ) : <Navigate to="/dashboard" />
            }
          />

          <Route
            path="/register"
            element={
              !user ? (
                <div className="mh-auth-page">
                  <div className="mh-auth-card card">
                    <RegisterForm onRegister={() => { }} />
                  </div>
                </div>
              ) : <Navigate to="/dashboard" />
            }
          />

          <Route
            path="/dashboard"
            element={
              user ? (
                <div>
                  <div className="mb-4">
                    <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", color: "var(--forest)" }}>
                      Welcome back, {user.name} 🌿
                    </h2>
                    <p style={{ color: "var(--text-medium)", marginTop: "-0.25rem" }}>How are you feeling today?</p>
                  </div>
                  <div className="mh-dashboard-grid mb-4">
                    <MoodTracker />
                    <MoodChart />
                  </div>
                  <QuoteBox />
                </div>
              ) : <Navigate to="/" />
            }
          />

          <Route
            path="/journal"
            element={
              user ? (
                <div>
                  <div className="mb-4">
                    <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", color: "var(--forest)" }}>
                      My Journal 📓
                    </h2>
                    <p style={{ color: "var(--text-medium)", marginTop: "-0.25rem" }}>A private space to reflect and grow.</p>
                  </div>
                  <JournalForm onAdd={(entry) => console.log("New Journal:", entry)} />
                  <JournalList />
                </div>
              ) : <Navigate to="/" />
            }
          />

          <Route
            path="/exercises"
            element={user ? <ExerciseList /> : <Navigate to="/" />}
          />
        </Routes>
      </div>

      {showAI && <AICompanion />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
