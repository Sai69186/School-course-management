import { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/social.css";

const Instagram = () => {
  const [selectedPost, setSelectedPost] = useState(null);

  const posts = [
    {
      id: 1,
      image: "📚",
      caption: "New semester vibes! 🎓 Ready to make this the best academic year yet? EduManage is here to support your journey! #NewSemester #StudentLife #Education #EduManage",
      likes: 1247,
      comments: 89,
      time: "2 hours ago",
      hashtags: ["#NewSemester", "#StudentLife", "#Education", "#EduManage"]
    },
    {
      id: 2,
      image: "💻",
      caption: "Behind the scenes: Our development team working on amazing new features! 👨‍💻👩‍💻 Can't wait to share what we're building! #BehindTheScenes #TechTeam #Innovation",
      likes: 892,
      comments: 56,
      time: "1 day ago",
      hashtags: ["#BehindTheScenes", "#TechTeam", "#Innovation"]
    },
    {
      id: 3,
      image: "🎉",
      caption: "Celebrating our amazing students! 🏆 Your dedication and hard work inspire us every day. Keep reaching for the stars! ⭐ #StudentSuccess #Inspiration #Achievement",
      likes: 1534,
      comments: 123,
      time: "2 days ago",
      hashtags: ["#StudentSuccess", "#Inspiration", "#Achievement"]
    },
    {
      id: 4,
      image: "📱",
      caption: "Mobile learning made easy! 📲 Access your courses, submit assignments, and stay connected anywhere, anytime. #MobileLearning #EdTech #Accessibility",
      likes: 756,
      comments: 67,
      time: "3 days ago",
      hashtags: ["#MobileLearning", "#EdTech", "#Accessibility"]
    },
    {
      id: 5,
      image: "🌟",
      caption: "Teacher appreciation post! 👨‍🏫👩‍🏫 Thank you to all the amazing educators using EduManage to create better learning experiences! #TeacherAppreciation #Education",
      likes: 2103,
      comments: 178,
      time: "4 days ago",
      hashtags: ["#TeacherAppreciation", "#Education"]
    },
    {
      id: 6,
      image: "🔒",
      caption: "Your privacy matters! 🛡️ We've updated our security features to keep your data even safer. Learn more about our privacy commitment. #Privacy #Security #DataProtection",
      likes: 634,
      comments: 45,
      time: "1 week ago",
      hashtags: ["#Privacy", "#Security", "#DataProtection"]
    }
  ];

  const stories = [
    { id: 1, title: "New Features", icon: "✨", active: true },
    { id: 2, title: "Student Tips", icon: "💡", active: false },
    { id: 3, title: "Behind Scenes", icon: "🎬", active: false },
    { id: 4, title: "Team Updates", icon: "👥", active: false }
  ];

  const handleLike = (postId) => {
    alert(`You liked post ${postId}! ❤️`);
  };

  const handleComment = (postId) => {
    const comment = prompt("Write your comment:");
    if (comment) {
      alert(`Comment added to post ${postId}: "${comment}"`);
    }
  };

  const handleShare = (postId) => {
    alert(`Post ${postId} shared to your story! 📤`);
  };

  const openPost = (post) => {
    setSelectedPost(post);
  };

  const closePost = () => {
    setSelectedPost(null);
  };

  return (
    <div className="social-page instagram-page">
      <div className="social-header">
        <h1>📷 EduManage on Instagram</h1>
        <p>Visual stories from the world of education technology</p>
        <Link to="/" className="back-btn">← Back to Home</Link>
      </div>

      <div className="social-container">
        <div className="instagram-layout">
          <div className="instagram-header">
            <div className="profile-section">
              <div className="profile-avatar-large">📷</div>
              <div className="profile-info">
                <div className="profile-name">
                  <h2>edumanage_official</h2>
                  <button className="btn-primary follow-btn">Follow</button>
                </div>
                <div className="profile-stats">
                  <div className="stat">
                    <strong>247</strong>
                    <span>posts</span>
                  </div>
                  <div className="stat">
                    <strong>18.5K</strong>
                    <span>followers</span>
                  </div>
                  <div className="stat">
                    <strong>892</strong>
                    <span>following</span>
                  </div>
                </div>
                <div className="profile-bio">
                  <h3>🎓 EduManage</h3>
                  <p>Transforming education through technology ✨</p>
                  <p>📚 Helping students & teachers succeed</p>
                  <p>🌍 Serving educational institutions worldwide</p>
                  <p>🔗 <a href="/contact">Get in touch</a></p>
                </div>
              </div>
            </div>
          </div>

          <div className="stories-section">
            <h3>📖 Stories</h3>
            <div className="stories-container">
              {stories.map(story => (
                <div key={story.id} className={`story-item ${story.active ? 'active' : ''}`}>
                  <div className="story-avatar">
                    <span className="story-icon">{story.icon}</span>
                  </div>
                  <span className="story-title">{story.title}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="posts-grid">
            <h3>📸 Posts</h3>
            <div className="grid-container">
              {posts.map(post => (
                <div 
                  key={post.id} 
                  className="grid-post"
                  onClick={() => openPost(post)}
                >
                  <div className="post-image">
                    <span className="image-placeholder">{post.image}</span>
                    <div className="post-overlay">
                      <div className="post-stats-overlay">
                        <span>❤️ {post.likes}</span>
                        <span>💬 {post.comments}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="instagram-feed">
            <h3>📱 Recent Posts</h3>
            {posts.slice(0, 3).map(post => (
              <div key={post.id} className="instagram-post">
                <div className="post-header">
                  <div className="post-author">
                    <div className="author-avatar">📷</div>
                    <div className="author-info">
                      <h4>edumanage_official</h4>
                      <span className="post-location">🌍 Worldwide</span>
                    </div>
                  </div>
                  <button className="post-menu">⋯</button>
                </div>
                
                <div className="post-image-container">
                  <div className="post-image-large">
                    <span className="image-placeholder-large">{post.image}</span>
                  </div>
                </div>

                <div className="post-interactions">
                  <div className="interaction-buttons">
                    <button 
                      className="interaction-btn"
                      onClick={() => handleLike(post.id)}
                    >
                      ❤️
                    </button>
                    <button 
                      className="interaction-btn"
                      onClick={() => handleComment(post.id)}
                    >
                      💬
                    </button>
                    <button 
                      className="interaction-btn"
                      onClick={() => handleShare(post.id)}
                    >
                      📤
                    </button>
                  </div>
                  <button className="bookmark-btn">🔖</button>
                </div>

                <div className="post-stats">
                  <p><strong>{post.likes.toLocaleString()} likes</strong></p>
                </div>

                <div className="post-caption">
                  <p>
                    <strong>edumanage_official</strong> {post.caption}
                  </p>
                </div>

                <div className="post-comments">
                  <p className="view-comments">View all {post.comments} comments</p>
                  <p className="post-time">{post.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedPost && (
          <div className="post-modal" onClick={closePost}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="close-btn" onClick={closePost}>×</button>
              <div className="modal-post">
                <div className="modal-image">
                  <span className="image-placeholder-modal">{selectedPost.image}</span>
                </div>
                <div className="modal-details">
                  <div className="modal-header">
                    <div className="author-info">
                      <div className="author-avatar">📷</div>
                      <h4>edumanage_official</h4>
                    </div>
                  </div>
                  <div className="modal-caption">
                    <p>{selectedPost.caption}</p>
                    <div className="hashtags">
                      {selectedPost.hashtags.map((tag, index) => (
                        <span key={index} className="hashtag">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="modal-stats">
                    <p><strong>{selectedPost.likes.toLocaleString()} likes</strong></p>
                    <p>{selectedPost.comments} comments</p>
                    <p>{selectedPost.time}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

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
            <Link to="/social/linkedin" className="platform-link">
              <span className="platform-icon">in</span>
              <span>Connect on LinkedIn</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Instagram;