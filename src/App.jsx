import { Routes, Route, useLocation } from "react-router-dom";
import { DataProvider } from "./context/DataContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Landing from "./Pages/Landing";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import StudentHome from "./Pages/Student/StudentHome";
import MyCourses from "./Pages/Student/MyCourses";
import CourseEnrollment from "./Pages/Student/CourseEnrollment";
import Attendance from "./Pages/Student/Attendance";
import Assignments from "./Pages/Student/Assignments";
import AssignmentSubmission from "./Pages/Student/AssignmentSubmission";
import Profile from "./Pages/Student/Profile";
import TeacherHome from "./Pages/Teacher/TeacherHome";
import CreateCourse from "./Pages/Teacher/CreateCourse";
import MyClasses from "./Pages/Teacher/MyClasses";
import Students from "./Pages/Teacher/Students";
import TeacherAttendance from "./Pages/Teacher/TeacherAttendance";
import TeacherAssignments from "./Pages/Teacher/TeacherAssignments";
import GradeAssignments from "./Pages/Teacher/GradeAssignments";
import TeacherProfile from "./Pages/Teacher/TeacherProfile";
import HelpCenter from "./Pages/HelpCenter";
import ContactUs from "./Pages/ContactUs";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import TermsConditions from "./Pages/TermsConditions";
import Facebook from "./Pages/Social/Facebook";
import Twitter from "./Pages/Social/Twitter";
import LinkedIn from "./Pages/Social/LinkedIn";
import Instagram from "./Pages/Social/Instagram";

const AppContent = () => {
  const location = useLocation();
  
  // Determine user role based on current path
  const getUserRole = () => {
    if (location.pathname.includes("/student")) return "student";
    if (location.pathname.includes("/teacher")) return "teacher";
    return null;
  };

  const showFooter = !location.pathname.includes("/student") && !location.pathname.includes("/teacher");

  return (
    <div className="app">
      <Navbar userRole={getUserRole()} />
      <main className="main-content">
        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<Landing />} />

          {/* Authentication */}
          <Route path="/login/student" element={<Login role="student" />} />
          <Route path="/login/teacher" element={<Login role="teacher" />} />
          <Route path="/signup" element={<Signup />} />

          {/* Student Routes */}
          <Route path="/student/home" element={<StudentHome />} />
          <Route path="/student/courses" element={<MyCourses />} />
          <Route path="/student/enroll" element={<CourseEnrollment />} />
          <Route path="/student/attendance" element={<Attendance />} />
          <Route path="/student/assignments" element={<Assignments />} />
          <Route path="/student/assignments/:assignmentId/submit" element={<AssignmentSubmission />} />
          <Route path="/student/profile" element={<Profile />} />

          {/* Teacher Routes */}
          <Route path="/teacher/home" element={<TeacherHome />} />
          <Route path="/teacher/create-course" element={<CreateCourse />} />
          <Route path="/teacher/classes" element={<MyClasses />} />
          <Route path="/teacher/students" element={<Students />} />
          <Route path="/teacher/attendance" element={<TeacherAttendance />} />
          <Route path="/teacher/assignments" element={<TeacherAssignments />} />
          <Route path="/teacher/assignments/:assignmentId/grade" element={<GradeAssignments />} />
          <Route path="/teacher/profile" element={<TeacherProfile />} />

          {/* Support Pages */}
          <Route path="/help" element={<HelpCenter />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsConditions />} />

          {/* Social Media Pages */}
          <Route path="/social/facebook" element={<Facebook />} />
          <Route path="/social/twitter" element={<Twitter />} />
          <Route path="/social/linkedin" element={<LinkedIn />} />
          <Route path="/social/instagram" element={<Instagram />} />
        </Routes>
      </main>
      {showFooter && <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <DataProvider>
      <AppContent />
    </DataProvider>
  );
};

export default App;
