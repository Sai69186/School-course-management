import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useData } from "../../context/DataContext";
import "../../styles/teacher.css";

const TeacherAssignments = () => {
  const { getTeacherAssignments, getTeacherCourses, addAssignment } = useData();
  const [assignments, setAssignments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [newAssignment, setNewAssignment] = useState({
    title: "",
    courseCode: "",
    dueDate: "",
    points: "",
    description: "",
    instructions: "",
    priority: "medium"
  });

  // In a real app, this would come from authentication
  const currentInstructorId = "EMP2024001";

  useEffect(() => {
    const teacherAssignments = getTeacherAssignments(currentInstructorId);
    const teacherCourses = getTeacherCourses(currentInstructorId);
    
    // Add mock submission data for demo
    const assignmentsWithSubmissions = teacherAssignments.map(assignment => ({
      ...assignment,
      submissions: Math.floor(Math.random() * 20) + 5,
      totalStudents: 25,
      status: Math.random() > 0.5 ? "active" : "grading"
    }));
    
    setAssignments(assignmentsWithSubmissions);
    setCourses(teacherCourses);
  }, [currentInstructorId, getTeacherAssignments, getTeacherCourses]);

  const handleCreateAssignment = (e) => {
    e.preventDefault();
    
    // Find the course name for the selected course code
    const selectedCourse = courses.find(course => course.courseCode === newAssignment.courseCode);
    
    const assignmentData = {
      ...newAssignment,
      courseName: selectedCourse ? selectedCourse.courseName : newAssignment.courseCode,
      createdBy: currentInstructorId
    };
    
    const createdAssignment = addAssignment(assignmentData);
    
    // Add to local state with mock submission data
    const assignmentWithSubmissions = {
      ...createdAssignment,
      submissions: 0,
      totalStudents: selectedCourse ? selectedCourse.enrolledStudents.length : 25,
      status: "active"
    };
    
    setAssignments(prev => [...prev, assignmentWithSubmissions]);
    
    // Reset form
    setNewAssignment({
      title: "",
      courseCode: "",
      dueDate: "",
      points: "",
      description: "",
      instructions: "",
      priority: "medium"
    });
    setShowCreateForm(false);
    
    alert("Assignment created successfully!");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active": return "#3b82f6";
      case "grading": return "#f59e0b";
      case "completed": return "#10b981";
      default: return "#6b7280";
    }
  };

  const getSubmissionPercentage = (submissions, total) => {
    return total > 0 ? (submissions / total) * 100 : 0;
  };

  const getDaysUntilDue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const openDetailsModal = (assignment) => {
    setSelectedAssignment(assignment);
    setShowDetailsModal(true);
  };

  const openEditModal = (assignment) => {
    setSelectedAssignment(assignment);
    setNewAssignment({
      title: assignment.title,
      courseCode: assignment.courseCode,
      dueDate: assignment.dueDate,
      points: assignment.points,
      description: assignment.description,
      instructions: assignment.instructions || "",
      priority: assignment.priority
    });
    setShowEditModal(true);
  };

  const closeModals = () => {
    setShowCreateForm(false);
    setShowDetailsModal(false);
    setShowEditModal(false);
    setSelectedAssignment(null);
    setNewAssignment({
      title: "",
      courseCode: "",
      dueDate: "",
      points: "",
      description: "",
      instructions: "",
      priority: "medium"
    });
  };

  const handleEditAssignment = (e) => {
    e.preventDefault();
    
    // Update the assignment in the local state
    setAssignments(prev => prev.map(assignment => 
      assignment.id === selectedAssignment.id 
        ? { ...assignment, ...newAssignment }
        : assignment
    ));
    
    closeModals();
    alert("Assignment updated successfully!");
  };

  return (
    <div className="teacher-dashboard">
      <div className="page-header">
        <h1>Assignment Management</h1>
        <p className="welcome">Create, manage, and grade student assignments</p>
        <Link to="/teacher/home" className="back-btn">← Back to Dashboard</Link>
      </div>

      <div className="assignments-controls">
        <button 
          className="btn-primary"
          onClick={() => setShowCreateForm(true)}
        >
          + Create New Assignment
        </button>
      </div>

      <div className="assignments-overview">
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Active Assignments</h3>
            <span className="stat-number">{assignments.filter(a => a.status === "active").length}</span>
          </div>
          <div className="stat-card">
            <h3>Pending Grading</h3>
            <span className="stat-number">{assignments.filter(a => a.status === "grading").length}</span>
          </div>
          <div className="stat-card">
            <h3>Total Submissions</h3>
            <span className="stat-number">{assignments.reduce((sum, a) => sum + a.submissions, 0)}</span>
          </div>
          <div className="stat-card">
            <h3>Completed</h3>
            <span className="stat-number">{assignments.filter(a => a.status === "completed").length}</span>
          </div>
        </div>
      </div>

      {assignments.length === 0 ? (
        <div className="no-assignments">
          <div className="no-assignments-card">
            <h3>No Assignments Created</h3>
            <p>You haven't created any assignments yet. Start by creating your first assignment!</p>
            <button 
              className="btn-primary"
              onClick={() => setShowCreateForm(true)}
            >
              Create Your First Assignment
            </button>
          </div>
        </div>
      ) : (
        <div className="assignments-grid">
          {assignments.map(assignment => (
            <div key={assignment.id} className="assignment-card">
              <div className="assignment-header">
                <h3>{assignment.title}</h3>
                <div className="assignment-meta">
                  <span className="course-tag">{assignment.courseCode}</span>
                  <span 
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(assignment.status) }}
                  >
                    {assignment.status}
                  </span>
                </div>
              </div>

              <div className="assignment-body">
                <p className="description">{assignment.description}</p>
                <p className="course-name"><strong>Course:</strong> {assignment.courseName}</p>
                
                <div className="assignment-details">
                  <div className="detail-item">
                    <span className="label">Due Date:</span>
                    <span className="value">{assignment.dueDate}</span>
                  </div>
                  
                  <div className="detail-item">
                    <span className="label">Points:</span>
                    <span className="value">{assignment.points}</span>
                  </div>

                  <div className="detail-item">
                    <span className="label">Days Until Due:</span>
                    <span className={`value ${getDaysUntilDue(assignment.dueDate) <= 2 ? 'urgent' : ''}`}>
                      {getDaysUntilDue(assignment.dueDate)} days
                    </span>
                  </div>
                </div>

                <div className="submission-progress">
                  <div className="progress-header">
                    <span>Submissions</span>
                    <span>{assignment.submissions}/{assignment.totalStudents}</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ 
                        width: `${getSubmissionPercentage(assignment.submissions, assignment.totalStudents)}%`,
                        backgroundColor: getStatusColor(assignment.status)
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="assignment-actions">
                <button 
                  className="btn-primary"
                  onClick={() => openDetailsModal(assignment)}
                >
                  View Details
                </button>
                {assignment.status === "active" && (
                  <button 
                    className="btn-secondary"
                    onClick={() => openEditModal(assignment)}
                  >
                    Edit
                  </button>
                )}
                {assignment.submissions > 0 && (
                  <Link 
                    to={`/teacher/assignments/${assignment.id}/grade`}
                    className="btn-secondary"
                  >
                    Grade Submissions ({assignment.submissions})
                  </Link>
                )}
                {assignment.status === "completed" && (
                  <button className="btn-outline">View Results</button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {showCreateForm && (
        <div className="modal-overlay" onClick={closeModals}>
          <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Create New Assignment</h2>
              <button 
                className="close-btn"
                onClick={closeModals}
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleCreateAssignment} className="assignment-form">
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="title">Assignment Title *</label>
                  <input
                    type="text"
                    id="title"
                    value={newAssignment.title}
                    onChange={(e) => setNewAssignment({...newAssignment, title: e.target.value})}
                    required
                    placeholder="Enter assignment title"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="courseCode">Course *</label>
                  <select
                    id="courseCode"
                    value={newAssignment.courseCode}
                    onChange={(e) => setNewAssignment({...newAssignment, courseCode: e.target.value})}
                    required
                  >
                    <option value="">Select Course</option>
                    {courses.map(course => (
                      <option key={course.courseCode} value={course.courseCode}>
                        {course.courseCode} - {course.courseName}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="dueDate">Due Date *</label>
                  <input
                    type="date"
                    id="dueDate"
                    value={newAssignment.dueDate}
                    onChange={(e) => setNewAssignment({...newAssignment, dueDate: e.target.value})}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="points">Total Points *</label>
                  <input
                    type="number"
                    id="points"
                    value={newAssignment.points}
                    onChange={(e) => setNewAssignment({...newAssignment, points: e.target.value})}
                    required
                    min="1"
                    placeholder="100"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="priority">Priority</label>
                  <select
                    id="priority"
                    value={newAssignment.priority}
                    onChange={(e) => setNewAssignment({...newAssignment, priority: e.target.value})}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div className="form-group full-width">
                  <label htmlFor="description">Description *</label>
                  <textarea
                    id="description"
                    value={newAssignment.description}
                    onChange={(e) => setNewAssignment({...newAssignment, description: e.target.value})}
                    required
                    rows="3"
                    placeholder="Brief description of the assignment"
                  />
                </div>

                <div className="form-group full-width">
                  <label htmlFor="instructions">Detailed Instructions</label>
                  <textarea
                    id="instructions"
                    value={newAssignment.instructions}
                    onChange={(e) => setNewAssignment({...newAssignment, instructions: e.target.value})}
                    rows="5"
                    placeholder="Provide detailed instructions for students..."
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-primary">
                  Create Assignment
                </button>
                <button 
                  type="button" 
                  className="btn-secondary"
                  onClick={closeModals}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Assignment Details Modal */}
      {showDetailsModal && selectedAssignment && (
        <div className="modal-overlay" onClick={closeModals}>
          <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedAssignment.title}</h2>
              <button className="close-btn" onClick={closeModals}>×</button>
            </div>
            <div className="modal-body">
              <div className="assignment-details-grid">
                <div className="detail-section">
                  <h3>Assignment Information</h3>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <span className="label">Course:</span>
                      <span className="value">{selectedAssignment.courseCode} - {selectedAssignment.courseName}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Due Date:</span>
                      <span className="value">{selectedAssignment.dueDate}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Total Points:</span>
                      <span className="value">{selectedAssignment.points}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Priority:</span>
                      <span className="value">{selectedAssignment.priority}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Status:</span>
                      <span className="value">{selectedAssignment.status}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Days Until Due:</span>
                      <span className="value">{getDaysUntilDue(selectedAssignment.dueDate)} days</span>
                    </div>
                  </div>
                </div>

                <div className="detail-section">
                  <h3>Submission Statistics</h3>
                  <div className="stats-grid">
                    <div className="stat-item">
                      <span className="stat-number">{selectedAssignment.submissions}</span>
                      <span className="stat-label">Submissions</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-number">{selectedAssignment.totalStudents}</span>
                      <span className="stat-label">Total Students</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-number">{getSubmissionPercentage(selectedAssignment.submissions, selectedAssignment.totalStudents).toFixed(1)}%</span>
                      <span className="stat-label">Completion Rate</span>
                    </div>
                  </div>
                </div>

                <div className="detail-section">
                  <h3>Description</h3>
                  <p>{selectedAssignment.description}</p>
                </div>

                {selectedAssignment.instructions && (
                  <div className="detail-section">
                    <h3>Instructions</h3>
                    <p>{selectedAssignment.instructions}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Assignment Modal */}
      {showEditModal && selectedAssignment && (
        <div className="modal-overlay" onClick={closeModals}>
          <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Edit Assignment</h2>
              <button className="close-btn" onClick={closeModals}>×</button>
            </div>
            
            <form onSubmit={handleEditAssignment} className="assignment-form">
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="edit-title">Assignment Title *</label>
                  <input
                    type="text"
                    id="edit-title"
                    value={newAssignment.title}
                    onChange={(e) => setNewAssignment({...newAssignment, title: e.target.value})}
                    required
                    placeholder="Enter assignment title"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="edit-courseCode">Course *</label>
                  <select
                    id="edit-courseCode"
                    value={newAssignment.courseCode}
                    onChange={(e) => setNewAssignment({...newAssignment, courseCode: e.target.value})}
                    required
                  >
                    <option value="">Select Course</option>
                    {courses.map(course => (
                      <option key={course.courseCode} value={course.courseCode}>
                        {course.courseCode} - {course.courseName}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="edit-dueDate">Due Date *</label>
                  <input
                    type="date"
                    id="edit-dueDate"
                    value={newAssignment.dueDate}
                    onChange={(e) => setNewAssignment({...newAssignment, dueDate: e.target.value})}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="edit-points">Total Points *</label>
                  <input
                    type="number"
                    id="edit-points"
                    value={newAssignment.points}
                    onChange={(e) => setNewAssignment({...newAssignment, points: e.target.value})}
                    required
                    min="1"
                    placeholder="100"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="edit-priority">Priority</label>
                  <select
                    id="edit-priority"
                    value={newAssignment.priority}
                    onChange={(e) => setNewAssignment({...newAssignment, priority: e.target.value})}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div className="form-group full-width">
                  <label htmlFor="edit-description">Description *</label>
                  <textarea
                    id="edit-description"
                    value={newAssignment.description}
                    onChange={(e) => setNewAssignment({...newAssignment, description: e.target.value})}
                    required
                    rows="3"
                    placeholder="Brief description of the assignment"
                  />
                </div>

                <div className="form-group full-width">
                  <label htmlFor="edit-instructions">Detailed Instructions</label>
                  <textarea
                    id="edit-instructions"
                    value={newAssignment.instructions}
                    onChange={(e) => setNewAssignment({...newAssignment, instructions: e.target.value})}
                    rows="5"
                    placeholder="Provide detailed instructions for students..."
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-primary">
                  Update Assignment
                </button>
                <button 
                  type="button" 
                  className="btn-secondary"
                  onClick={closeModals}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherAssignments;