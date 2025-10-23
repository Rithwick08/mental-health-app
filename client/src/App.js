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
import AICompanion from "./components/AICompanion"; // 👈 import AI Companion

function AppContent() {
  const [user, setUser] = useState(null);
  const location = useLocation();

  function handleLogout() {
    localStorage.removeItem("mh_token");
    setUser(null);
  }

  // Pages where AI should NOT appear
  const hideAIOn = ["/", "/login", "/register"];
  const showAI = user && !hideAIOn.includes(location.pathname);

  // Hide main navbar on landing page
  const showNavbar = location.pathname !== "/";

  return (
    <>
      {showNavbar && <Navbar user={user} onLogout={handleLogout} />}

      <div className={showNavbar ? "container mt-4" : ""}>
        <Routes>
          {/* Landing Page */}
          <Route
            path="/"
            element={!user ? <Landing /> : <Navigate to="/dashboard" />}
          />

          {/* Auth Pages */}
          <Route
            path="/login"
            element={
              !user ? (
                <div className="card p-4 shadow">
                  <LoginForm onLogin={setUser} />
                </div>
              ) : (
                <Navigate to="/dashboard" />
              )
            }
          />

          <Route
            path="/register"
            element={
              !user ? (
                <div className="card p-4 shadow">
                  <RegisterForm onRegister={() => {}} />
                </div>
              ) : (
                <Navigate to="/dashboard" />
              )
            }
          />

          {/* Dashboard */}
          <Route
            path="/dashboard"
            element={
              user ? (
                <div>
                  <h2 className="mb-4">MentiHaven Dashboard</h2>
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <MoodTracker />
                    </div>
                    <div className="col-md-6 mb-4">
                      <MoodChart />
                    </div>
                  </div>
                  <QuoteBox />
                </div>
              ) : (
                <Navigate to="/" />
              )
            }
          />

          {/* Journal */}
          <Route
            path="/journal"
            element={
              user ? (
                <div>
                  <h2 className="mb-4">My Journal</h2>
                  <JournalForm onAdd={(entry) => console.log("New Journal:", entry)} />
                  <JournalList />
                </div>
              ) : (
                <Navigate to="/" />
              )
            }
          />

          {/* Exercises */}
          <Route
            path="/exercises"
            element={user ? <ExerciseList /> : <Navigate to="/" />}
          />
        </Routes>
      </div>

      {/* ✅ Floating AI Companion (visible only when logged in & not on auth pages) */}
      {showAI && <AICompanion />}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}