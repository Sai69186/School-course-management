import { Link } from "react-router-dom";
import "../styles/support.css";

const PrivacyPolicy = () => {
  const lastUpdated = "February 3, 2026";

  const sections = [
    {
      id: "information-collection",
      title: "Information We Collect",
      icon: "📊",
      content: [
        "Personal Information: Name, email address, student/employee ID, and contact details",
        "Academic Information: Course enrollments, grades, assignments, and attendance records",
        "Usage Data: How you interact with our platform, including login times and feature usage",
        "Technical Data: IP address, browser type, device information, and cookies"
      ]
    },
    {
      id: "information-use",
      title: "How We Use Your Information",
      icon: "🎯",
      content: [
        "Provide and maintain our educational services",
        "Process course enrollments and manage academic records",
        "Facilitate communication between students and teachers",
        "Send important notifications about courses, assignments, and system updates",
        "Improve our platform based on usage analytics",
        "Ensure platform security and prevent unauthorized access"
      ]
    },
    {
      id: "information-sharing",
      title: "Information Sharing and Disclosure",
      icon: "🤝",
      content: [
        "We do not sell, trade, or rent your personal information to third parties",
        "Academic information may be shared with authorized educational personnel",
        "We may share information when required by law or to protect our rights",
        "Anonymous, aggregated data may be used for research and improvement purposes",
        "Third-party service providers may access data solely to provide services to us"
      ]
    },
    {
      id: "data-security",
      title: "Data Security",
      icon: "🔒",
      content: [
        "We implement industry-standard security measures to protect your data",
        "All data transmission is encrypted using SSL/TLS protocols",
        "Access to personal information is restricted to authorized personnel only",
        "Regular security audits and updates are performed",
        "We maintain backup systems to prevent data loss"
      ]
    },
    {
      id: "cookies",
      title: "Cookies and Tracking",
      icon: "🍪",
      content: [
        "We use cookies to enhance your experience and maintain login sessions",
        "Essential cookies are necessary for platform functionality",
        "Analytics cookies help us understand how you use our platform",
        "You can control cookie preferences through your browser settings",
        "Disabling certain cookies may limit platform functionality"
      ]
    },
    {
      id: "data-retention",
      title: "Data Retention",
      icon: "📅",
      content: [
        "Academic records are retained according to institutional policies",
        "Personal information is kept only as long as necessary for educational purposes",
        "Inactive accounts may be archived or deleted after extended periods",
        "You may request deletion of your personal data subject to legal requirements",
        "Some information may be retained for legal compliance purposes"
      ]
    },
    {
      id: "user-rights",
      title: "Your Rights",
      icon: "⚖️",
      content: [
        "Access: Request a copy of your personal information",
        "Correction: Update or correct inaccurate information",
        "Deletion: Request deletion of your personal data (subject to limitations)",
        "Portability: Request transfer of your data in a structured format",
        "Objection: Object to certain types of data processing",
        "Withdrawal: Withdraw consent for data processing where applicable"
      ]
    },
    {
      id: "third-party",
      title: "Third-Party Services",
      icon: "🔗",
      content: [
        "Our platform may integrate with third-party educational tools",
        "Third-party services have their own privacy policies",
        "We are not responsible for third-party privacy practices",
        "Review third-party privacy policies before using their services",
        "We select partners who maintain appropriate privacy standards"
      ]
    },
    {
      id: "minors",
      title: "Protection of Minors",
      icon: "👶",
      content: [
        "We comply with applicable laws regarding the privacy of minors",
        "Parental consent may be required for users under 13",
        "Special protections apply to educational records of minors",
        "Parents may have rights to access their child's educational information",
        "We do not knowingly collect unnecessary personal information from minors"
      ]
    },
    {
      id: "international",
      title: "International Data Transfers",
      icon: "🌍",
      content: [
        "Your data may be processed in countries other than your own",
        "We ensure appropriate safeguards for international transfers",
        "Data processing complies with applicable international privacy laws",
        "We maintain data protection standards regardless of processing location"
      ]
    }
  ];

  return (
    <div className="support-page">
      <div className="support-header">
        <h1>🔒 Privacy Policy</h1>
        <p>Your privacy is important to us. Learn how we collect, use, and protect your information.</p>
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
              Welcome to EduManage ("we," "our," or "us"). This Privacy Policy explains how we collect, 
              use, disclose, and safeguard your information when you use our educational management platform. 
              Please read this privacy policy carefully. If you do not agree with the terms of this privacy 
              policy, please do not access the platform.
            </p>
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

          <div className="policy-contact">
            <h2>📞 Contact Information</h2>
            <p>
              If you have questions or comments about this Privacy Policy, please contact us:
            </p>
            <div className="contact-details">
              <p><strong>Email:</strong> privacy@edumanage.com</p>
              <p><strong>Phone:</strong> (555) 123-4567</p>
              <p><strong>Address:</strong> 123 Education St, Learning City, LC 12345</p>
            </div>
          </div>

          <div className="policy-updates">
            <h2>🔄 Policy Updates</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes 
              by posting the new Privacy Policy on this page and updating the "Last Updated" date. 
              You are advised to review this Privacy Policy periodically for any changes.
            </p>
          </div>

          <div className="policy-actions">
            <Link to="/contact" className="btn-primary">
              📧 Contact Privacy Team
            </Link>
            <Link to="/help" className="btn-outline">
              📚 Visit Help Center
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;