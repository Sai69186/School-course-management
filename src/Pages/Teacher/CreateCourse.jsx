import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useData } from "../../context/DataContext";
import "../../styles/teacher.css";

const CreateCourse = () => {
  const { addCourse } = useData();
  const navigate = useNavigate();
  
  const [courseData, setCourseData] = useState({
    courseName: "",
    courseCode: "",
    description: "",
    credits: "",
    department: "",
    semester: "",
    year: "",
    maxStudents: "",
    instructor: "Dr. Sarah Johnson", // This should come from auth context
    instructorId: "EMP2024001", // This should come from auth context
    schedule: {
      monday: { enabled: false, startTime: "", endTime: "" },
      tuesday: { enabled: false, startTime: "", endTime: "" },
      wednesday: { enabled: false, startTime: "", endTime: "" },
      thursday: { enabled: false, startTime: "", endTime: "" },
      friday: { enabled: false, startTime: "", endTime: "" }
    },
    prerequisites: "",
    syllabus: "",
    gradingPolicy: "",
    textbooks: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleScheduleChange = (day, field, value) => {
    setCourseData(prev => ({
      ...prev,
      schedule: {
        ...prev.schedule,
        [day]: {
          ...prev.schedule[day],
          [field]: value
        }
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Add the course to the shared data context
      const newCourse = addCourse(courseData);
      
      // Simulate API call delay
      setTimeout(() => {
        alert(`Course "${courseData.courseName}" created successfully!`);
        setIsSubmitting(false);
        
        // Reset form
        setCourseData({
          courseName: "",
          courseCode: "",
          description: "",
          credits: "",
          department: "",
          semester: "",
          year: "",
          maxStudents: "",
          instructor: "Dr. Sarah Johnson",
          instructorId: "EMP2024001",
          schedule: {
            monday: { enabled: false, startTime: "", endTime: "" },
            tuesday: { enabled: false, startTime: "", endTime: "" },
            wednesday: { enabled: false, startTime: "", endTime: "" },
            thursday: { enabled: false, startTime: "", endTime: "" },
            friday: { enabled: false, startTime: "", endTime: "" }
          },
          prerequisites: "",
          syllabus: "",
          gradingPolicy: "",
          textbooks: ""
        });
        
        // Navigate to classes page to see the new course
        navigate("/teacher/classes");
      }, 1500);
    } catch (error) {
      console.error("Error creating course:", error);
      alert("Error creating course. Please try again.");
      setIsSubmitting(false);
    }
  };

  const days = ["monday", "tuesday", "wednesday", "thursday", "friday"];

  return (
    <div className="teacher-dashboard">
      <div className="page-header">
        <h1>Create New Course</h1>
        <p className="welcome">Set up a new course with detailed information and schedule</p>
        <Link to="/teacher/home" className="back-btn">← Back to Dashboard</Link>
      </div>

      <div className="create-course-container">
        <form onSubmit={handleSubmit} className="course-form">
          <div className="form-section">
            <h3>Basic Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="courseName">Course Name *</label>
                <input
                  type="text"
                  id="courseName"
                  name="courseName"
                  value={courseData.courseName}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., Introduction to Computer Science"
                />
              </div>

              <div className="form-group">
                <label htmlFor="courseCode">Course Code *</label>
                <input
                  type="text"
                  id="courseCode"
                  name="courseCode"
                  value={courseData.courseCode}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., CS101"
                />
              </div>

              <div className="form-group">
                <label htmlFor="credits">Credits *</label>
                <select
                  id="credits"
                  name="credits"
                  value={courseData.credits}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Credits</option>
                  <option value="1">1 Credit</option>
                  <option value="2">2 Credits</option>
                  <option value="3">3 Credits</option>
                  <option value="4">4 Credits</option>
                  <option value="5">5 Credits</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="department">Department *</label>
                <select
                  id="department"
                  name="department"
                  value={courseData.department}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Department</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Physics">Physics</option>
                  <option value="English">English</option>
                  <option value="Business">Business</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Biology">Biology</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="semester">Semester *</label>
                <select
                  id="semester"
                  name="semester"
                  value={courseData.semester}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Semester</option>
                  <option value="Fall">Fall</option>
                  <option value="Spring">Spring</option>
                  <option value="Summer">Summer</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="year">Academic Year *</label>
                <select
                  id="year"
                  name="year"
                  value={courseData.year}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Year</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="maxStudents">Maximum Students</label>
                <input
                  type="number"
                  id="maxStudents"
                  name="maxStudents"
                  value={courseData.maxStudents}
                  onChange={handleInputChange}
                  placeholder="e.g., 30"
                  min="1"
                  max="200"
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="description">Course Description *</label>
                <textarea
                  id="description"
                  name="description"
                  value={courseData.description}
                  onChange={handleInputChange}
                  required
                  rows="4"
                  placeholder="Provide a detailed description of the course content and objectives..."
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Class Schedule</h3>
            <div className="schedule-grid">
              {days.map(day => (
                <div key={day} className="schedule-day">
                  <div className="day-header">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={courseData.schedule[day].enabled}
                        onChange={(e) => handleScheduleChange(day, 'enabled', e.target.checked)}
                      />
                      {day.charAt(0).toUpperCase() + day.slice(1)}
                    </label>
                  </div>
                  
                  {courseData.schedule[day].enabled && (
                    <div className="time-inputs">
                      <input
                        type="time"
                        value={courseData.schedule[day].startTime}
                        onChange={(e) => handleScheduleChange(day, 'startTime', e.target.value)}
                        placeholder="Start Time"
                      />
                      <input
                        type="time"
                        value={courseData.schedule[day].endTime}
                        onChange={(e) => handleScheduleChange(day, 'endTime', e.target.value)}
                        placeholder="End Time"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="form-section">
            <h3>Additional Information</h3>
            <div className="form-grid">
              <div className="form-group full-width">
                <label htmlFor="prerequisites">Prerequisites</label>
                <textarea
                  id="prerequisites"
                  name="prerequisites"
                  value={courseData.prerequisites}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="List any prerequisite courses or requirements..."
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="syllabus">Syllabus Overview</label>
                <textarea
                  id="syllabus"
                  name="syllabus"
                  value={courseData.syllabus}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Provide an overview of topics to be covered..."
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="gradingPolicy">Grading Policy</label>
                <textarea
                  id="gradingPolicy"
                  name="gradingPolicy"
                  value={courseData.gradingPolicy}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Describe the grading criteria and policies..."
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="textbooks">Required Textbooks</label>
                <textarea
                  id="textbooks"
                  name="textbooks"
                  value={courseData.textbooks}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="List required and recommended textbooks..."
                />
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button 
              type="submit" 
              className="btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating Course..." : "Create Course"}
            </button>
            <button type="button" className="btn-secondary">
              Save as Draft
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCourse;