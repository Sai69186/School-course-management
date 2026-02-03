import { Link } from "react-router-dom";
import "../styles/footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>🎓 EduManage</h3>
            <p>Empowering education through digital innovation and seamless course management for students and teachers.</p>
          </div>
          
          <div className="footer-section">
            <h4>🔗 Quick Links</h4>
            <ul>
              <li><a href="/">🏠 Home</a></li>
              <li><a href="/login/student">👨‍🎓 Student Login</a></li>
              <li><a href="/login/teacher">👨‍🏫 Teacher Login</a></li>
              <li><a href="/signup">📝 Sign Up</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>🆘 Support</h4>
            <ul>
              <li><Link to="/help">❓ Help Center</Link></li>
              <li><Link to="/contact">📧 Contact Us</Link></li>
              <li><Link to="/privacy">🔒 Privacy Policy</Link></li>
              <li><Link to="/terms">📋 Terms & Conditions</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>🌐 Connect With Us</h4>
            <div className="social-links">
              <Link to="/social/facebook" aria-label="Facebook" title="Follow us on Facebook">f</Link>
              <Link to="/social/twitter" aria-label="Twitter" title="Follow us on Twitter">𝕏</Link>
              <Link to="/social/linkedin" aria-label="LinkedIn" title="Connect on LinkedIn">in</Link>
              <Link to="/social/instagram" aria-label="Instagram" title="Follow us on Instagram">📷</Link>
            </div>
            <p style={{ marginTop: '15px', fontSize: '0.9rem' }}>
              Stay updated with the latest features and educational resources.
            </p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} EduManage - Student Management System. All rights reserved. | Built with ❤️ for Education</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;