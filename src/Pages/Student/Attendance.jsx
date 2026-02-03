import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useData } from "../../context/DataContext";
import "../../styles/student.css";

const Attendance = () => {
  const { getStudentCourses } = useData();
  const [attendanceData, setAttendanceData] = useState([]);
  const [recentAttendance] = useState([
    { date: "2024-01-29", course: "Introduction to Computer Science", status: "Present" },
    { date: "2024-01-28", course: "Data Structures and Algorithms", status: "Present" },
    { date: "2024-01-26", course: "Introduction to Computer Science", status: "Present" },
    { date: "2024-01-25", course: "Data Structures and Algorithms", status: "Present" },
    { date: "2024-01-24", course: "Introduction to Computer Science", status: "Present" }
  ]);

  // In a real app, this would come from authentication
  const currentStudentId = "STU2024001";

  useEffect(() => {
    const studentCourses = getStudentCourses(currentStudentId);
    const attendanceInfo = studentCourses.map(course => ({
      course: course.courseName,
      code: course.courseCode,
      totalClasses: course.attendance.total,
      attended: course.attendance.attended,
      percentage: course.attendance.percentage,
      status: course.attendance.percentage >= 85 ? "Good" : 
              course.attendance.percentage >= 75 ? "Warning" : "Critical"
    }));
    setAttendanceData(attendanceInfo);
  }, [currentStudentId, getStudentCourses]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Good": return "#10b981";
      case "Warning": return "#f59e0b";
      case "Critical": return "#ef4444";
      default: return "#6b7280";
    }
  };

  const overallAttendance = attendanceData.length > 0 
    ? attendanceData.reduce((acc, curr) => acc + curr.percentage, 0) / attendanceData.length 
    : 0;

  return (
    <div className="student-dashboard">
      <div className="page-header">
        <h1>Attendance Tracker</h1>
        <p className="welcome">Monitor your class attendance and maintain good academic standing</p>
        <Link to="/student/home" className="back-btn">← Back to Dashboard</Link>
      </div>

      <div className="attendance-overview">
        <div className="overall-card">
          <h3>Overall Attendance</h3>
          <div className="percentage-display">
            <span className="big-number">{overallAttendance.toFixed(1)}%</span>
            <span className="status-text" style={{ color: overallAttendance >= 85 ? "#10b981" : "#f59e0b" }}>
              {overallAttendance >= 85 ? "Good Standing" : "Needs Improvement"}
            </span>
          </div>
        </div>
      </div>

      <div className="attendance-grid">
        <div className="course-attendance">
          <h3>Course-wise Attendance</h3>
          {attendanceData.length === 0 ? (
            <div className="no-data">
              <p>No attendance data available. You may not be enrolled in any courses yet.</p>
            </div>
          ) : (
            <div className="attendance-cards">
              {attendanceData.map((item, index) => (
                <div key={index} className="attendance-card">
                  <div className="course-header">
                    <h4>{item.course}</h4>
                    <span className="course-code">{item.code}</span>
                  </div>
                  
                  <div className="attendance-stats">
                    <div className="stat">
                      <span className="label">Attended</span>
                      <span className="value">{item.attended}/{item.totalClasses}</span>
                    </div>
                    
                    <div className="percentage-circle">
                      <span className="percentage">{item.percentage.toFixed(1)}%</span>
                    </div>
                    
                    <div className="status">
                      <span 
                        className="status-badge"
                        style={{ backgroundColor: getStatusColor(item.status) }}
                      >
                        {item.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="recent-attendance">
          <h3>Recent Attendance</h3>
          <div className="attendance-list">
            {recentAttendance.map((record, index) => (
              <div key={index} className="attendance-record">
                <div className="record-date">{record.date}</div>
                <div className="record-course">{record.course}</div>
                <div className={`record-status ${record.status.toLowerCase()}`}>
                  {record.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;