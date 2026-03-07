import { useState } from "react";
import { useNavigate } from "react-router-dom"; // 👈 import navigation hook

export default function LoginForm({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // 👈 initialize navigate

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch(`${process.env.REACT_APP_API_URL || "http://localhost:4000"}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok && data.token) {
      localStorage.setItem("mh_token", data.token);
      onLogin(data.user);
      navigate("/"); // 👈 redirect to Dashboard after login
    } else {
      alert(data.error || "Login failed");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="mb-3">Login to MentiHaven</h2>
      <div className="mb-3">
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
      </div>
      <div className="mb-3">
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
      </div>
      <button className="btn btn-success w-100" type="submit">
        Login
      </button>
    </form>
  );
}