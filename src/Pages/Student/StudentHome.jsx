import { Link } from "react-router-dom";
import "../../styles/student.css";

const StudentHome = () => {
  return (
    <div className="student-dashboard">
      <h1>Student Dashboard</h1>
      <p className="welcome">Welcome back! Here is your academic overview.</p>

      <div className="card-grid">
        <Link to="/student/courses" className="card">
          <h3>My Courses</h3>
          <p>View all enrolled courses</p>
        </Link>

        <Link to="/student/enroll" className="card">
          <h3>Course Enrollment</h3>
          <p>Enroll in available courses</p>
        </Link>

        <Link to="/student/attendance" className="card">
          <h3>Attendance</h3>
          <p>Check your attendance status</p>
        </Link>

        <Link to="/student/assignments" className="card">
          <h3>Assignments</h3>
          <p>View & submit assignments</p>
        </Link>

        <Link to="/student/profile" className="card">
          <h3>Profile</h3>
          <p>Update personal details</p>
        </Link>
      </div>
    </div>
  );
};

export default StudentHome;
