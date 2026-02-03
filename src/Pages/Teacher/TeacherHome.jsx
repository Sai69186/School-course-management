import { Link } from "react-router-dom";
import "../../styles/teacher.css";

const TeacherHome = () => {
  return (
    <div className="teacher-dashboard">
      <h1>Teacher Dashboard</h1>
      <p className="welcome">
        Manage courses, students, and academic activities.
      </p>

      <div className="card-grid">
        <Link to="/teacher/create-course" className="card">
          <h3>Create Course</h3>
          <p>Add new courses and syllabus</p>
        </Link>

        <Link to="/teacher/classes" className="card">
          <h3>My Classes</h3>
          <p>View and manage classes</p>
        </Link>

        <Link to="/teacher/students" className="card">
          <h3>Students</h3>
          <p>View enrolled students</p>
        </Link>

        <Link to="/teacher/attendance" className="card">
          <h3>Attendance</h3>
          <p>Mark and update attendance</p>
        </Link>

        <Link to="/teacher/assignments" className="card">
          <h3>Assignments</h3>
          <p>Create & review assignments</p>
        </Link>

        <Link to="/teacher/profile" className="card">
          <h3>Profile</h3>
          <p>Update professional details</p>
        </Link>
      </div>
    </div>
  );
};

export default TeacherHome;
