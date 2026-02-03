import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useData } from "../../context/DataContext";
import "../../styles/teacher.css";

const GradeAssignments = () => {
  const { assignmentId } = useParams();
  const { 
    currentUser, 
    getTeacherAssignments, 
    getAssignmentSubmissions, 
    gradeSubmission 
  } = useData();
  
  const [assignment, setAssignment] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [gradeForm, setGradeForm] = useState({ grade: "", feedback: "" });
  const [isGrading, setIsGrading] = useState(false);

  useEffect(() => {
    if (currentUser.role === "teacher") {
      const teacherAssignments = getTeacherAssignments(currentUser.id);
      const foundAssignment = teacherAssignments.find(a => a.id === parseInt(assignmentId));
      setAssignment(foundAssignment);
      
      if (foundAssignment) {
        const assignmentSubmissions = getAssignmentSubmissions(foundAssignment.id);
        setSubmissions(assignmentSubmissions);
      }
    }
  }, [assignmentId, currentUser, getTeacherAssignments, getAssignmentSubmissions]);

  const handleGradeSubmission = async (e) => {
    e.preventDefault();
    if (!selectedSubmission || !gradeForm.grade) return;

    setIsGrading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      gradeSubmission(selectedSubmission.id, gradeForm.grade, gradeForm.feedback);
      
      // Refresh submissions
      const updatedSubmissions = getAssignmentSubmissions(assignment.id);
      setSubmissions(updatedSubmissions);
      
      setSelectedSubmission(null);
      setGradeForm({ grade: "", feedback: "" });
      alert("Grade submitted successfully!");
    } catch (error) {
      alert("Failed to submit grade. Please try again.");
    } finally {
      setIsGrading(false);
    }
  };

  const openGradingModal = (submission) => {
    setSelectedSubmission(submission);
    setGradeForm({
      grade: submission.grade || "",
      feedback: submission.feedback || ""
    });
  };

  const getGradeColor = (grade) => {
    if (!grade) return "#6b7280";
    const letter = grade.charAt(0);
    switch (letter) {
      case "A": return "#10b981";
      case "B": return "#3b82f6";
      case "C": return "#f59e0b";
      case "D": return "#ef4444";
      case "F": return "#dc2626";
      default: return "#6b7280";
    }
  };

  if (!assignment) {
    return (
      <div className="teacher-dashboard">
        <div className="page-header">
          <h1>Assignment Not Found</h1>
          <Link to="/teacher/assignments" className="back-btn">← Back to Assignments</Link>
        </div>
      </div>
    );
  }

  const gradedSubmissions = submissions.filter(s => s.grade);
  const pendingSubmissions = submissions.filter(s => !s.grade);

  return (
    <div className="teacher-dashboard">
      <div className="page-header">
        <h1>Grade Assignment</h1>
        <p className="welcome">Review and grade student submissions</p>
        <Link to="/teacher/assignments" className="back-btn">← Back to Assignments</Link>
      </div>

      <div className="grading-container">
        <div className="assignment-overview-card">
          <h2>{assignment.title}</h2>
          <div className="assignment-meta">
            <span className="course-tag">{assignment.courseCode}</span>
            <span className="points-tag">{assignment.points} points</span>
          </div>
          <p className="assignment-description">{assignment.description}</p>
          
          <div className="grading-stats">
            <div className="stat-item">
              <span className="stat-number">{submissions.length}</span>
              <span className="stat-label">Total Submissions</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{gradedSubmissions.length}</span>
              <span className="stat-label">Graded</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{pendingSubmissions.length}</span>
              <span className="stat-label">Pending</span>
            </div>
          </div>
        </div>

        {submissions.length === 0 ? (
          <div className="no-submissions">
            <div className="no-submissions-card">
              <h3>No Submissions Yet</h3>
              <p>Students haven't submitted their assignments yet. Check back later!</p>
            </div>
          </div>
        ) : (
          <div className="submissions-section">
            <h3>Student Submissions</h3>
            <div className="submissions-grid">
              {submissions.map(submission => (
                <div key={submission.id} className="submission-card">
                  <div className="submission-header">
                    <h4>Student ID: {submission.studentId}</h4>
                    <div className="submission-meta">
                      <span className="submitted-date">
                        {new Date(submission.submittedAt).toLocaleDateString()}
                      </span>
                      {submission.grade ? (
                        <span 
                          className="grade-badge"
                          style={{ backgroundColor: getGradeColor(submission.grade) }}
                        >
                          {submission.grade}
                        </span>
                      ) : (
                        <span className="status-badge pending">Pending</span>
                      )}
                    </div>
                  </div>

                  <div className="submission-content">
                    <div className="submitted-files">
                      <h5>Files ({submission.files.length})</h5>
                      <ul>
                        {submission.files.map((file, index) => (
                          <li key={index}>
                            📄 {file.name} ({file.size}MB)
                          </li>
                        ))}
                      </ul>
                    </div>

                    {submission.comments && (
                      <div className="student-comments">
                        <h5>Student Comments</h5>
                        <p>{submission.comments}</p>
                      </div>
                    )}

                    {submission.feedback && (
                      <div className="teacher-feedback">
                        <h5>Your Feedback</h5>
                        <p>{submission.feedback}</p>
                      </div>
                    )}
                  </div>

                  <div className="submission-actions">
                    <button 
                      className="btn-primary"
                      onClick={() => openGradingModal(submission)}
                    >
                      {submission.grade ? "Update Grade" : "Grade Submission"}
                    </button>
                    <button className="btn-outline">Download Files</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {selectedSubmission && (
        <div className="modal-overlay" onClick={() => setSelectedSubmission(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Grade Submission</h2>
              <button 
                className="close-btn"
                onClick={() => setSelectedSubmission(null)}
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <div className="submission-details">
                <h3>Student: {selectedSubmission.studentId}</h3>
                <p><strong>Submitted:</strong> {new Date(selectedSubmission.submittedAt).toLocaleString()}</p>
                <p><strong>Files:</strong> {selectedSubmission.files.length} file(s)</p>
                
                {selectedSubmission.comments && (
                  <div className="student-comments-modal">
                    <h4>Student Comments:</h4>
                    <p>{selectedSubmission.comments}</p>
                  </div>
                )}
              </div>

              <form onSubmit={handleGradeSubmission} className="grading-form">
                <div className="form-group">
                  <label htmlFor="grade">Grade *</label>
                  <select
                    id="grade"
                    value={gradeForm.grade}
                    onChange={(e) => setGradeForm({...gradeForm, grade: e.target.value})}
                    required
                  >
                    <option value="">Select Grade</option>
                    <option value="A+">A+ (97-100)</option>
                    <option value="A">A (93-96)</option>
                    <option value="A-">A- (90-92)</option>
                    <option value="B+">B+ (87-89)</option>
                    <option value="B">B (83-86)</option>
                    <option value="B-">B- (80-82)</option>
                    <option value="C+">C+ (77-79)</option>
                    <option value="C">C (73-76)</option>
                    <option value="C-">C- (70-72)</option>
                    <option value="D+">D+ (67-69)</option>
                    <option value="D">D (63-66)</option>
                    <option value="D-">D- (60-62)</option>
                    <option value="F">F (0-59)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="feedback">Feedback</label>
                  <textarea
                    id="feedback"
                    value={gradeForm.feedback}
                    onChange={(e) => setGradeForm({...gradeForm, feedback: e.target.value})}
                    rows="4"
                    placeholder="Provide feedback to the student..."
                  />
                </div>

                <div className="form-actions">
                  <button 
                    type="submit" 
                    className="btn-primary"
                    disabled={isGrading}
                  >
                    {isGrading ? "Submitting..." : "Submit Grade"}
                  </button>
                  <button 
                    type="button" 
                    className="btn-secondary"
                    onClick={() => setSelectedSubmission(null)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GradeAssignments;