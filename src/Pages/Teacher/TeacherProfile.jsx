import { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/teacher.css";

const TeacherProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    firstName: "Dr. Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@university.edu",
    phone: "+1 (555) 234-5678",
    employeeId: "EMP2024001",
    department: "Computer Science",
    position: "Associate Professor",
    officeLocation: "Room 305, CS Building",
    officeHours: "Mon, Wed, Fri: 2:00 PM - 4:00 PM",
    education: "Ph.D. in Computer Science, MIT",
    specialization: "Data Structures, Algorithms, Machine Learning",
    yearsExperience: "8",
    researchInterests: "Artificial Intelligence, Data Mining, Software Engineering",
    publications: "25",
    courses: ["CS101", "CS201", "CS301"]
  });

  const [formData, setFormData] = useState(profile);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    setProfile(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(profile);
    setIsEditing(false);
  };

  return (
    <div className="teacher-dashboard">
      <div className="page-header">
        <h1>Faculty Profile</h1>
        <p className="welcome">Manage your professional information and academic details</p>
        <Link to="/teacher/home" className="back-btn">← Back to Dashboard</Link>
      </div>

      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar">
              <div className="avatar-circle">
                {profile.firstName[0]}{profile.lastName[0]}
              </div>
            </div>
            <div className="profile-title">
              <h2>{profile.firstName} {profile.lastName}</h2>
              <p className="employee-id">Employee ID: {profile.employeeId}</p>
              <p className="position">{profile.position}, {profile.department}</p>
            </div>
            <div className="profile-actions">
              {!isEditing ? (
                <button className="btn-primary" onClick={() => setIsEditing(true)}>
                  Edit Profile
                </button>
              ) : (
                <div className="edit-actions">
                  <button className="btn-primary" onClick={handleSave}>
                    Save Changes
                  </button>
                  <button className="btn-secondary" onClick={handleCancel}>
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="profile-content">
            <div className="profile-section">
              <h3>Personal Information</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>First Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <span className="form-value">{profile.firstName}</span>
                  )}
                </div>

                <div className="form-group">
                  <label>Last Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <span className="form-value">{profile.lastName}</span>
                  )}
                </div>

                <div className="form-group">
                  <label>Email</label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <span className="form-value">{profile.email}</span>
                  )}
                </div>

                <div className="form-group">
                  <label>Phone</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <span className="form-value">{profile.phone}</span>
                  )}
                </div>

                <div className="form-group">
                  <label>Office Location</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="officeLocation"
                      value={formData.officeLocation}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <span className="form-value">{profile.officeLocation}</span>
                  )}
                </div>

                <div className="form-group">
                  <label>Office Hours</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="officeHours"
                      value={formData.officeHours}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <span className="form-value">{profile.officeHours}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="profile-section">
              <h3>Professional Information</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Department</label>
                  {isEditing ? (
                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                    >
                      <option value="Computer Science">Computer Science</option>
                      <option value="Mathematics">Mathematics</option>
                      <option value="Physics">Physics</option>
                      <option value="English">English</option>
                      <option value="Business">Business</option>
                    </select>
                  ) : (
                    <span className="form-value">{profile.department}</span>
                  )}
                </div>

                <div className="form-group">
                  <label>Position</label>
                  {isEditing ? (
                    <select
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                    >
                      <option value="Assistant Professor">Assistant Professor</option>
                      <option value="Associate Professor">Associate Professor</option>
                      <option value="Professor">Professor</option>
                      <option value="Lecturer">Lecturer</option>
                      <option value="Adjunct Professor">Adjunct Professor</option>
                    </select>
                  ) : (
                    <span className="form-value">{profile.position}</span>
                  )}
                </div>

                <div className="form-group">
                  <label>Years of Experience</label>
                  {isEditing ? (
                    <input
                      type="number"
                      name="yearsExperience"
                      value={formData.yearsExperience}
                      onChange={handleInputChange}
                      min="0"
                    />
                  ) : (
                    <span className="form-value">{profile.yearsExperience} years</span>
                  )}
                </div>

                <div className="form-group">
                  <label>Publications</label>
                  {isEditing ? (
                    <input
                      type="number"
                      name="publications"
                      value={formData.publications}
                      onChange={handleInputChange}
                      min="0"
                    />
                  ) : (
                    <span className="form-value">{profile.publications}</span>
                  )}
                </div>

                <div className="form-group full-width">
                  <label>Education</label>
                  {isEditing ? (
                    <textarea
                      name="education"
                      value={formData.education}
                      onChange={handleInputChange}
                      rows="2"
                    />
                  ) : (
                    <span className="form-value">{profile.education}</span>
                  )}
                </div>

                <div className="form-group full-width">
                  <label>Specialization</label>
                  {isEditing ? (
                    <textarea
                      name="specialization"
                      value={formData.specialization}
                      onChange={handleInputChange}
                      rows="2"
                    />
                  ) : (
                    <span className="form-value">{profile.specialization}</span>
                  )}
                </div>

                <div className="form-group full-width">
                  <label>Research Interests</label>
                  {isEditing ? (
                    <textarea
                      name="researchInterests"
                      value={formData.researchInterests}
                      onChange={handleInputChange}
                      rows="3"
                    />
                  ) : (
                    <span className="form-value">{profile.researchInterests}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="profile-section">
              <h3>Current Courses</h3>
              <div className="courses-list">
                {profile.courses.map(course => (
                  <span key={course} className="course-badge">{course}</span>
                ))}
              </div>
            </div>

            <div className="profile-section">
              <h3>Quick Stats</h3>
              <div className="stats-grid">
                <div className="stat-item">
                  <span className="stat-label">Active Courses</span>
                  <span className="stat-value">{profile.courses.length}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Years Teaching</span>
                  <span className="stat-value">{profile.yearsExperience}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Publications</span>
                  <span className="stat-value">{profile.publications}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Department</span>
                  <span className="stat-value">{profile.department}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;