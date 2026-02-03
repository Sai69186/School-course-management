import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

const Login = ({ role }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // TEMP logic (backend will replace this later)
    if (role === "student") {
      navigate("/student/home");
    } else {
      navigate("/teacher/home");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{role === "student" ? "Student Login" : "Teacher Login"}</h2>
        <p>Welcome back! Please login to continue</p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>

        <span className="note">
          Don’t have an account? <a href="/signup">Sign Up</a>
        </span>
      </div>
    </div>
  );
};

export default Login;
