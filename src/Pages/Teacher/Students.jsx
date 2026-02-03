import { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/teacher.css";

const Students = () => {
  const [students] = useState([
    {
      id: 1,
      name: "Alice Johnson",
      studentId: "STU2024001",
      email: "alice.johnson@student.edu",
      courses: ["CS101", "CS201"],
      gpa: 3.8,
      attendance: 95,
      status: "Active",
      year: "Sophomore",
      major: "Computer Science"
    },
    {
      id: 2,
      name: "Bob Smith",
      studentId: "STU2024002",
      email: "bob.smith@student.edu",
      courses: ["CS101", "CS301"],
      gpa: 3.2,
      attendance: 87,
      status: "Active",
      year: "Junior",
      major: "Computer Science"
    },
    {
      id: 3,
      name: "Carol Davis",
      studentId: "STU2024003",
      email: "carol.davis@student.edu",
      courses: ["CS201", "CS301"],
      gpa: 3.9,
      attendance: 98,
      status: "Active",
      year: "Senior",
      major: "Computer Science"
    },
    {
      id: 4,
      name: "David Wilson",
      studentId: "STU2024004",
      email: "david.wilson@student.edu",
      courses: ["CS101"],
      gpa: 2.8,
      attendance: 78,
      status: "Warning",
      year: "Freshman",
      major: "Computer Science"
    },
    {
      id: 5,
      name: "Emma Brown",
      studentId: "STU2024005",
      email: "emma.brown@student.edu",
      courses: ["CS150", "CS201"],
      gpa: 3.6,
      attendance: 92,
      status: "Active",
      year: "Sophomore",
      major: "Information Systems"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCourse, setFilterCourse] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactForm, setContactForm] = useState({
    subject: "",
    message: "",
    priority: "normal"
  });

  const courses = ["CS101", "CS150", "CS201", "CS301"];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = filterCourse === "all" || student.courses.includes(filterCourse);
    const matchesStatus = filterStatus === "all" || student.status === filterStatus;
    
    return matchesSearch && matchesCourse && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Active": return "#10b981";
      case "Warning": return "#f59e0b";
      case "Inactive": return "#ef4444";
      default: return "#6b7280";
    }
  };

  const getGPAColor = (gpa) => {
    if (gpa >= 3.5) return "#10b981";
    if (gpa >= 3.0) return "#f59e0b";
    return "#ef4444";
  };

  const getAttendanceColor = (attendance) => {
    if (attendance >= 90) return "#10b981";
    if (attendance >= 80) return "#f59e0b";
    return "#ef4444";
  };

  const openContactModal = (student) => {
    setSelectedStudent(student);
    setShowContactModal(true);
  };

  const closeModals = () => {
    setSelectedStudent(null);
    setShowContactModal(false);
    setContactForm({
      subject: "",
      message: "",
      priority: "normal"
    });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    
    // Mock sending message
    alert(`Message sent to ${selectedStudent.name}!\n\nSubject: ${contactForm.subject}\nMessage: ${contactForm.message}`);
    
    closeModals();
  };

  return (
    <div className="teacher-dashboard">
      <div className="page-header">
        <h1>Student Management</h1>
        <p className="welcome">View and manage enrolled students across all your courses</p>
        <Link to="/teacher/home" className="back-btn">← Back to Dashboard</Link>
      </div>

      <div className="students-controls">
        <div className="search-section">
          <input
            type="text"
            placeholder="Search students by name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-section">
          <select
            value={filterCourse}
            onChange={(e) => setFilterCourse(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Courses</option>
            {courses.map(course => (
              <option key={course} value={course}>{course}</option>
            ))}
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="Warning">Warning</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div className="students-stats">
        <div className="stat-card">
          <h3>Total Students</h3>
          <span className="stat-number">{students.length}</span>
        </div>
        <div className="stat-card">
          <h3>Active Students</h3>
          <span className="stat-number">{students.filter(s => s.status === "Active").length}</span>
        </div>
        <div className="stat-card">
          <h3>Average GPA</h3>
          <span className="stat-number">
            {(students.reduce((sum, s) => sum + s.gpa, 0) / students.length).toFixed(2)}
          </span>
        </div>
        <div className="stat-card">
          <h3>Average Attendance</h3>
          <span className="stat-number">
            {Math.round(students.reduce((sum, s) => sum + s.attendance, 0) / students.length)}%
          </span>
        </div>
      </div>

      <div className="students-table">
        <table>
          <thead>
            <tr>
              <th>Student</th>
              <th>ID</th>
              <th>Year</th>
              <th>Major</th>
              <th>Courses</th>
              <th>GPA</th>
              <th>Attendance</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map(student => (
              <tr key={student.id}>
                <td>
                  <div className="student-info">
                    <div className="student-avatar">
                      {student.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="student-name">{student.name}</div>
                      <div className="student-email">{student.email}</div>
                    </div>
                  </div>
                </td>
                <td>{student.studentId}</td>
                <td>{student.year}</td>
                <td>{student.major}</td>
                <td>
                  <div className="courses-list">
                    {student.courses.map(course => (
                      <span key={course} className="course-tag">{course}</span>
                    ))}
                  </div>
                </td>
                <td>
                  <span 
                    className="gpa-badge"
                    style={{ color: getGPAColor(student.gpa) }}
                  >
                    {student.gpa}
                  </span>
                </td>
                <td>
                  <span 
                    className="attendance-badge"
                    style={{ color: getAttendanceColor(student.attendance) }}
                  >
                    {student.attendance}%
                  </span>
                </td>
                <td>
                  <span 
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(student.status) }}
                  >
                    {student.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button 
                      className="btn-small btn-primary"
                      onClick={() => setSelectedStudent(student)}
                    >
                      View
                    </button>
                    <button 
                      className="btn-small btn-secondary"
                      onClick={() => openContactModal(student)}
                    >
                      Contact
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedStudent && !showContactModal && (
        <div className="modal-overlay" onClick={closeModals}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Student Details</h2>
              <button 
                className="close-btn"
                onClick={closeModals}
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <div className="student-detail-card">
                <div className="student-header">
                  <div className="student-avatar large">
                    {selectedStudent.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="student-info">
                    <h3>{selectedStudent.name}</h3>
                    <p>{selectedStudent.studentId}</p>
                    <p>{selectedStudent.email}</p>
                  </div>
                </div>

                <div className="student-details">
                  <div className="detail-grid">
                    <div className="detail-item">
                      <strong>Academic Year:</strong> {selectedStudent.year}
                    </div>
                    <div className="detail-item">
                      <strong>Major:</strong> {selectedStudent.major}
                    </div>
                    <div className="detail-item">
                      <strong>GPA:</strong> 
                      <span style={{ color: getGPAColor(selectedStudent.gpa) }}>
                        {selectedStudent.gpa}
                      </span>
                    </div>
                    <div className="detail-item">
                      <strong>Attendance:</strong>
                      <span style={{ color: getAttendanceColor(selectedStudent.attendance) }}>
                        {selectedStudent.attendance}%
                      </span>
                    </div>
                    <div className="detail-item">
                      <strong>Status:</strong>
                      <span 
                        className="status-badge"
                        style={{ backgroundColor: getStatusColor(selectedStudent.status) }}
                      >
                        {selectedStudent.status}
                      </span>
                    </div>
                    <div className="detail-item">
                      <strong>Enrolled Courses:</strong>
                      <div className="courses-list">
                        {selectedStudent.courses.map(course => (
                          <span key={course} className="course-tag">{course}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="modal-actions">
                  <button 
                    className="btn-primary"
                    onClick={() => openContactModal(selectedStudent)}
                  >
                    Send Message
                  </button>
                  <button className="btn-secondary">View Grades</button>
                  <button className="btn-outline">Export Report</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Modal */}
      {showContactModal && selectedStudent && (
        <div className="modal-overlay" onClick={closeModals}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Contact Student</h2>
              <button className="close-btn" onClick={closeModals}>×</button>
            </div>
            <div className="modal-body">
              <div className="contact-info">
                <div className="student-contact-header">
                  <div className="student-avatar">
                    {selectedStudent.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3>{selectedStudent.name}</h3>
                    <p>{selectedStudent.email}</p>
                    <p>{selectedStudent.studentId}</p>
                  </div>
                </div>

                <form onSubmit={handleSendMessage} className="contact-form">
                  <div className="form-group">
                    <label htmlFor="subject">Subject *</label>
                    <input
                      type="text"
                      id="subject"
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                      required
                      placeholder="Enter message subject"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="priority">Priority</label>
                    <select
                      id="priority"
                      value={contactForm.priority}
                      onChange={(e) => setContactForm({...contactForm, priority: e.target.value})}
                    >
                      <option value="low">Low</option>
                      <option value="normal">Normal</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message *</label>
                    <textarea
                      id="message"
                      value={contactForm.message}
                      onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                      required
                      rows="6"
                      placeholder="Type your message here..."
                    />
                  </div>

                  <div className="contact-actions">
                    <button type="submit" className="btn-primary">
                      Send Message
                    </button>
                    <button type="button" className="btn-secondary" onClick={closeModals}>
                      Cancel
                    </button>
                  </div>
                </form>

                <div className="contact-options">
                  <h4>Other Contact Options</h4>
                  <div className="contact-buttons">
                    <button className="btn-outline">📧 Send Email</button>
                    <button className="btn-outline">📱 SMS Notification</button>
                    <button className="btn-outline">📞 Schedule Call</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Students;