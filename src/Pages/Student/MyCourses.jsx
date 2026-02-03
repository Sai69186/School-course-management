import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useData } from "../../context/DataContext";
import "../../styles/student.css";

const MyCourses = () => {
  const { getStudentCourses } = useData();
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showMaterialsModal, setShowMaterialsModal] = useState(false);
  
  // In a real app, this would come from authentication
  const currentStudentId = "STU2024001"; // This should come from auth context

  useEffect(() => {
    const studentCourses = getStudentCourses(currentStudentId);
    setCourses(studentCourses);
  }, [currentStudentId, getStudentCourses]);

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

  const openDetailsModal = (course) => {
    setSelectedCourse(course);
    setShowDetailsModal(true);
  };

  const openMaterialsModal = (course) => {
    setSelectedCourse(course);
    setShowMaterialsModal(true);
  };

  const closeModals = () => {
    setShowDetailsModal(false);
    setShowMaterialsModal(false);
    setSelectedCourse(null);
  };

  // Mock materials data with more comprehensive content
  const getMaterials = (courseCode) => {
    const materials = {
      "CS101": [
        { id: 1, name: "Course Syllabus.pdf", type: "PDF", size: "1.2 MB", uploadDate: "2024-01-10", description: "Complete course syllabus and schedule" },
        { id: 2, name: "Introduction to Programming.pdf", type: "PDF", size: "2.5 MB", uploadDate: "2024-01-15", description: "Fundamental programming concepts and syntax" },
        { id: 3, name: "Variables and Data Types.pptx", type: "PowerPoint", size: "1.8 MB", uploadDate: "2024-01-20", description: "Presentation on data types and variable declaration" },
        { id: 4, name: "Control Structures Examples.zip", type: "Archive", size: "5.2 MB", uploadDate: "2024-01-25", description: "Code examples for loops, conditionals, and functions" },
        { id: 5, name: "Practice Problems Set 1.docx", type: "Word", size: "0.8 MB", uploadDate: "2024-02-01", description: "Programming exercises and solutions" },
        { id: 6, name: "Hello World Tutorial.mp4", type: "Video", size: "45.3 MB", uploadDate: "2024-01-18", description: "Step-by-step video tutorial for first program" },
        { id: 7, name: "Programming Environment Setup.pdf", type: "PDF", size: "3.1 MB", uploadDate: "2024-01-12", description: "Guide to setting up development environment" },
        { id: 8, name: "Debugging Techniques.pptx", type: "PowerPoint", size: "2.2 MB", uploadDate: "2024-01-28", description: "Common debugging strategies and tools" },
        { id: 9, name: "Sample Code Repository.zip", type: "Archive", size: "12.7 MB", uploadDate: "2024-02-03", description: "Complete code examples from lectures" },
        { id: 10, name: "Midterm Study Guide.pdf", type: "PDF", size: "1.9 MB", uploadDate: "2024-02-05", description: "Comprehensive review for midterm exam" }
      ],
      "CS201": [
        { id: 1, name: "Data Structures Overview.pdf", type: "PDF", size: "4.2 MB", uploadDate: "2024-01-16", description: "Introduction to fundamental data structures" },
        { id: 2, name: "Arrays and Linked Lists.pptx", type: "PowerPoint", size: "3.2 MB", uploadDate: "2024-01-18", description: "Comparison of array and linked list implementations" },
        { id: 3, name: "Tree Data Structures.pptx", type: "PowerPoint", size: "2.1 MB", uploadDate: "2024-01-22", description: "Binary trees, BST, and tree traversal algorithms" },
        { id: 4, name: "Algorithm Analysis.pdf", type: "PDF", size: "1.9 MB", uploadDate: "2024-01-28", description: "Big O notation and complexity analysis" },
        { id: 5, name: "Sorting Algorithms Code.zip", type: "Archive", size: "4.5 MB", uploadDate: "2024-02-03", description: "Implementation of various sorting algorithms" },
        { id: 6, name: "Graph Algorithms.mp4", type: "Video", size: "67.8 MB", uploadDate: "2024-01-30", description: "Video lecture on graph traversal and shortest path" },
        { id: 7, name: "Hash Tables Implementation.java", type: "Code", size: "0.3 MB", uploadDate: "2024-01-26", description: "Complete hash table implementation in Java" },
        { id: 8, name: "Stack and Queue Examples.zip", type: "Archive", size: "2.8 MB", uploadDate: "2024-01-24", description: "Practical examples of stack and queue usage" },
        { id: 9, name: "Algorithm Visualization Tool.html", type: "HTML", size: "0.9 MB", uploadDate: "2024-02-01", description: "Interactive tool for algorithm visualization" },
        { id: 10, name: "Final Project Guidelines.pdf", type: "PDF", size: "2.3 MB", uploadDate: "2024-02-07", description: "Requirements and rubric for final project" }
      ],
      "CS301": [
        { id: 1, name: "Database Fundamentals.pdf", type: "PDF", size: "3.8 MB", uploadDate: "2024-01-14", description: "Introduction to database concepts and DBMS" },
        { id: 2, name: "Database Design Principles.pdf", type: "PDF", size: "2.8 MB", uploadDate: "2024-01-16", description: "ER modeling and database design methodology" },
        { id: 3, name: "SQL Fundamentals.pptx", type: "PowerPoint", size: "2.3 MB", uploadDate: "2024-01-21", description: "Basic SQL queries and database operations" },
        { id: 4, name: "Normalization Examples.docx", type: "Word", size: "1.1 MB", uploadDate: "2024-01-26", description: "Step-by-step normalization examples" },
        { id: 5, name: "Sample Database Scripts.sql", type: "SQL", size: "0.6 MB", uploadDate: "2024-02-02", description: "Complete database creation and sample data" },
        { id: 6, name: "Advanced SQL Queries.mp4", type: "Video", size: "52.4 MB", uploadDate: "2024-01-29", description: "Video tutorial on complex SQL operations" },
        { id: 7, name: "Transaction Processing.pdf", type: "PDF", size: "2.1 MB", uploadDate: "2024-02-04", description: "ACID properties and transaction management" },
        { id: 8, name: "Database Security.pptx", type: "PowerPoint", size: "1.7 MB", uploadDate: "2024-02-06", description: "Security measures and access control" },
        { id: 9, name: "NoSQL Databases.pdf", type: "PDF", size: "3.4 MB", uploadDate: "2024-02-08", description: "Introduction to MongoDB and document databases" },
        { id: 10, name: "Database Project Template.zip", type: "Archive", size: "8.9 MB", uploadDate: "2024-02-10", description: "Starter template for database project" }
      ]
    };
    return materials[courseCode] || [];
  };

  return (
    <div className="student-dashboard">
      <div className="page-header">
        <h1>My Courses</h1>
        <p className="welcome">Track your enrolled courses and academic progress</p>
        <Link to="/student/home" className="back-btn">← Back to Dashboard</Link>
      </div>

      {courses.length === 0 ? (
        <div className="no-courses">
          <div className="no-courses-card">
            <h3>No Courses Enrolled</h3>
            <p>You are not currently enrolled in any courses. Contact your academic advisor to enroll in courses.</p>
          </div>
        </div>
      ) : (
        <div className="courses-grid">
          {courses.map(course => (
            <div key={course.id} className="course-card">
              <div className="course-header">
                <h3>{course.courseName}</h3>
                <span className="course-code">{course.courseCode}</span>
              </div>
              
              <div className="course-info">
                <p><strong>Instructor:</strong> {course.instructor}</p>
                <p><strong>Credits:</strong> {course.credits}</p>
                <p><strong>Schedule:</strong> {formatSchedule(course.schedule)}</p>
                <p><strong>Department:</strong> {course.department}</p>
                <p><strong>Current Grade:</strong> <span className="grade">{course.grade}</span></p>
              </div>

              <div className="progress-section">
                <div className="progress-header">
                  <span>Progress</span>
                  <span>{course.progress}%</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="attendance-info">
                <p><strong>Attendance:</strong> {course.attendance.percentage.toFixed(1)}% 
                  ({course.attendance.attended}/{course.attendance.total} classes)</p>
              </div>

              <div className="course-actions">
                <button 
                  className="btn-primary"
                  onClick={() => openDetailsModal(course)}
                >
                  View Details
                </button>
                <button 
                  className="btn-secondary"
                  onClick={() => openMaterialsModal(course)}
                >
                  Materials
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Course Details Modal */}
      {showDetailsModal && selectedCourse && (
        <div className="modal-overlay" onClick={closeModals}>
          <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedCourse.courseName}</h2>
              <button className="close-btn" onClick={closeModals}>×</button>
            </div>
            <div className="modal-body">
              <div className="course-details-grid">
                <div className="detail-section">
                  <h3>Course Information</h3>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <span className="label">Course Code:</span>
                      <span className="value">{selectedCourse.courseCode}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Credits:</span>
                      <span className="value">{selectedCourse.credits}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Department:</span>
                      <span className="value">{selectedCourse.department}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Semester:</span>
                      <span className="value">{selectedCourse.semester} {selectedCourse.year}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Instructor:</span>
                      <span className="value">{selectedCourse.instructor}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Schedule:</span>
                      <span className="value">{formatSchedule(selectedCourse.schedule)}</span>
                    </div>
                  </div>
                </div>

                <div className="detail-section">
                  <h3>Academic Progress</h3>
                  <div className="progress-details">
                    <div className="progress-item">
                      <span className="label">Current Grade:</span>
                      <span className="value grade-display">{selectedCourse.grade}</span>
                    </div>
                    <div className="progress-item">
                      <span className="label">Course Progress:</span>
                      <div className="progress-bar-detail">
                        <div className="progress-fill" style={{ width: `${selectedCourse.progress}%` }}></div>
                        <span className="progress-text">{selectedCourse.progress}%</span>
                      </div>
                    </div>
                    <div className="progress-item">
                      <span className="label">Attendance:</span>
                      <span className="value">{selectedCourse.attendance.percentage.toFixed(1)}% ({selectedCourse.attendance.attended}/{selectedCourse.attendance.total})</span>
                    </div>
                  </div>
                </div>

                <div className="detail-section">
                  <h3>Course Description</h3>
                  <p>{selectedCourse.description}</p>
                </div>

                <div className="detail-section">
                  <h3>Enrollment Information</h3>
                  <div className="enrollment-details">
                    <p><strong>Enrolled Students:</strong> {selectedCourse.enrolledStudents?.length || 0}/{selectedCourse.maxStudents}</p>
                    <p><strong>Status:</strong> <span className="status-active">{selectedCourse.status}</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Course Materials Modal */}
      {showMaterialsModal && selectedCourse && (
        <div className="modal-overlay" onClick={closeModals}>
          <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Course Materials - {selectedCourse.courseCode}</h2>
              <button className="close-btn" onClick={closeModals}>×</button>
            </div>
            <div className="modal-body">
              <div className="materials-section">
                <div className="materials-header">
                  <h3>Available Materials</h3>
                  <span className="materials-count">
                    {getMaterials(selectedCourse.courseCode).length} items
                  </span>
                </div>
                {getMaterials(selectedCourse.courseCode).length === 0 ? (
                  <div className="no-materials">
                    <p>No materials have been uploaded for this course yet.</p>
                  </div>
                ) : (
                  <div className="materials-list">
                    {getMaterials(selectedCourse.courseCode).map(material => (
                      <div key={material.id} className="material-item">
                        <div className="material-info">
                          <div className="material-icon">
                            {material.type === 'PDF' && '📄'}
                            {material.type === 'PowerPoint' && '📊'}
                            {material.type === 'Word' && '📝'}
                            {material.type === 'Archive' && '📦'}
                            {material.type === 'SQL' && '🗃️'}
                            {material.type === 'Video' && '🎥'}
                            {material.type === 'Code' && '💻'}
                            {material.type === 'HTML' && '🌐'}
                          </div>
                          <div className="material-details">
                            <h4>{material.name}</h4>
                            <p className="material-meta">{material.type} • {material.size} • Uploaded: {material.uploadDate}</p>
                            <p className="material-description">{material.description}</p>
                          </div>
                        </div>
                        <div className="material-actions">
                          <button className="btn-outline">📥 Download</button>
                          <button className="btn-secondary">👁️ Preview</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCourses;