import { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/social.css";

const Twitter = () => {
  const [newTweet, setNewTweet] = useState("");

  const tweets = [
    {
      id: 1,
      time: "2h",
      content: "🎓 New semester, new possibilities! EduManage is here to support your academic journey. What are your goals this semester? #Education #StudentLife #EduManage",
      retweets: 45,
      likes: 128,
      replies: 23
    },
    {
      id: 2,
      time: "6h",
      content: "📝 Pro tip: Use our drag-and-drop file upload feature for assignments. Any file type, no size limits! Making education more accessible. #EdTech #StudentTips",
      retweets: 32,
      likes: 89,
      replies: 15
    },
    {
      id: 3,
      time: "1d",
      content: "👨‍🏫 Teachers: Our new grading system saves you time and helps provide better feedback. Check it out! #TeacherTools #Education #Productivity",
      retweets: 28,
      likes: 76,
      replies: 12
    },
    {
      id: 4,
      time: "2d",
      content: "🏆 Celebrating all the students who submitted their assignments this week! Your dedication inspires us. Keep learning, keep growing! #StudentSuccess",
      retweets: 67,
      likes: 203,
      replies: 41
    },
    {
      id: 5,
      time: "3d",
      content: "🔒 Your privacy matters to us. We've updated our privacy policy to be even more transparent about how we protect your data. Read more: edumanage.com/privacy",
      retweets: 19,
      likes: 54,
      replies: 8
    }
  ];

  const handleTweet = () => {
    if (newTweet.trim()) {
      alert(`Tweet posted: "${newTweet}"`);
      setNewTweet("");
    }
  };

  const handleRetweet = (tweetId) => {
    alert(`Retweeted tweet ${tweetId}! 🔄`);
  };

  const handleLike = (tweetId) => {
    alert(`Liked tweet ${tweetId}! ❤️`);
  };

  const handleReply = (tweetId) => {
    const reply = prompt("Write your reply:");
    if (reply) {
      alert(`Reply added to tweet ${tweetId}: "${reply}"`);
    }
  };

  return (
    <div className="social-page twitter-page">
      <div className="social-header">
        <h1>🐦 EduManage on Twitter</h1>
        <p>Follow us for the latest updates and educational insights</p>
        <Link to="/" className="back-btn">← Back to Home</Link>
      </div>

      <div className="social-container">
        <div className="twitter-layout">
          <div className="twitter-sidebar">
            <div className="profile-card">
              <div className="profile-banner-small">
                <div className="profile-avatar-small">𝕏</div>
              </div>
              <h3>EduManage</h3>
              <p>@EduManageApp</p>
              <div className="profile-stats-small">
                <div className="stat">
                  <strong>1,247</strong>
                  <span>Following</span>
                </div>
                <div className="stat">
                  <strong>8,932</strong>
                  <span>Followers</span>
                </div>
              </div>
              <button className="btn-primary follow-btn">Follow</button>
            </div>

            <div className="trending-section">
              <h4>📈 Trending in Education</h4>
              <div className="trending-topics">
                <div className="trending-item">
                  <span className="trend-rank">#1</span>
                  <span className="trend-topic">#OnlineLearning</span>
                </div>
                <div className="trending-item">
                  <span className="trend-rank">#2</span>
                  <span className="trend-topic">#EdTech</span>
                </div>
                <div className="trending-item">
                  <span className="trend-rank">#3</span>
                  <span className="trend-topic">#StudentLife</span>
                </div>
                <div className="trending-item">
                  <span className="trend-rank">#4</span>
                  <span className="trend-topic">#DigitalEducation</span>
                </div>
              </div>
            </div>
          </div>

          <div className="twitter-main">
            <div className="compose-tweet">
              <div className="compose-header">
                <h3>📝 What's happening?</h3>
              </div>
              <div className="compose-content">
                <div className="compose-avatar">𝕏</div>
                <textarea
                  value={newTweet}
                  onChange={(e) => setNewTweet(e.target.value)}
                  placeholder="What's happening?!"
                  maxLength={280}
                />
              </div>
              <div className="compose-footer">
                <div className="character-count">
                  {280 - newTweet.length} characters remaining
                </div>
                <button 
                  className="btn-primary tweet-btn"
                  onClick={handleTweet}
                  disabled={!newTweet.trim()}
                >
                  Post
                </button>
              </div>
            </div>

            <div className="tweets-feed">
              <h3>📰 Latest Tweets</h3>
              {tweets.map(tweet => (
                <div key={tweet.id} className="tweet-card">
                  <div className="tweet-header">
                    <div className="tweet-author">
                      <div className="author-avatar">𝕏</div>
                      <div className="author-info">
                        <span className="author-name">EduManage</span>
                        <span className="author-handle">@EduManageApp</span>
                        <span className="tweet-time">• {tweet.time}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="tweet-content">
                    <p>{tweet.content}</p>
                  </div>

                  <div className="tweet-interactions">
                    <button 
                      className="interaction-btn"
                      onClick={() => handleReply(tweet.id)}
                    >
                      💬 {tweet.replies}
                    </button>
                    <button 
                      className="interaction-btn"
                      onClick={() => handleRetweet(tweet.id)}
                    >
                      🔄 {tweet.retweets}
                    </button>
                    <button 
                      className="interaction-btn"
                      onClick={() => handleLike(tweet.id)}
                    >
                      ❤️ {tweet.likes}
                    </button>
                    <button className="interaction-btn">
                      📤 Share
                    </button>
                  </div>
                </div>
              ))}
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
  );
};

export default Twitter;