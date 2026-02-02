import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const res = await api("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      localStorage.setItem("token", res.token);
      navigate("/dashboard");
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>

      <input
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
        required
      />

      <input
        placeholder="Password"
        type="password"
        onChange={e => setPassword(e.target.value)}
        required
      />

      <button type="submit">Login</button>

      <p>
        No account?{" "}
        <span
          onClick={() => navigate("/register")}
          style={{ color: "red", cursor: "pointer", textDecoration: "underline" }}
        >
          Register
        </span>
      </p>
    </form>
  );
}
