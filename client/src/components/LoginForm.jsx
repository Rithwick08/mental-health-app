import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function LoginForm({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL || "http://localhost:4000"}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem("mh_token", data.token);
        onLogin(data.user);
        navigate("/dashboard");
      } else {
        setError(data.error || "Login failed. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🌿</div>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.9rem', color: 'var(--forest)', marginBottom: '0.25rem' }}>
          Welcome Back
        </h2>
        <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>Sign in to your sanctuary</p>
      </div>

      {error && (
        <div style={{ background: 'var(--danger-bg)', color: 'var(--danger-soft)', borderRadius: 'var(--radius-sm)', padding: '0.75rem 1rem', marginBottom: '1.25rem', fontSize: '0.88rem' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-medium)', marginBottom: '0.4rem' }}>
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-medium)', marginBottom: '0.4rem' }}>
            Password
          </label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </div>

        <button className="btn btn-primary w-100" type="submit" disabled={loading}
          style={{ padding: '0.7rem', fontSize: '1rem' }}>
          {loading ? "Signing in…" : "Sign In"}
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.88rem', color: 'var(--text-light)' }}>
        New here?{" "}
        <Link to="/register" style={{ color: 'var(--sage)', fontWeight: 600, textDecoration: 'none' }}>
          Create an account
        </Link>
      </p>
    </div>
  );
}
