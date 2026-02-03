import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

const Signup = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("student");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // TEMP logic (backend will be added later)
    if (role === "student") {
      navigate("/student/home");
    } else {
      navigate("/teacher/home");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create Account</h2>
        <p>Register as Student or Teacher</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

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

          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>

          <button type="submit">Sign Up</button>
        </form>

        <span className="note">
          Already have an account? <a href="/login/student">Login</a>
        </span>
      </div>
    </div>
  );
};

export default Signup;