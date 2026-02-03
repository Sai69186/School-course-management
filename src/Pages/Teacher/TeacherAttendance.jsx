import { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/teacher.css";

const TeacherAttendance = () => {
  const [selectedCourse, setSelectedCourse] = useState("CS101");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  
  const [courses] = useState([
    { code: "CS101", name: "Introduction to Computer Science" },
    { code: "CS201", name: "Data Structures and Algorithms" },
    { code: "CS301", name: "Database Management Systems" }
  ]);

  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Alice Johnson",
      studentId: "STU2024001",
      courses: ["CS101", "CS201"],
      attendance: {
        "2024-01-29": "present",
        "2024-01-27": "present",
        "2024-01-25": "absent",
        "2024-01-22": "present"
      }
    },
    {
      id: 2,
      name: "Bob Smith",
      studentId: "STU2024002",
      courses: ["CS101", "CS301"],
      attendance: {
        "2024-01-29": "present",
        "2024-01-27": "late",
        "2024-01-25": "present",
        "2024-01-22": "present"
      }
    },
    {
      id: 3,
      name: "Carol Davis",
      studentId: "STU2024003",
      courses: ["CS201", "CS301"],
      attendance: {
        "2024-01-29": "absent",
        "2024-01-27": "present",
        "2024-01-25": "present",
        "2024-01-22": "present"
      }
    },
    {
      id: 4,
      name: "David Wilson",
      studentId: "STU2024004",
      courses: ["CS101"],
      attendance: {
        "2024-01-29": "late",
        "2024-01-27": "present",
        "2024-01-25": "absent",
        "2024-01-22": "absent"
      }
    }
  ]);

  const [currentAttendance, setCurrentAttendance] = useState({});

  const enrolledStudents = students.filter(student => 
    student.courses.includes(selectedCourse)
  );

  const handleAttendanceChange = (studentId, status) => {
    setCurrentAttendance(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const saveAttendance = () => {
    // Update student attendance records with current attendance
    setStudents(prevStudents => 
      prevStudents.map(student => {
        if (currentAttendance[student.id]) {
          return {
            ...student,
            attendance: {
              ...student.attendance,
              [selectedDate]: currentAttendance[student.id]
            }
          };
        }
        return student;
      })
    );
    
    alert(`Attendance saved for ${selectedCourse} on ${selectedDate}`);
    setCurrentAttendance({});
  };

  const getAttendanceStats = (student) => {
    // Create a copy of attendance records and include current attendance if set
    const attendanceRecords = { ...student.attendance };
    if (currentAttendance[student.id]) {
      attendanceRecords[selectedDate] = currentAttendance[student.id];
    }
    
    const recordValues = Object.values(attendanceRecords);
    const total = recordValues.length;
    const present = recordValues.filter(status => status === "present").length;
    const late = recordValues.filter(status => status === "late").length;
    
    return {
      total,
      present,
      late,
      absent: total - present - late,
      percentage: total > 0 ? ((present + late * 0.5) / total * 100).toFixed(1) : 0
    };
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "present": return "#10b981";
      case "late": return "#f59e0b";
      case "absent": return "#ef4444";
      default: return "#6b7280";
    }
  };

  return (
    <div className="teacher-dashboard">
      <div className="page-header">
        <h1>Attendance Management</h1>
        <p className="welcome">Mark and track student attendance for your courses</p>
        <Link to="/teacher/home" className="back-btn">← Back to Dashboard</Link>
      </div>

      <div className="attendance-controls">
        <div className="control-group">
          <label htmlFor="course-select">Select Course:</label>
          <select
            id="course-select"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="control-select"
          >
            {courses.map(course => (
              <option key={course.code} value={course.code}>
                {course.code} - {course.name}
              </option>
            ))}
          </select>
        </div>

        <div className="control-group">
          <label htmlFor="date-select">Select Date:</label>
          <input
            type="date"
            id="date-select"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="control-input"
          />
        </div>
      </div>

      <div className="attendance-section">
        <div className="section-header">
          <h3>Mark Attendance - {selectedDate}</h3>
          <button className="btn-primary" onClick={saveAttendance}>
            Save Attendance
          </button>
        </div>

        <div className="attendance-table">
          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Student ID</th>
                <th>Attendance Status</th>
                <th>Overall %</th>
                <th>Recent History</th>
              </tr>
            </thead>
            <tbody>
              {enrolledStudents.map(student => {
                const stats = getAttendanceStats(student);
                return (
                  <tr key={student.id}>
                    <td>
                      <div className="student-info">
                        <div className="student-avatar">
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="student-name">{student.name}</span>
                      </div>
                    </td>
                    <td>{student.studentId}</td>
                    <td>
                      <div className="attendance-buttons">
                        <button
                          className={`attendance-btn ${
                            (currentAttendance[student.id] || student.attendance[selectedDate]) === "present" ? "active" : ""
                          }`}
                          style={{ backgroundColor: getStatusColor("present") }}
                          onClick={() => handleAttendanceChange(student.id, "present")}
                        >
                          Present
                        </button>
                        <button
                          className={`attendance-btn ${
                            (currentAttendance[student.id] || student.attendance[selectedDate]) === "late" ? "active" : ""
                          }`}
                          style={{ backgroundColor: getStatusColor("late") }}
                          onClick={() => handleAttendanceChange(student.id, "late")}
                        >
                          Late
                        </button>
                        <button
                          className={`attendance-btn ${
                            (currentAttendance[student.id] || student.attendance[selectedDate]) === "absent" ? "active" : ""
                          }`}
                          style={{ backgroundColor: getStatusColor("absent") }}
                          onClick={() => handleAttendanceChange(student.id, "absent")}
                        >
                          Absent
                        </button>
                      </div>
                    </td>
                    <td>
                      <span 
                        className="percentage-badge"
                        style={{ 
                          color: stats.percentage >= 85 ? "#10b981" : 
                                stats.percentage >= 75 ? "#f59e0b" : "#ef4444"
                        }}
                      >
                        {stats.percentage}%
                      </span>
                    </td>
                    <td>
                      <div className="attendance-history">
                        {Object.entries(student.attendance)
                          .slice(-5)
                          .map(([date, status]) => (
                            <span
                              key={date}
                              className="history-dot"
                              style={{ backgroundColor: getStatusColor(status) }}
                              title={`${date}: ${status}`}
                            />
                          ))}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="attendance-summary">
        <h3>Attendance Summary</h3>
        <div className="summary-grid">
          <div className="summary-card">
            <h4>Total Students</h4>
            <span className="summary-number">{enrolledStudents.length}</span>
          </div>
          <div className="summary-card">
            <h4>Present Today</h4>
            <span className="summary-number">
              {enrolledStudents.filter(s => 
                (currentAttendance[s.id] || s.attendance[selectedDate]) === "present"
              ).length}
            </span>
          </div>
          <div className="summary-card">
            <h4>Late Today</h4>
            <span className="summary-number">
              {enrolledStudents.filter(s => 
                (currentAttendance[s.id] || s.attendance[selectedDate]) === "late"
              ).length}
            </span>
          </div>
          <div className="summary-card">
            <h4>Absent Today</h4>
            <span className="summary-number">
              {enrolledStudents.filter(s => 
                (currentAttendance[s.id] || s.attendance[selectedDate]) === "absent"
              ).length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherAttendance;