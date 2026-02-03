import { Link } from "react-router-dom";
import ImageCarousel from "../components/Imagecarousel";
import "../styles/landing.css";

const Landing = () => {
  return (
    <div className="landing-container">
      <ImageCarousel />

      <div className="overlay">
        <h1>Empowering Education Digitally</h1>
        <p>A Complete School Course Management System</p>

        <div className="btn-group">
          <Link to="/login/student" className="btn primary">
            Login as Student
          </Link>
          <Link to="/login/teacher" className="btn secondary">
            Login as Teacher
          </Link>
          <Link to="/signup" className="btn outline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
