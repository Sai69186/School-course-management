import { Link } from "react-router-dom";
import "../styles/support.css";

const TermsConditions = () => {
  const lastUpdated = "February 3, 2026";

  const sections = [
    {
      id: "acceptance",
      title: "Acceptance of Terms",
      icon: "✅",
      content: [
        "By accessing and using EduManage, you accept and agree to be bound by these Terms and Conditions",
        "If you do not agree to abide by these terms, you are not authorized to use or access the platform",
        "These terms apply to all users, including students, teachers, administrators, and visitors",
        "Your continued use of the platform constitutes acceptance of any updates to these terms"
      ]
    },
    {
      id: "user-accounts",
      title: "User Accounts and Registration",
      icon: "👤",
      content: [
        "You must provide accurate and complete information when creating an account",
        "You are responsible for maintaining the confidentiality of your login credentials",
        "You must notify us immediately of any unauthorized use of your account",
        "One person may not maintain multiple accounts without authorization",
        "We reserve the right to suspend or terminate accounts that violate these terms"
      ]
    },
    {
      id: "acceptable-use",
      title: "Acceptable Use Policy",
      icon: "📋",
      content: [
        "Use the platform only for legitimate educational purposes",
        "Do not upload, share, or distribute inappropriate, offensive, or illegal content",
        "Respect intellectual property rights of others",
        "Do not attempt to hack, disrupt, or compromise platform security",
        "Do not impersonate other users or provide false information",
        "Maintain professional and respectful communication with other users"
      ]
    },
    {
      id: "academic-integrity",
      title: "Academic Integrity",
      icon: "🎓",
      content: [
        "Students must complete their own work and not engage in plagiarism",
        "Collaboration is allowed only when explicitly permitted by instructors",
        "Cheating, fraud, or academic dishonesty may result in account suspension",
        "Teachers must provide fair and unbiased assessment of student work",
        "All users must respect the academic policies of their institution"
      ]
    },
    {
      id: "content-ownership",
      title: "Content and Intellectual Property",
      icon: "©️",
      content: [
        "Users retain ownership of original content they create and upload",
        "By uploading content, you grant us a license to store, display, and distribute it as necessary",
        "Course materials provided by instructors remain their intellectual property",
        "Users may not reproduce, distribute, or modify copyrighted materials without permission",
        "We respect intellectual property rights and will respond to valid DMCA notices"
      ]
    },
    {
      id: "privacy-data",
      title: "Privacy and Data Protection",
      icon: "🔒",
      content: [
        "Your privacy is governed by our Privacy Policy, which is incorporated into these terms",
        "We collect and use data only as described in our Privacy Policy",
        "You consent to the collection and use of your information as outlined",
        "We implement appropriate security measures to protect your data",
        "You have certain rights regarding your personal data as described in our Privacy Policy"
      ]
    },
    {
      id: "platform-availability",
      title: "Platform Availability and Maintenance",
      icon: "🔧",
      content: [
        "We strive to maintain platform availability but cannot guarantee 100% uptime",
        "Scheduled maintenance may temporarily interrupt service",
        "We are not liable for damages resulting from temporary service interruptions",
        "Users should maintain local copies of important work",
        "We will provide reasonable notice of planned maintenance when possible"
      ]
    },
    {
      id: "user-conduct",
      title: "User Conduct and Responsibilities",
      icon: "⚖️",
      content: [
        "Users must comply with all applicable laws and regulations",
        "Harassment, bullying, or discriminatory behavior is strictly prohibited",
        "Users must respect the rights and dignity of all community members",
        "Report any violations of these terms to platform administrators",
        "Failure to comply may result in warnings, suspension, or account termination"
      ]
    },
    {
      id: "disclaimers",
      title: "Disclaimers and Limitations",
      icon: "⚠️",
      content: [
        "The platform is provided 'as is' without warranties of any kind",
        "We do not guarantee the accuracy or completeness of content provided by users",
        "We are not responsible for the quality of education or instruction provided",
        "Users assume all risks associated with their use of the platform",
        "Our liability is limited to the maximum extent permitted by law"
      ]
    },
    {
      id: "termination",
      title: "Account Termination",
      icon: "🚫",
      content: [
        "We may terminate or suspend accounts for violations of these terms",
        "Users may close their accounts at any time by contacting support",
        "Upon termination, access to the platform and associated data may be revoked",
        "Some data may be retained for legal or administrative purposes",
        "Termination does not relieve users of obligations incurred before termination"
      ]
    },
    {
      id: "modifications",
      title: "Modifications to Terms",
      icon: "🔄",
      content: [
        "We reserve the right to modify these terms at any time",
        "Users will be notified of significant changes through the platform or email",
        "Continued use after changes constitutes acceptance of new terms",
        "If you disagree with changes, you should discontinue use of the platform",
        "The most current version of terms will always be available on our website"
      ]
    },
    {
      id: "governing-law",
      title: "Governing Law and Disputes",
      icon: "🏛️",
      content: [
        "These terms are governed by the laws of the jurisdiction where we operate",
        "Disputes will be resolved through binding arbitration when possible",
        "Users agree to resolve disputes individually, not as part of a class action",
        "Some jurisdictions may not allow certain limitations, which may not apply to you",
        "If any provision is found invalid, the remaining terms remain in effect"
      ]
    }
  ];

  return (
    <div className="support-page">
      <div className="support-header">
        <h1>📋 Terms & Conditions</h1>
        <p>Please read these terms carefully before using our educational platform.</p>
        <Link to="/" className="back-btn">← Back to Home</Link>
      </div>

      <div className="support-container">
        <div className="policy-info">
          <div className="policy-meta">
            <p><strong>Last Updated:</strong> {lastUpdated}</p>
            <p><strong>Effective Date:</strong> {lastUpdated}</p>
          </div>

          <div className="policy-intro">
            <h2>Introduction</h2>
            <p>
              Welcome to EduManage. These Terms and Conditions ("Terms") govern your use of our 
              educational management platform and services. By accessing or using EduManage, you 
              agree to be bound by these Terms. These Terms apply to all users of the platform, 
              including students, teachers, administrators, and visitors.
            </p>
            <div className="important-notice">
              <h3>⚠️ Important Notice</h3>
              <p>
                Please read these Terms carefully before using our platform. Your use of EduManage 
                constitutes your agreement to these Terms. If you do not agree with any part of 
                these Terms, you must not use our platform.
              </p>
            </div>
          </div>

          <div className="table-of-contents">
            <h2>📋 Table of Contents</h2>
            <ul>
              {sections.map(section => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>
                    {section.icon} {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="policy-sections">
            {sections.map(section => (
              <div key={section.id} id={section.id} className="policy-section">
                <h2>{section.icon} {section.title}</h2>
                <ul>
                  {section.content.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="emergency-contact">
            <h2>🚨 Emergency Procedures</h2>
            <p>
              In case of security breaches, inappropriate content, or urgent platform issues:
            </p>
            <div className="emergency-info">
              <p><strong>Emergency Email:</strong> emergency@edumanage.com</p>
              <p><strong>24/7 Hotline:</strong> (555) 911-HELP</p>
              <p><strong>Report Abuse:</strong> abuse@edumanage.com</p>
            </div>
          </div>

          <div className="policy-contact">
            <h2>📞 Contact Information</h2>
            <p>
              If you have questions about these Terms and Conditions, please contact us:
            </p>
            <div className="contact-details">
              <p><strong>Legal Department:</strong> legal@edumanage.com</p>
              <p><strong>General Support:</strong> support@edumanage.com</p>
              <p><strong>Phone:</strong> (555) 123-4567</p>
              <p><strong>Address:</strong> 123 Education St, Learning City, LC 12345</p>
            </div>
          </div>

          <div className="acknowledgment">
            <h2>✍️ Acknowledgment</h2>
            <p>
              By using EduManage, you acknowledge that you have read, understood, and agree to be 
              bound by these Terms and Conditions. You also acknowledge that these Terms constitute 
              a legally binding agreement between you and EduManage.
            </p>
          </div>

          <div className="policy-actions">
            <Link to="/contact" className="btn-primary">
              📧 Contact Legal Team
            </Link>
            <Link to="/privacy" className="btn-outline">
              🔒 View Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;