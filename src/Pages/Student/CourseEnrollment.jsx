import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useData } from "../../context/DataContext";
import "../../styles/student.css";

const CourseEnrollment = () => {
  const { 
    currentUser, 
    getAvailableCoursesForStudent, 
    enrollStudent, 
    getStudentCourses 
  } = useData();
  
  const [availableCourses, setAvailableCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState({});

  useEffect(() => {
    if (currentUser.role === "student") {
      const available = getAvailableCoursesForStudent(currentUser.id);
      const enrolled = getStudentCourses(currentUser.id);
      setAvailableCourses(available);
      setEnrolledCourses(enrolled);
    }
  }, [currentUser, getAvailableCoursesForStudent, getStudentCourses]);

  const handleEnroll = async (courseCode) => {
    setLoading(prev => ({ ...prev, [courseCode]: true }));
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      enrollStudent(currentUser.id, courseCode);
      
      // Refresh the lists
      const available = getAvailableCoursesForStudent(currentUser.id);
      const enrolled = getStudentCourses(currentUser.id);
      setAvailableCourses(available);
      setEnrolledCourses(enrolled);
      
      alert(`Successfully enrolled in ${courseCode}!`);
    } catch (error) {
      alert("Failed to enroll. Please try again.");
    } finally {
      setLoading(prev => ({ ...prev, [courseCode]: false }));
    }
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

  const getEnrollmentPercentage = (enrolled, max) => {
    return (enrolled / max) * 100;
  };

  return (
    <div className="student-dashboard">
      <div className="page-header">
        <h1>Course Enrollment</h1>
        <p className="welcome">Enroll in available courses for the current semester</p>
        <Link to="/student/home" className="back-btn">← Back to Dashboard</Link>
      </div>

      {/* Currently Enrolled Courses */}
      <div className="enrollment-section">
        <h2>Currently Enrolled Courses ({enrolledCourses.length})</h2>
        {enrolledCourses.length === 0 ? (
          <div className="no-courses">
            <p>You are not enrolled in any courses yet.</p>
          </div>
        ) : (
          <div className="enrolled-courses-grid">
            {enrolledCourses.map(course => (
              <div key={course.id} className="enrolled-course-card">
                <div className="course-header">
                  <h3>{course.courseName}</h3>
                  <span className="course-code enrolled">{course.courseCode}</span>
                </div>
                <div className="course-info">
                  <p><strong>Instructor:</strong> {course.instructor}</p>
                  <p><strong>Credits:</strong> {course.credits}</p>
                  <p><strong>Schedule:</strong> {formatSchedule(course.schedule)}</p>
                </div>
                <div className="enrollment-status">
                  <span className="status-badge enrolled">✓ Enrolled</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Available Courses */}
      <div className="enrollment-section">
        <h2>Available Courses ({availableCourses.length})</h2>
        {availableCourses.length === 0 ? (
          <div className="no-courses">
            <div className="no-courses-card">
              <h3>No Available Courses</h3>
              <p>All courses are either full or you're already enrolled. Check back later for new courses!</p>
            </div>
          </div>
        ) : (
          <div className="available-courses-grid">
            {availableCourses.map(course => (
              <div key={course.id} className="available-course-card">
                <div className="course-header">
                  <h3>{course.courseName}</h3>
                  <span className="course-code">{course.courseCode}</span>
                </div>
                
                <div className="course-info">
                  <p className="course-description">{course.description}</p>
                  <div className="course-details">
                    <p><strong>Instructor:</strong> {course.instructor}</p>
                    <p><strong>Department:</strong> {course.department}</p>
                    <p><strong>Credits:</strong> {course.credits}</p>
                    <p><strong>Schedule:</strong> {formatSchedule(course.schedule)}</p>
                    <p><strong>Semester:</strong> {course.semester} {course.year}</p>
                  </div>
                </div>

                <div className="enrollment-info">
                  <div className="enrollment-progress">
                    <div className="progress-header">
                      <span>Enrollment</span>
                      <span>{course.enrolledStudents.length}/{course.maxStudents}</span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{ 
                          width: `${getEnrollmentPercentage(course.enrolledStudents.length, course.maxStudents)}%`,
                          backgroundColor: course.enrolledStudents.length >= course.maxStudents ? "#ef4444" : "#10b981"
                        }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="availability-status">
                    {course.enrolledStudents.length >= course.maxStudents ? (
                      <span className="status-badge full">Course Full</span>
                    ) : (
                      <span className="status-badge available">
                        {course.maxStudents - course.enrolledStudents.length} spots left
                      </span>
                    )}
                  </div>
                </div>

                <div className="course-actions">
                  <button 
                    className="btn-primary"
                    onClick={() => handleEnroll(course.courseCode)}
                    disabled={loading[course.courseCode] || course.enrolledStudents.length >= course.maxStudents}
                  >
                    {loading[course.courseCode] ? "Enrolling..." : "Enroll Now"}
                  </button>
                  <button className="btn-outline">View Details</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseEnrollment;