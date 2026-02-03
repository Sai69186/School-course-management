import { Link } from "react-router-dom";
import "../../styles/social.css";

const Facebook = () => {
  const posts = [
    {
      id: 1,
      date: "2 hours ago",
      content: "🎓 Welcome to the new semester! We're excited to help you achieve your academic goals with EduManage. Check out our latest features for better course management!",
      likes: 127,
      comments: 23,
      shares: 15,
      image: "📚"
    },
    {
      id: 2,
      date: "1 day ago",
      content: "📝 New Feature Alert! Students can now upload any file type for assignments with no size limits. Making your academic life easier, one update at a time!",
      likes: 89,
      comments: 12,
      shares: 8,
      image: "💻"
    },
    {
      id: 3,
      date: "3 days ago",
      content: "🏆 Congratulations to all students who completed their assignments this week! Your dedication to learning inspires us every day. Keep up the great work!",
      likes: 156,
      comments: 34,
      shares: 22,
      image: "🎉"
    },
    {
      id: 4,
      date: "1 week ago",
      content: "👨‍🏫 Teachers, have you tried our new grading system? It's faster, more intuitive, and helps you provide better feedback to your students. Learn more in our Help Center!",
      likes: 73,
      comments: 18,
      shares: 11,
      image: "⭐"
    }
  ];

  const handleLike = (postId) => {
    alert(`You liked post ${postId}! 👍`);
  };

  const handleComment = (postId) => {
    const comment = prompt("Write your comment:");
    if (comment) {
      alert(`Comment added to post ${postId}: "${comment}"`);
    }
  };

  const handleShare = (postId) => {
    alert(`Post ${postId} shared! 📤`);
  };

  return (
    <div className="social-page">
      <div className="social-header facebook-header">
        <div className="platform-logo facebook-logo">
          <span className="logo-icon">f</span>
          <span className="logo-text">facebook</span>
        </div>
        <h1>EduManage on Facebook</h1>
        <p>Stay connected with our educational community</p>
        <Link to="/" className="back-btn">← Back to Home</Link>
      </div>

      <div className="social-container">
        <div className="social-profile">
          <div className="profile-banner">
            <div className="profile-info">
              <div className="profile-avatar">f</div>
              <div className="profile-details">
                <h2>EduManage</h2>
                <p>Educational Technology • 12,547 followers</p>
                <div className="profile-stats">
                  <span>🏫 Education Platform</span>
                  <span>🌍 Serving Students Worldwide</span>
                  <span>📧 support@edumanage.com</span>
                </div>
              </div>
            </div>
            <div className="profile-actions">
              <button className="btn-primary">👍 Follow</button>
              <button className="btn-outline">📧 Message</button>
            </div>
          </div>
        </div>

        <div className="social-content">
          <div className="create-post">
            <h3>📝 What's on your mind?</h3>
            <textarea placeholder="Share something with the EduManage community..."></textarea>
            <div className="post-actions">
              <button className="btn-primary">📤 Post</button>
              <button className="btn-outline">📷 Add Photo</button>
            </div>
          </div>

          <div className="posts-feed">
            <h3>📰 Recent Posts</h3>
            {posts.map(post => (
              <div key={post.id} className="post-card">
                <div className="post-header">
                  <div className="post-author">
                    <div className="author-avatar">f</div>
                    <div className="author-info">
                      <h4>EduManage</h4>
                      <span className="post-date">{post.date}</span>
                    </div>
                  </div>
                </div>
                
                <div className="post-content">
                  <p>{post.content}</p>
                  {post.image && (
                    <div className="post-image">
                      <span className="image-placeholder">{post.image}</span>
                    </div>
                  )}
                </div>

                <div className="post-stats">
                  <span>👍 {post.likes} likes</span>
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

          <div className="social-links-section">
            <h3>🔗 Connect with us on other platforms</h3>
            <div className="other-platforms">
              <Link to="/social/twitter" className="platform-link">
                <span className="platform-icon">𝕏</span>
                <span>Follow us on Twitter</span>
              </Link>
              <Link to="/social/linkedin" className="platform-link">
                <span className="platform-icon">in</span>
                <span>Connect on LinkedIn</span>
              </Link>
              <Link to="/social/instagram" className="platform-link">
                <span className="platform-icon">📷</span>
                <span>Follow on Instagram</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Facebook;