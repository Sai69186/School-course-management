import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = ({ userRole }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add logout logic here when backend is implemented
    navigate("/");
  };

  const isAuthPage = location.pathname.includes("/login") || location.pathname.includes("/signup");
  const isDashboard = location.pathname.includes("/student") || location.pathname.includes("/teacher");

  if (location.pathname === "/") return null; // Don't show navbar on landing page

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <span>EduManage</span>
        </Link>

        <div className="nav-menu">
          {isAuthPage ? (
            <Link to="/" className="nav-link">
              ← Back to Home
            </Link>
          ) : isDashboard ? (
            <div className="nav-actions">
              <span className="user-greeting">
                Welcome, {userRole === "student" ? "Student" : "Teacher"}
              </span>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </div>
          ) : (
            <div className="nav-links">
              <Link to="/login/student" className="nav-link">
                Student Login
              </Link>
              <Link to="/login/teacher" className="nav-link">
                Teacher Login
              </Link>
              <Link to="/signup" className="nav-link signup-link">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;