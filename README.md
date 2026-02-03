# 🎓 EduManage - Student Management System

A comprehensive, modern student management system built with React and Vite, featuring full functionality for both students and teachers with integrated social media capabilities.

![EduManage Banner](https://via.placeholder.com/800x200/1877f2/ffffff?text=EduManage+-+Student+Management+System)

## ✨ Features

### 👨‍🎓 Student Features
- **Dashboard**: Personalized student home with quick access to all features
- **Course Management**: View enrolled courses, course materials, and details
- **Course Enrollment**: Browse and enroll in available courses
- **Assignment System**: View assignments and submit with file upload (any file type, no size limits)
- **Attendance Tracking**: Real-time attendance percentage calculation
- **Profile Management**: Update personal information and preferences

### 👨‍🏫 Teacher Features
- **Dashboard**: Comprehensive teacher home with class overview
- **Course Creation**: Create and manage courses with detailed information
- **Class Management**: View enrolled students, export student lists, manage syllabus
- **Assignment Management**: Create, edit, and grade assignments
- **Attendance System**: Mark attendance and track student participation
- **Student Management**: View student profiles and contact information
- **Grading System**: Grade submissions and provide feedback

### 🌐 Social Media Integration
- **Facebook Page**: Realistic Facebook-style interface with posts, likes, comments
- **Twitter/X Page**: Authentic X design with tweets, retweets, and interactions
- **LinkedIn Page**: Professional LinkedIn-style company page with posts and jobs
- **Instagram Page**: Photo-focused Instagram interface with stories and posts

### 🛠️ Support System
- **Help Center**: Comprehensive FAQ system with search functionality
- **Contact Us**: Multiple contact methods with contact form
- **Privacy Policy**: Detailed privacy and data protection information
- **Terms & Conditions**: Complete terms of service and usage guidelines

## 🚀 Technology Stack

- **Frontend**: React 18 with Hooks
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **Styling**: CSS3 with modern features (Grid, Flexbox, Gradients)
- **State Management**: React Context API
- **File Upload**: Native HTML5 with drag-and-drop support
- **Responsive Design**: Mobile-first approach

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/edumanage-student-management.git
   cd edumanage-student-management
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.jsx      # Navigation component
│   ├── Footer.jsx      # Footer with social links
│   ├── ImageCarousel.jsx # Landing page carousel
│   └── BackgroundWrapper.jsx # Background component
├── Pages/              # Page components
│   ├── Student/        # Student-specific pages
│   ├── Teacher/        # Teacher-specific pages
│   ├── Social/         # Social media pages
│   ├── Landing.jsx     # Landing page
│   ├── Login.jsx       # Authentication
│   └── Support pages   # Help, Contact, Privacy, Terms
├── context/            # React Context for state management
│   └── DataContext.jsx # Global application state
├── styles/             # CSS stylesheets
│   ├── auth.css        # Authentication styles
│   ├── student.css     # Student dashboard styles
│   ├── teacher.css     # Teacher dashboard styles
│   ├── social.css      # Social media styles
│   ├── support.css     # Support pages styles
│   └── component styles
└── assets/             # Static assets (images, icons)
```

## 🎨 Design Features

- **Modern UI/UX**: Clean, intuitive interface with smooth animations
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Dark/Light Themes**: Context-aware styling for different sections
- **Gradient Backgrounds**: Beautiful gradient overlays and animations
- **Interactive Elements**: Hover effects, transitions, and micro-interactions
- **Accessibility**: ARIA labels, keyboard navigation, and screen reader support

## 🔧 Configuration

### Environment Setup
The project uses Vite for fast development and building. Configuration is in `vite.config.js`.

### Routing
All routes are defined in `src/App.jsx` with React Router DOM.

### State Management
Global state is managed through React Context in `src/context/DataContext.jsx`.

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deploy to GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json scripts: `"deploy": "gh-pages -d dist"`
3. Run: `npm run deploy`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Your Name** - *Initial work* - [YourGitHub](https://github.com/yourusername)

## 🙏 Acknowledgments

- React team for the amazing framework
- Vite team for the fast build tool
- All contributors who helped improve this project

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Contact us through the app's Contact Us page
- Email: support@edumanage.com

---

**Made with ❤️ for Education**