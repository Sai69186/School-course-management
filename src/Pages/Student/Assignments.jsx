import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useData } from "../../context/DataContext";
import "../../styles/student.css";

const Assignments = () => {
  const { currentUser, getStudentAssignments } = useData();
  const [assignments, setAssignments] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (currentUser.role === "student") {
      const studentAssignments = getStudentAssignments(currentUser.id);
      setAssignments(studentAssignments);
    }
  }, [currentUser, getStudentAssignments]);

  const filteredAssignments = assignments.filter(assignment => {
    if (filter === "all") return true;
    return assignment.submissionStatus === filter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "pending": return "#f59e0b";
      case "submitted": return "#10b981";
      case "graded": return "#8b5cf6";
      default: return "#6b7280";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high": return "#ef4444";
      case "medium": return "#f59e0b";
      case "low": return "#10b981";
      default: return "#6b7280";
    }
  };

  const getDaysUntilDue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="student-dashboard">
      <div className="page-header">
        <h1>Assignments</h1>
        <p className="welcome">Track and manage your course assignments</p>
        <Link to="/student/home" className="back-btn">← Back to Dashboard</Link>
      </div>

      <div className="assignments-controls">
        <div className="filter-buttons">
          <button 
            className={filter === "all" ? "active" : ""}
            onClick={() => setFilter("all")}
          >
            All Assignments ({assignments.length})
          </button>
          <button 
            className={filter === "pending" ? "active" : ""}
            onClick={() => setFilter("pending")}
          >
            Pending ({assignments.filter(a => a.submissionStatus === "pending").length})
          </button>
          <button 
            className={filter === "submitted" ? "active" : ""}
            onClick={() => setFilter("submitted")}
          >
            Submitted ({assignments.filter(a => a.submissionStatus === "submitted").length})
          </button>
          <button 
            className={filter === "graded" ? "active" : ""}
            onClick={() => setFilter("graded")}
          >
            Graded ({assignments.filter(a => a.submissionStatus === "graded").length})
          </button>
        </div>
      </div>

      {filteredAssignments.length === 0 ? (
        <div className="no-assignments">
          <div className="no-assignments-card">
            <h3>No Assignments Found</h3>
            <p>
              {filter === "all" 
                ? "You don't have any assignments yet. Check back later or contact your instructors."
                : `No ${filter} assignments found. Try changing the filter.`
              }
            </p>
          </div>
        </div>
      ) : (
        <div className="assignments-grid">
          {filteredAssignments.map(assignment => {
            const daysUntilDue = getDaysUntilDue(assignment.dueDate);
            const isOverdue = daysUntilDue < 0;
            
            return (
              <div key={assignment.id} className="assignment-card">
                <div className="assignment-header">
                  <h3>{assignment.title}</h3>
                  <div className="assignment-meta">
                    <span className="course-tag">{assignment.courseCode}</span>
                    <span 
                      className="priority-tag"
                      style={{ backgroundColor: getPriorityColor(assignment.priority) }}
                    >
                      {assignment.priority}
                    </span>
                  </div>
                </div>

                <div className="assignment-body">
                  <p className="description">{assignment.description}</p>
                  <p className="course-name"><strong>Course:</strong> {assignment.courseName}</p>
                  
                  <div className="assignment-details">
                    <div className="detail-item">
                      <span className="label">Due Date:</span>
                      <span className={`value ${isOverdue ? 'overdue' : daysUntilDue <= 2 ? 'urgent' : ''}`}>
                        {assignment.dueDate}
                      </span>
                    </div>
                    
                    <div className="detail-item">
                      <span className="label">Points:</span>
                      <span className="value">{assignment.points}</span>
                    </div>

                    <div className="detail-item">
                      <span className="label">Time Left:</span>
                      <span className={`value ${isOverdue ? 'overdue' : daysUntilDue <= 2 ? 'urgent' : ''}`}>
                        {isOverdue ? `${Math.abs(daysUntilDue)} days overdue` : `${daysUntilDue} days`}
                      </span>
                    </div>

                    {assignment.submission?.grade && (
                      <div className="detail-item">
                        <span className="label">Grade:</span>
                        <span className="value grade">{assignment.submission.grade}</span>
                      </div>
                    )}
                  </div>

                  {assignment.submission && (
                    <div className="submission-info">
                      <p><strong>Submitted:</strong> {new Date(assignment.submission.submittedAt).toLocaleDateString()}</p>
                      <p><strong>Files:</strong> {assignment.submission.files.length} file(s)</p>
                      {assignment.submission.feedback && (
                        <div className="feedback-preview">
                          <strong>Feedback:</strong>
                          <p>{assignment.submission.feedback}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="assignment-footer">
                  <div className="status-section">
                    <span 
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(assignment.submissionStatus) }}
                    >
                      {assignment.submissionStatus}
                    </span>
                  </div>
                  
                  <div className="assignment-actions">
                    {assignment.submissionStatus === "pending" && (
                      <Link 
                        to={`/student/assignments/${assignment.id}/submit`}
                        className="btn-primary"
                      >
                        Submit Assignment
                      </Link>
                    )}
                    {assignment.submissionStatus === "submitted" && (
                      <Link 
                        to={`/student/assignments/${assignment.id}/submit`}
                        className="btn-outline"
                      >
                        View Submission
                      </Link>
                    )}
                    {assignment.submissionStatus === "graded" && (
                      <Link 
                        to={`/student/assignments/${assignment.id}/submit`}
                        className="btn-outline"
                      >
                        View Grade & Feedback
                      </Link>
                    )}
                    <button className="btn-secondary">View Details</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Assignments;