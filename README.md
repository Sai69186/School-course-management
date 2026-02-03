# Student Management System

A comprehensive React-based student management system with separate dashboards for students and teachers.

## Features Completed

### 🎓 Student Features
- **Dashboard**: Overview of courses, assignments, and attendance
- **Course Management**: View enrolled courses and enroll in new ones
- **Assignment Submission**: Upload files with drag-and-drop, validation, and comments
- **Attendance Tracking**: View attendance records and statistics
- **Profile Management**: Personal information and academic records

### 👨‍🏫 Teacher Features
- **Dashboard**: Overview of classes, students, and assignments
- **Course Creation**: Create and manage courses with schedules
- **Assignment Management**: Create assignments with file requirements
- **Grading System**: Grade student submissions with feedback
- **Student Management**: View enrolled students and their progress
- **Attendance Management**: Track and manage student attendance

### 🔧 Technical Features
- **File Upload**: Drag-and-drop file upload with validation
- **Real-time Data**: Shared state management between student and teacher views
- **Responsive Design**: Mobile-friendly interface
- **Modern UI**: Attractive gradients and animations with school-themed backgrounds

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser to `http://localhost:5173` (or the port shown in terminal)

## Usage

### For Students
1. Navigate to student dashboard
2. Enroll in available courses
3. View and submit assignments
4. Track attendance and grades

### For Teachers
1. Navigate to teacher dashboard
2. Create courses and assignments
3. Grade student submissions
4. Manage student enrollment and attendance

## Project Structure

- `/src/Pages/Student/` - Student-specific pages
- `/src/Pages/Teacher/` - Teacher-specific pages
- `/src/components/` - Shared components
- `/src/context/` - Data management and state
- `/src/styles/` - CSS styling files

## Demo Data

The application includes sample data for demonstration:
- Pre-created courses and assignments
- Sample student enrollments
- Mock submission data

## Technologies Used

- React 18
- React Router
- Context API for state management
- CSS3 with modern features
- Vite for development

---

*This is a frontend-only demonstration. In a production environment, you would integrate with a backend API for data persistence and user authentication.*