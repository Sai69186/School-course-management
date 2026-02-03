import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useData } from "../../context/DataContext";
import "../../styles/teacher.css";

const MyClasses = () => {
  const { getTeacherCourses } = useData();
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [showSyllabusModal, setShowSyllabusModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // In a real app, this would come from authentication
  const currentInstructorId = "EMP2024001";

  useEffect(() => {
    const teacherCourses = getTeacherCourses(currentInstructorId);
    setClasses(teacherCourses);
  }, [currentInstructorId, getTeacherCourses]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Active": return "#10b981";
      case "Full": return "#f59e0b";
      case "Completed": return "#6b7280";
      default: return "#6b7280";
    }
  };

  const getEnrollmentPercentage = (current, max) => {
    return (current / max) * 100;
  };

  const formatSchedule = (schedule) => {
    const activeDays = Object.entries(schedule)
      .filter(([day, config]) => config.enabled)
      .map(([day, config]) => {
        const dayName = day.charAt(0).toUpperCase() + day.slice(1, 3);
        return `${dayName}`;
      });
    
    if (activeDays.length === 0) return "No schedule set";
    
    const firstActiveDay = Object.entries(schedule).find(([day, config]) => config.enabled);
    const timeRange = firstActiveDay ? `${firstActiveDay[1].startTime} - ${firstActiveDay[1].endTime}` : "";
    
    return `${activeDays.join(", ")} - ${timeRange}`;
  };

  const getClassStatus = (classItem) => {
    const enrollmentPercentage = getEnrollmentPercentage(classItem.enrolledStudents.length, classItem.maxStudents);
    if (enrollmentPercentage >= 100) return "Full";
    return "Active";
  };

  const openSyllabusModal = (classItem) => {
    setSelectedClass(classItem);
    setShowSyllabusModal(true);
  };

  const openExportModal = (classItem) => {
    setSelectedClass(classItem);
    setShowExportModal(true);
  };

  const closeModals = () => {
    setSelectedClass(null);
    setShowSyllabusModal(false);
    setShowExportModal(false);
  };

  const exportStudentList = (format) => {
    if (!selectedClass) return;
    
    // Mock student data for the selected class
    const students = [
      { id: "STU2024001", name: "John Doe", email: "john.doe@email.com", grade: "A-" },
      { id: "STU2024002", name: "Jane Smith", email: "jane.smith@email.com", grade: "B+" },
      { id: "STU2024003", name: "Mike Johnson", email: "mike.johnson@email.com", grade: "A" },
      { id: "STU2024004", name: "Sarah Wilson", email: "sarah.wilson@email.com", grade: "B" }
    ];

    if (format === 'csv') {
      const csvContent = [
        ['Student ID', 'Name', 'Email', 'Current Grade'],
        ...students.map(student => [student.id, student.name, student.email, student.grade])
      ].map(row => row.join(',')).join('\n');
      
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${selectedClass.courseCode}_students.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
    } else if (format === 'pdf') {
      // Mock PDF export
      alert(`PDF export for ${selectedClass.courseCode} would be generated here. This is a demo.`);
    }
    
    closeModals();
  };

  // Mock syllabus data
  const getSyllabus = (courseCode) => {
    const syllabi = {
      "CS101": {
        objectives: [
          "Understand fundamental programming concepts",
          "Learn problem-solving techniques",
          "Master basic data structures",
          "Develop debugging skills"
        ],
        topics: [
          { week: 1, topic: "Introduction to Programming", readings: "Chapter 1-2" },
          { week: 2, topic: "Variables and Data Types", readings: "Chapter 3" },
          { week: 3, topic: "Control Structures", readings: "Chapter 4-5" },
          { week: 4, topic: "Functions and Methods", readings: "Chapter 6" },
          { week: 5, topic: "Arrays and Lists", readings: "Chapter 7" },
          { week: 6, topic: "Object-Oriented Programming", readings: "Chapter 8-9" }
        ],
        grading: {
          assignments: 40,
          midterm: 25,
          final: 30,
          participation: 5
        },
        textbook: "Introduction to Programming - 5th Edition"
      },
      "CS201": {
        objectives: [
          "Master advanced data structures",
          "Analyze algorithm complexity",
          "Implement efficient algorithms",
          "Understand computational thinking"
        ],
        topics: [
          { week: 1, topic: "Algorithm Analysis", readings: "Chapter 1-2" },
          { week: 2, topic: "Linked Lists", readings: "Chapter 3" },
          { week: 3, topic: "Stacks and Queues", readings: "Chapter 4" },
          { week: 4, topic: "Trees", readings: "Chapter 5-6" },
          { week: 5, topic: "Graphs", readings: "Chapter 7" },
          { week: 6, topic: "Sorting Algorithms", readings: "Chapter 8" }
        ],
        grading: {
          assignments: 35,
          projects: 25,
          midterm: 20,
          final: 20
        },
        textbook: "Data Structures and Algorithms - 3rd Edition"
      },
      "CS301": {
        objectives: [
          "Design normalized databases",
          "Master SQL programming",
          "Understand database management",
          "Learn transaction processing"
        ],
        topics: [
          { week: 1, topic: "Database Fundamentals", readings: "Chapter 1-2" },
          { week: 2, topic: "ER Modeling", readings: "Chapter 3" },
          { week: 3, topic: "Relational Model", readings: "Chapter 4" },
          { week: 4, topic: "SQL Basics", readings: "Chapter 5-6" },
          { week: 5, topic: "Normalization", readings: "Chapter 7" },
          { week: 6, topic: "Transactions", readings: "Chapter 8" }
        ],
        grading: {
          assignments: 30,
          projects: 35,
          midterm: 15,
          final: 20
        },
        textbook: "Database Systems - 7th Edition"
      }
    };
    return syllabi[courseCode] || null;
  };

  return (
    <div className="teacher-dashboard">
      <div className="page-header">
        <h1>My Classes</h1>
        <p className="welcome">Manage your current and past courses</p>
        <Link to="/teacher/home" className="back-btn">← Back to Dashboard</Link>
      </div>

      <div className="classes-overview">
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Active Classes</h3>
            <span className="stat-number">{classes.filter(c => c.status === "Active").length}</span>
          </div>
          <div className="stat-card">
            <h3>Total Students</h3>
            <span className="stat-number">{classes.reduce((sum, c) => sum + c.enrolledStudents.length, 0)}</span>
          </div>
          <div className="stat-card">
            <h3>Full Classes</h3>
            <span className="stat-number">{classes.filter(c => getClassStatus(c) === "Full").length}</span>
          </div>
          <div className="stat-card">
            <h3>Total Courses</h3>
            <span className="stat-number">{classes.length}</span>
          </div>
        </div>
      </div>

      {classes.length === 0 ? (
        <div className="no-classes">
          <div className="no-classes-card">
            <h3>No Classes Found</h3>
            <p>You haven't created any courses yet. Start by creating your first course!</p>
            <Link to="/teacher/create-course" className="btn-primary">
              Create Your First Course
            </Link>
          </div>
        </div>
      ) : (
        <div className="classes-grid">
          {classes.map(classItem => {
            const currentStatus = getClassStatus(classItem);
            return (
              <div key={classItem.id} className="class-card">
                <div className="class-header">
                  <h3>{classItem.courseName}</h3>
                  <span className="class-code">{classItem.courseCode}</span>
                  <span 
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(currentStatus) }}
                  >
                    {currentStatus}
                  </span>
                </div>

                <div className="class-info">
                  <div className="info-item">
                    <span className="label">Semester:</span>
                    <span className="value">{classItem.semester} {classItem.year}</span>
                  </div>
                  
                  <div className="info-item">
                    <span className="label">Schedule:</span>
                    <span className="value">{formatSchedule(classItem.schedule)}</span>
                  </div>
                  
                  <div className="info-item">
                    <span className="label">Department:</span>
                    <span className="value">{classItem.department}</span>
                  </div>

                  <div className="info-item">
                    <span className="label">Credits:</span>
                    <span className="value">{classItem.credits}</span>
                  </div>
                </div>

                <div className="enrollment-section">
                  <div className="enrollment-header">
                    <span>Enrollment</span>
                    <span>{classItem.enrolledStudents.length}/{classItem.maxStudents}</span>
                  </div>
                  <div className="enrollment-bar">
                    <div 
                      className="enrollment-fill"
                      style={{ 
                        width: `${getEnrollmentPercentage(classItem.enrolledStudents.length, classItem.maxStudents)}%`,
                        backgroundColor: currentStatus === "Full" ? "#f59e0b" : "#10b981"
                      }}
                    ></div>
                  </div>
                </div>

                <div className="class-actions">
                  <button 
                    className="btn-primary"
                    onClick={() => setSelectedClass(classItem)}
                  >
                    View Details
                  </button>
                  {currentStatus === "Active" && (
                    <>
                      <Link to="/teacher/students" className="btn-secondary">
                        Manage Students
                      </Link>
                      <Link to="/teacher/attendance" className="btn-outline">
                        Take Attendance
                      </Link>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {selectedClass && (
        <div className="modal-overlay" onClick={() => setSelectedClass(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedClass.courseName}</h2>
              <button 
                className="close-btn"
                onClick={() => setSelectedClass(null)}
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <div className="detail-grid">
                <div className="detail-item">
                  <strong>Course Code:</strong> {selectedClass.courseCode}
                </div>
                <div className="detail-item">
                  <strong>Semester:</strong> {selectedClass.semester} {selectedClass.year}
                </div>
                <div className="detail-item">
                  <strong>Schedule:</strong> {formatSchedule(selectedClass.schedule)}
                </div>
                <div className="detail-item">
                  <strong>Department:</strong> {selectedClass.department}
                </div>
                <div className="detail-item">
                  <strong>Credits:</strong> {selectedClass.credits}
                </div>
                <div className="detail-item">
                  <strong>Enrolled Students:</strong> {selectedClass.enrolledStudents.length}/{selectedClass.maxStudents}
                </div>
                <div className="detail-item">
                  <strong>Status:</strong> {getClassStatus(selectedClass)}
                </div>
              </div>

              <div className="course-description">
                <h4>Course Description</h4>
                <p>{selectedClass.description}</p>
              </div>

              {selectedClass.prerequisites && (
                <div className="course-prerequisites">
                  <h4>Prerequisites</h4>
                  <p>{selectedClass.prerequisites}</p>
                </div>
              )}

              <div className="modal-actions">
                <button className="btn-primary">Edit Course</button>
                <button 
                  className="btn-secondary"
                  onClick={() => openSyllabusModal(selectedClass)}
                >
                  View Syllabus
                </button>
                <button 
                  className="btn-outline"
                  onClick={() => openExportModal(selectedClass)}
                >
                  Export Student List
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Syllabus Modal */}
      {showSyllabusModal && selectedClass && (
        <div className="modal-overlay" onClick={closeModals}>
          <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Syllabus - {selectedClass.courseCode}</h2>
              <button className="close-btn" onClick={closeModals}>×</button>
            </div>
            <div className="modal-body">
              {getSyllabus(selectedClass.courseCode) ? (
                <div className="syllabus-content">
                  <div className="syllabus-section">
                    <h3>Course Objectives</h3>
                    <ul>
                      {getSyllabus(selectedClass.courseCode).objectives.map((objective, index) => (
                        <li key={index}>{objective}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="syllabus-section">
                    <h3>Weekly Topics</h3>
                    <div className="topics-table">
                      <table>
                        <thead>
                          <tr>
                            <th>Week</th>
                            <th>Topic</th>
                            <th>Readings</th>
                          </tr>
                        </thead>
                        <tbody>
                          {getSyllabus(selectedClass.courseCode).topics.map((topic, index) => (
                            <tr key={index}>
                              <td>{topic.week}</td>
                              <td>{topic.topic}</td>
                              <td>{topic.readings}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="syllabus-section">
                    <h3>Grading Breakdown</h3>
                    <div className="grading-chart">
                      {Object.entries(getSyllabus(selectedClass.courseCode).grading).map(([category, percentage]) => (
                        <div key={category} className="grading-item">
                          <span className="category">{category.charAt(0).toUpperCase() + category.slice(1)}:</span>
                          <span className="percentage">{percentage}%</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="syllabus-section">
                    <h3>Required Textbook</h3>
                    <p>{getSyllabus(selectedClass.courseCode).textbook}</p>
                  </div>
                </div>
              ) : (
                <div className="no-syllabus">
                  <p>No syllabus available for this course yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Export Students Modal */}
      {showExportModal && selectedClass && (
        <div className="modal-overlay" onClick={closeModals}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Export Student List</h2>
              <button className="close-btn" onClick={closeModals}>×</button>
            </div>
            <div className="modal-body">
              <div className="export-options">
                <h3>Choose Export Format</h3>
                <p>Export student list for {selectedClass.courseCode} - {selectedClass.courseName}</p>
                
                <div className="export-buttons">
                  <button 
                    className="btn-primary"
                    onClick={() => exportStudentList('csv')}
                  >
                    📊 Export as CSV
                  </button>
                  <button 
                    className="btn-secondary"
                    onClick={() => exportStudentList('pdf')}
                  >
                    📄 Export as PDF
                  </button>
                </div>

                <div className="export-info">
                  <h4>Export will include:</h4>
                  <ul>
                    <li>Student ID</li>
                    <li>Full Name</li>
                    <li>Email Address</li>
                    <li>Current Grade</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyClasses;