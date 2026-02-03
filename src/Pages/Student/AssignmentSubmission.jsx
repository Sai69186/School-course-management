import { useState, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useData } from "../../context/DataContext";
import "../../styles/student.css";

const AssignmentSubmission = () => {
  const { assignmentId } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  const { 
    currentUser, 
    getStudentAssignments, 
    submitAssignment 
  } = useData();
  
  const [assignment, setAssignment] = useState(null);
  const [files, setFiles] = useState([]);
  const [comments, setComments] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Find the assignment
  useState(() => {
    const studentAssignments = getStudentAssignments(currentUser.id);
    const foundAssignment = studentAssignments.find(a => a.id === parseInt(assignmentId));
    setAssignment(foundAssignment);
  }, [assignmentId, currentUser.id, getStudentAssignments]);

  const handleFileSelect = (selectedFiles) => {
    const newFiles = Array.from(selectedFiles).map(file => ({
      file,
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2), // Convert to MB
      type: file.type || 'Unknown',
      id: Date.now() + Math.random()
    }));

    // No file type or size restrictions - accept all files
    setFiles(prev => [...prev, ...newFiles]);
    
    // Show success message for file acceptance
    if (newFiles.length > 0) {
      const fileNames = newFiles.map(f => f.name).join(', ');
      console.log(`✅ Files accepted: ${fileNames}`);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files);
    }
  };

  const removeFile = (fileId) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (files.length === 0) {
      alert("Please select at least one file to submit.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate file upload delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      const submissionData = {
        files: files.map(f => ({
          name: f.name,
          size: parseFloat(f.size),
          type: f.type
        })),
        comments: comments.trim()
      };

      submitAssignment(assignment.id, currentUser.id, submissionData);
      
      alert("Assignment submitted successfully!");
      navigate("/student/assignments");
    } catch (error) {
      alert("Failed to submit assignment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getDaysUntilDue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (!assignment) {
    return (
      <div className="student-dashboard">
        <div className="page-header">
          <h1>Assignment Not Found</h1>
          <Link to="/student/assignments" className="back-btn">← Back to Assignments</Link>
        </div>
      </div>
    );
  }

  const daysUntilDue = getDaysUntilDue(assignment.dueDate);
  const isOverdue = daysUntilDue < 0;
  const isAlreadySubmitted = assignment.submission;

  return (
    <div className="student-dashboard">
      <div className="page-header">
        <h1>Submit Assignment</h1>
        <p className="welcome">Upload your assignment files and add comments</p>
        <Link to="/student/assignments" className="back-btn">← Back to Assignments</Link>
      </div>

      <div className="submission-container">
        <div className="assignment-info-card">
          <div className="assignment-header">
            <h2>{assignment.title}</h2>
            <div className="assignment-meta">
              <span className="course-tag">{assignment.courseCode}</span>
              <span className={`due-date ${isOverdue ? 'overdue' : daysUntilDue <= 2 ? 'urgent' : ''}`}>
                Due: {assignment.dueDate} ({isOverdue ? `${Math.abs(daysUntilDue)} days overdue` : `${daysUntilDue} days left`})
              </span>
            </div>
          </div>

          <div className="assignment-details">
            <div className="detail-section">
              <h3>Description</h3>
              <p>{assignment.description}</p>
            </div>

            {assignment.instructions && (
              <div className="detail-section">
                <h3>Instructions</h3>
                <p>{assignment.instructions}</p>
              </div>
            )}

            <div className="detail-section">
              <h3>Assignment Details</h3>
              <div className="details-grid">
                <div className="detail-item">
                  <span className="label">Course:</span>
                  <span className="value">{assignment.courseName}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Points:</span>
                  <span className="value">{assignment.points}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Priority:</span>
                  <span className="value">{assignment.priority}</span>
                </div>
              </div>
            </div>

            {assignment.allowedFileTypes && (
              <div className="detail-section">
                <h3>File Requirements</h3>
                <p><strong>File Upload:</strong> All file types accepted, no size limit</p>
                <p><em>Note: Original requirements were {assignment.allowedFileTypes.join(', ')} with {assignment.maxFileSize}MB limit, but now accepts any file.</em></p>
              </div>
            )}
          </div>
        </div>

        {isAlreadySubmitted ? (
          <div className="submission-status-card">
            <div className="status-header">
              <h3>✅ Assignment Already Submitted</h3>
              <span className="submitted-date">
                Submitted on: {new Date(assignment.submission.submittedAt).toLocaleDateString()}
              </span>
            </div>
            
            <div className="submitted-files">
              <h4>Submitted Files:</h4>
              <ul>
                {assignment.submission.files.map((file, index) => (
                  <li key={index}>
                    {file.name} ({file.size}MB)
                  </li>
                ))}
              </ul>
            </div>

            {assignment.submission.comments && (
              <div className="submitted-comments">
                <h4>Your Comments:</h4>
                <p>{assignment.submission.comments}</p>
              </div>
            )}

            {assignment.submission.grade && (
              <div className="grade-section">
                <h4>Grade: {assignment.submission.grade}</h4>
                {assignment.submission.feedback && (
                  <div className="feedback">
                    <h5>Instructor Feedback:</h5>
                    <p>{assignment.submission.feedback}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="submission-form">
            <div className="file-upload-section">
              <h3>Upload Files</h3>
              
              <div 
                className={`file-drop-zone ${dragActive ? 'drag-active' : ''}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="drop-zone-content">
                  <div className="upload-icon">📁</div>
                  <p>Drag and drop files here, or click to select</p>
                  <p className="file-info">
                    <span>All file types accepted • No size limit</span>
                  </p>
                </div>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={(e) => handleFileSelect(e.target.files)}
                style={{ display: 'none' }}
              />

              {files.length > 0 && (
                <div className="selected-files">
                  <h4>Selected Files ({files.length})</h4>
                  <div className="files-list">
                    {files.map(file => (
                      <div key={file.id} className="file-item">
                        <div className="file-info">
                          <span className="file-name">📎 {file.name}</span>
                          <span className="file-size">{file.size}MB</span>
                          <span className="file-type">{file.type || 'Unknown type'}</span>
                        </div>
                        <button 
                          type="button"
                          className="remove-file-btn"
                          onClick={() => removeFile(file.id)}
                          title="Remove file"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="comments-section">
              <h3>Comments (Optional)</h3>
              <textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Add any comments about your submission..."
                rows="4"
                className="comments-textarea"
              />
            </div>

            <div className="submission-actions">
              <button 
                type="submit" 
                className="btn-primary"
                disabled={isSubmitting || files.length === 0 || isOverdue}
              >
                {isSubmitting ? "Submitting..." : "Submit Assignment"}
              </button>
              
              {isOverdue && (
                <p className="overdue-warning">
                  ⚠️ This assignment is overdue. Late submissions may not be accepted.
                </p>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AssignmentSubmission;