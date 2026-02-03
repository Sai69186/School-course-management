import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/support.css";

const HelpCenter = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const faqCategories = [
    { id: "all", name: "All Categories", icon: "📚" },
    { id: "account", name: "Account & Login", icon: "👤" },
    { id: "courses", name: "Courses & Enrollment", icon: "📖" },
    { id: "assignments", name: "Assignments & Grading", icon: "📝" },
    { id: "technical", name: "Technical Issues", icon: "🔧" },
    { id: "billing", name: "Billing & Payments", icon: "💳" }
  ];

  const faqs = [
    {
      id: 1,
      category: "account",
      question: "How do I reset my password?",
      answer: "To reset your password, go to the login page and click 'Forgot Password'. Enter your email address and follow the instructions sent to your email. If you don't receive an email within 10 minutes, check your spam folder or contact support."
    },
    {
      id: 2,
      category: "account",
      question: "How do I update my profile information?",
      answer: "Navigate to your profile page by clicking on your name in the top navigation. Click 'Edit Profile' and update your information. Don't forget to save your changes before leaving the page."
    },
    {
      id: 3,
      category: "courses",
      question: "How do I enroll in a course?",
      answer: "Go to the 'Course Enrollment' page from your student dashboard. Browse available courses and click 'Enroll Now' on the course you want to join. Make sure you meet any prerequisites before enrolling."
    },
    {
      id: 4,
      category: "courses",
      question: "Can I drop a course after enrolling?",
      answer: "Yes, you can drop a course within the first two weeks of the semester. Go to 'My Courses', find the course you want to drop, and click 'Drop Course'. Note that dropping after the deadline may affect your academic record."
    },
    {
      id: 5,
      category: "assignments",
      question: "How do I submit an assignment?",
      answer: "Go to your 'Assignments' page, find the assignment you want to submit, and click 'Submit'. You can upload files by dragging and dropping or clicking to browse. All file types are accepted with no size limit."
    },
    {
      id: 6,
      category: "assignments",
      question: "Can I resubmit an assignment?",
      answer: "Once submitted, assignments cannot be resubmitted unless your instructor specifically allows it. Contact your instructor if you need to make changes to your submission."
    },
    {
      id: 7,
      category: "technical",
      question: "The website is loading slowly. What should I do?",
      answer: "Try refreshing the page, clearing your browser cache, or using a different browser. If the problem persists, check your internet connection or contact our technical support team."
    },
    {
      id: 8,
      category: "technical",
      question: "I'm having trouble uploading files. What's wrong?",
      answer: "Ensure you have a stable internet connection. Try uploading smaller files first. If the issue continues, try using a different browser or contact technical support with details about your browser and operating system."
    },
    {
      id: 9,
      category: "billing",
      question: "How do I view my billing information?",
      answer: "Billing information is typically handled by your institution's finance department. Contact your school's billing office for tuition and fee information."
    },
    {
      id: 10,
      category: "courses",
      question: "How do I access course materials?",
      answer: "Go to 'My Courses' and click on the course you want to access. Then click 'Materials' to view and download course resources like PDFs, presentations, and other learning materials."
    }
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const quickLinks = [
    { title: "Getting Started Guide", icon: "🚀", description: "New to EduManage? Start here!" },
    { title: "Video Tutorials", icon: "🎥", description: "Watch step-by-step guides" },
    { title: "System Requirements", icon: "💻", description: "Check compatibility" },
    { title: "Contact Support", icon: "📞", description: "Get personalized help" }
  ];

  return (
    <div className="support-page">
      <div className="support-header">
        <h1>📚 Help Center</h1>
        <p>Find answers to common questions and get the help you need</p>
        <Link to="/" className="back-btn">← Back to Home</Link>
      </div>

      <div className="support-container">
        {/* Search Section */}
        <div className="search-section">
          <div className="search-box">
            <input
              type="text"
              placeholder="🔍 Search for help..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        {/* Quick Links */}
        <div className="quick-links-section">
          <h2>Quick Links</h2>
          <div className="quick-links-grid">
            {quickLinks.map((link, index) => (
              <div key={index} className="quick-link-card">
                <div className="quick-link-icon">{link.icon}</div>
                <h3>{link.title}</h3>
                <p>{link.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Categories */}
        <div className="faq-section">
          <h2>Frequently Asked Questions</h2>
          
          <div className="category-filters">
            {faqCategories.map(category => (
              <button
                key={category.id}
                className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.icon} {category.name}
              </button>
            ))}
          </div>

          <div className="faq-list">
            {filteredFaqs.length === 0 ? (
              <div className="no-results">
                <p>No FAQs found matching your search criteria.</p>
              </div>
            ) : (
              filteredFaqs.map(faq => (
                <div key={faq.id} className="faq-item">
                  <h3 className="faq-question">❓ {faq.question}</h3>
                  <p className="faq-answer">{faq.answer}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Contact Support */}
        <div className="contact-support-section">
          <h2>Still Need Help?</h2>
          <p>Can't find what you're looking for? Our support team is here to help!</p>
          <div className="support-options">
            <Link to="/contact" className="support-option">
              <div className="support-icon">📧</div>
              <h3>Email Support</h3>
              <p>Get detailed help via email</p>
            </Link>
            <div className="support-option">
              <div className="support-icon">💬</div>
              <h3>Live Chat</h3>
              <p>Chat with our support team</p>
            </div>
            <div className="support-option">
              <div className="support-icon">📞</div>
              <h3>Phone Support</h3>
              <p>Call us at (555) 123-4567</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;