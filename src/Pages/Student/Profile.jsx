import { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/student.css";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@student.edu",
    phone: "+1 (555) 123-4567",
    studentId: "STU2024001",
    dateOfBirth: "2000-05-15",
    address: "123 University Ave, College Town, ST 12345",
    major: "Computer Science",
    year: "Junior",
    gpa: "3.75",
    emergencyContact: {
      name: "Jane Doe",
      relationship: "Mother",
      phone: "+1 (555) 987-6543"
    }
  });

  const [formData, setFormData] = useState(profile);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
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
    <div className="student-dashboard">
      <div className="page-header">
        <h1>Student Profile</h1>
        <p className="welcome">Manage your personal information and academic details</p>
        <Link to="/student/home" className="back-btn">← Back to Dashboard</Link>
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
              <p className="student-id">Student ID: {profile.studentId}</p>
              <p className="major">{profile.major} - {profile.year}</p>
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
                  <label>Date of Birth</label>
                  {isEditing ? (
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <span className="form-value">{profile.dateOfBirth}</span>
                  )}
                </div>

                <div className="form-group full-width">
                  <label>Address</label>
                  {isEditing ? (
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows="2"
                    />
                  ) : (
                    <span className="form-value">{profile.address}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="profile-section">
              <h3>Academic Information</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Major</label>
                  {isEditing ? (
                    <select
                      name="major"
                      value={formData.major}
                      onChange={handleInputChange}
                    >
                      <option value="Computer Science">Computer Science</option>
                      <option value="Mathematics">Mathematics</option>
                      <option value="Physics">Physics</option>
                      <option value="English Literature">English Literature</option>
                      <option value="Business Administration">Business Administration</option>
                    </select>
                  ) : (
                    <span className="form-value">{profile.major}</span>
                  )}
                </div>

                <div className="form-group">
                  <label>Academic Year</label>
                  {isEditing ? (
                    <select
                      name="year"
                      value={formData.year}
                      onChange={handleInputChange}
                    >
                      <option value="Freshman">Freshman</option>
                      <option value="Sophomore">Sophomore</option>
                      <option value="Junior">Junior</option>
                      <option value="Senior">Senior</option>
                    </select>
                  ) : (
                    <span className="form-value">{profile.year}</span>
                  )}
                </div>

                <div className="form-group">
                  <label>Current GPA</label>
                  <span className="form-value gpa">{profile.gpa}</span>
                </div>
              </div>
            </div>

            <div className="profile-section">
              <h3>Emergency Contact</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Contact Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="emergencyContact.name"
                      value={formData.emergencyContact.name}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <span className="form-value">{profile.emergencyContact.name}</span>
                  )}
                </div>

                <div className="form-group">
                  <label>Relationship</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="emergencyContact.relationship"
                      value={formData.emergencyContact.relationship}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <span className="form-value">{profile.emergencyContact.relationship}</span>
                  )}
                </div>

                <div className="form-group">
                  <label>Phone Number</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="emergencyContact.phone"
                      value={formData.emergencyContact.phone}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <span className="form-value">{profile.emergencyContact.phone}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;