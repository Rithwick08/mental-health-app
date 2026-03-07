import { useState } from "react";

export default function RegisterForm({ onRegister }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch(`${process.env.REACT_APP_API_URL || "http://localhost:4000"}/api/auth/register`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name, email, password })
});
    const data = await res.json();
    if (res.ok) {
      alert("Registration successful! Please login.");
      onRegister();
    } else {
      alert(data.error || "Registration failed");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="mb-3">Register</h2>
      <div className="mb-3">
        <input
          className="form-control"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Name"
          required
        />
      </div>
      <div className="mb-3">
        <input
          className="form-control"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
      </div>
      <div className="mb-3">
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
      </div>
      <button className="btn btn-primary w-100" type="submit">Register</button>
    </form>
  );
}