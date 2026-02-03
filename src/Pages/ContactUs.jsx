import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/support.css";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "general",
    message: "",
    priority: "normal"
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    alert(`Thank you, ${formData.name}! Your message has been sent. We'll get back to you within 24 hours.`);
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      category: "general",
      message: "",
      priority: "normal"
    });
    
    setIsSubmitting(false);
  };

  const contactMethods = [
    {
      icon: "📧",
      title: "Email Support",
      description: "Send us an email and we'll respond within 24 hours",
      contact: "support@edumanage.com",
      availability: "24/7"
    },
    {
      icon: "📞",
      title: "Phone Support",
      description: "Speak directly with our support team",
      contact: "(555) 123-4567",
      availability: "Mon-Fri, 9AM-6PM EST"
    },
    {
      icon: "💬",
      title: "Live Chat",
      description: "Get instant help through our live chat",
      contact: "Available on website",
      availability: "Mon-Fri, 8AM-8PM EST"
    },
    {
      icon: "📍",
      title: "Office Address",
      description: "Visit us at our main office",
      contact: "123 Education St, Learning City, LC 12345",
      availability: "Mon-Fri, 9AM-5PM EST"
    }
  ];

  const departments = [
    { value: "general", label: "General Inquiry", icon: "❓" },
    { value: "technical", label: "Technical Support", icon: "🔧" },
    { value: "academic", label: "Academic Support", icon: "📚" },
    { value: "billing", label: "Billing & Payments", icon: "💳" },
    { value: "feedback", label: "Feedback & Suggestions", icon: "💡" }
  ];

  return (
    <div className="support-page">
      <div className="support-header">
        <h1>📞 Contact Us</h1>
        <p>Get in touch with our support team - we're here to help!</p>
        <Link to="/" className="back-btn">← Back to Home</Link>
      </div>

      <div className="support-container">
        {/* Contact Methods */}
        <div className="contact-methods-section">
          <h2>How to Reach Us</h2>
          <div className="contact-methods-grid">
            {contactMethods.map((method, index) => (
              <div key={index} className="contact-method-card">
                <div className="method-icon">{method.icon}</div>
                <h3>{method.title}</h3>
                <p className="method-description">{method.description}</p>
                <div className="method-contact">{method.contact}</div>
                <div className="method-availability">{method.availability}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className="contact-form-section">
          <h2>Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your full name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="category">Department</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                >
                  {departments.map(dept => (
                    <option key={dept.value} value={dept.value}>
                      {dept.icon} {dept.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="priority">Priority</label>
                <select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                >
                  <option value="low">🟢 Low</option>
                  <option value="normal">🟡 Normal</option>
                  <option value="high">🟠 High</option>
                  <option value="urgent">🔴 Urgent</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject *</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
                placeholder="Brief description of your inquiry"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows="6"
                placeholder="Please provide detailed information about your inquiry..."
              />
            </div>

            <div className="form-actions">
              <button 
                type="submit" 
                className="btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "📤 Send Message"}
              </button>
              <button 
                type="button" 
                className="btn-secondary"
                onClick={() => setFormData({
                  name: "", email: "", subject: "", category: "general", 
                  message: "", priority: "normal"
                })}
              >
                🔄 Clear Form
              </button>
            </div>
          </form>
        </div>

        {/* FAQ Link */}
        <div className="faq-link-section">
          <div className="faq-link-card">
            <h3>🤔 Looking for Quick Answers?</h3>
            <p>Check out our Help Center for frequently asked questions and instant solutions.</p>
            <Link to="/help" className="btn-outline">
              📚 Visit Help Center
            </Link>
          </div>
        </div>

        {/* Response Time Info */}
        <div className="response-info-section">
          <h2>📅 Response Times</h2>
          <div className="response-times">
            <div className="response-item">
              <span className="priority-indicator low">🟢</span>
              <span className="priority-label">Low Priority:</span>
              <span className="response-time">2-3 business days</span>
            </div>
            <div className="response-item">
              <span className="priority-indicator normal">🟡</span>
              <span className="priority-label">Normal Priority:</span>
              <span className="response-time">1-2 business days</span>
            </div>
            <div className="response-item">
              <span className="priority-indicator high">🟠</span>
              <span className="priority-label">High Priority:</span>
              <span className="response-time">4-8 hours</span>
            </div>
            <div className="response-item">
              <span className="priority-indicator urgent">🔴</span>
              <span className="priority-label">Urgent:</span>
              <span className="response-time">1-2 hours</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;