import { Link } from "react-router-dom";
import "../../styles/social.css";

const LinkedIn = () => {
  const posts = [
    {
      id: 1,
      time: "3 hours ago",
      content: "🎓 The future of education is digital, and we're proud to be part of that transformation. EduManage continues to innovate in the EdTech space, providing seamless solutions for educational institutions worldwide. What trends are you seeing in digital education?",
      likes: 234,
      comments: 45,
      shares: 28,
      author: "EduManage Team"
    },
    {
      id: 2,
      time: "1 day ago",
      content: "📊 New Research: Our platform has helped increase student engagement by 40% and reduced administrative workload for teachers by 35%. These results showcase the power of well-designed educational technology. #EdTech #EducationInnovation #StudentSuccess",
      likes: 189,
      comments: 32,
      shares: 41,
      author: "EduManage Research Team"
    },
    {
      id: 3,
      time: "3 days ago",
      content: "🏆 We're hiring! Join our mission to revolutionize education technology. We're looking for passionate developers, UX designers, and education specialists. Check out our careers page for open positions. #Hiring #EdTech #CareerOpportunity",
      likes: 156,
      comments: 67,
      shares: 23,
      author: "EduManage HR"
    },
    {
      id: 4,
      time: "1 week ago",
      content: "🤝 Partnership Announcement: We're excited to partner with leading educational institutions to bring cutting-edge learning management solutions to more students and educators. Together, we're building the future of education.",
      likes: 298,
      comments: 78,
      shares: 52,
      author: "EduManage Leadership"
    }
  ];

  const companyInfo = {
    employees: "201-500",
    industry: "Education Technology",
    founded: "2020",
    headquarters: "Learning City, LC",
    specialties: ["Educational Software", "Learning Management", "Student Analytics", "Teacher Tools"]
  };

  const handleConnect = () => {
    alert("Connection request sent to EduManage! 🤝");
  };

  const handleFollow = () => {
    alert("You're now following EduManage! 👍");
  };

  const handleLike = (postId) => {
    alert(`You liked post ${postId}! 👍`);
  };

  const handleComment = (postId) => {
    const comment = prompt("Write your professional comment:");
    if (comment) {
      alert(`Professional comment added to post ${postId}: "${comment}"`);
    }
  };

  const handleShare = (postId) => {
    alert(`Post ${postId} shared to your network! 📤`);
  };

  return (
    <div className="social-page linkedin-page">
      <div className="social-header">
        <h1>💼 EduManage on LinkedIn</h1>
        <p>Professional network for education technology</p>
        <Link to="/" className="back-btn">← Back to Home</Link>
      </div>

      <div className="social-container">
        <div className="linkedin-layout">
          <div className="linkedin-sidebar">
            <div className="company-profile">
              <div className="company-banner">
                <div className="company-logo">in</div>
              </div>
              <div className="company-info">
                <h2>EduManage</h2>
                <p>Education Technology Company</p>
                <div className="company-stats">
                  <div className="stat">
                    <strong>15,247</strong>
                    <span>followers</span>
                  </div>
                  <div className="stat">
                    <strong>342</strong>
                    <span>employees</span>
                  </div>
                </div>
                <div className="company-actions">
                  <button className="btn-primary" onClick={handleFollow}>
                    Follow
                  </button>
                  <button className="btn-outline" onClick={handleConnect}>
                    Message
                  </button>
                </div>
              </div>
            </div>

            <div className="company-details">
              <h4>📋 Company Details</h4>
              <div className="detail-item">
                <span className="label">Industry:</span>
                <span className="value">{companyInfo.industry}</span>
              </div>
              <div className="detail-item">
                <span className="label">Company size:</span>
                <span className="value">{companyInfo.employees} employees</span>
              </div>
              <div className="detail-item">
                <span className="label">Founded:</span>
                <span className="value">{companyInfo.founded}</span>
              </div>
              <div className="detail-item">
                <span className="label">Headquarters:</span>
                <span className="value">{companyInfo.headquarters}</span>
              </div>
              
              <div className="specialties">
                <h5>🎯 Specialties</h5>
                <div className="specialty-tags">
                  {companyInfo.specialties.map((specialty, index) => (
                    <span key={index} className="specialty-tag">
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="linkedin-main">
            <div className="company-about">
              <h3>🏢 About EduManage</h3>
              <p>
                EduManage is a leading education technology company dedicated to transforming 
                the learning experience for students and educators worldwide. Our comprehensive 
                platform provides innovative solutions for course management, student engagement, 
                and educational analytics.
              </p>
              <p>
                Founded in 2020, we've grown to serve thousands of educational institutions, 
                helping them streamline their operations and enhance learning outcomes. Our 
                mission is to make quality education accessible and manageable for everyone.
              </p>
            </div>

            <div className="posts-feed">
              <h3>📰 Recent Updates</h3>
              {posts.map(post => (
                <div key={post.id} className="linkedin-post">
                  <div className="post-header">
                    <div className="post-author">
                      <div className="author-avatar">in</div>
                      <div className="author-info">
                        <h4>EduManage</h4>
                        <p>{post.author}</p>
                        <span className="post-time">{post.time}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="post-content">
                    <p>{post.content}</p>
                  </div>

                  <div className="post-stats">
                    <span>👍 {post.likes} reactions</span>
                    <span>💬 {post.comments} comments</span>
                    <span>📤 {post.shares} shares</span>
                  </div>

                  <div className="post-interactions">
                    <button 
                      className="interaction-btn"
                      onClick={() => handleLike(post.id)}
                    >
                      👍 Like
                    </button>
                    <button 
                      className="interaction-btn"
                      onClick={() => handleComment(post.id)}
                    >
                      💬 Comment
                    </button>
                    <button 
                      className="interaction-btn"
                      onClick={() => handleShare(post.id)}
                    >
                      📤 Share
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="careers-section">
              <h3>💼 Career Opportunities</h3>
              <div className="job-listings">
                <div className="job-item">
                  <h4>Senior Frontend Developer</h4>
                  <p>React, TypeScript, Educational Technology</p>
                  <span className="job-location">📍 Remote / Learning City, LC</span>
                </div>
                <div className="job-item">
                  <h4>UX Designer - Education</h4>
                  <p>User Experience, Educational Design, Accessibility</p>
                  <span className="job-location">📍 Learning City, LC</span>
                </div>
                <div className="job-item">
                  <h4>Education Technology Specialist</h4>
                  <p>EdTech, Curriculum Design, Teacher Training</p>
                  <span className="job-location">📍 Remote</span>
                </div>
              </div>
              <button className="btn-primary">🔍 View All Jobs</button>
            </div>
          </div>
        </div>

        <div className="social-links-section">
          <h3>🔗 Connect with us on other platforms</h3>
          <div className="other-platforms">
            <Link to="/social/facebook" className="platform-link">
              <span className="platform-icon">f</span>
              <span>Follow us on Facebook</span>
            </Link>
            <Link to="/social/twitter" className="platform-link">
              <span className="platform-icon">𝕏</span>
              <span>Follow us on Twitter</span>
            </Link>
            <Link to="/social/instagram" className="platform-link">
              <span className="platform-icon">📷</span>
              <span>Follow on Instagram</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkedIn;