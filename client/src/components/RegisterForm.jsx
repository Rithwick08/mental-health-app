import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterForm({ onRegister }) {
  const [name, setName] = useState("");
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
      const res = await fetch(`${process.env.REACT_APP_API_URL || "http://localhost:4000"}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        onRegister();
        navigate("/login");
      } else {
        setError(data.error || "Registration failed. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🌱</div>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.9rem', color: 'var(--forest)', marginBottom: '0.25rem' }}>
          Begin Your Journey
        </h2>
        <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>Create your personal sanctuary</p>
      </div>

      {error && (
        <div style={{ background: 'var(--danger-bg)', color: 'var(--danger-soft)', borderRadius: 'var(--radius-sm)', padding: '0.75rem 1rem', marginBottom: '1.25rem', fontSize: '0.88rem' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {[
          { label: 'Your name', value: name, set: setName, type: 'text', placeholder: 'Jane Doe' },
          { label: 'Email address', value: email, set: setEmail, type: 'email', placeholder: 'you@example.com' },
          { label: 'Password', value: password, set: setPassword, type: 'password', placeholder: '••••••••' },
        ].map(({ label, value, set, type, placeholder }) => (
          <div key={label} style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-medium)', marginBottom: '0.4rem' }}>
              {label}
            </label>
            <input
              type={type}
              className="form-control"
              value={value}
              onChange={(e) => set(e.target.value)}
              placeholder={placeholder}
              required
            />
          </div>
        ))}

        <div style={{ marginTop: '1.5rem' }}>
          <button className="btn btn-primary w-100" type="submit" disabled={loading}
            style={{ padding: '0.7rem', fontSize: '1rem' }}>
            {loading ? "Creating account…" : "Create Account"}
          </button>
        </div>
      </form>

      <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.88rem', color: 'var(--text-light)' }}>
        Already have an account?{" "}
        <Link to="/login" style={{ color: 'var(--sage)', fontWeight: 600, textDecoration: 'none' }}>
          Sign in
        </Link>
      </p>
    </div>
  );
}
