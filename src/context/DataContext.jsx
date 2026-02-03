import { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  // Current user state (in real app, this would come from authentication)
  const [currentUser, setCurrentUser] = useState({
    id: "STU2024001", // Default to student
    role: "student",
    name: "John Doe"
  });

  // Courses created by teachers
  const [courses, setCourses] = useState([
    {
      id: 1,
      courseName: "Introduction to Computer Science",
      courseCode: "CS101",
      description: "Fundamental concepts of computer science including programming basics, algorithms, and data structures.",
      credits: 3,
      department: "Computer Science",
      semester: "Fall",
      year: "2024",
      maxStudents: 30,
      instructor: "Dr. Sarah Johnson",
      instructorId: "EMP2024001",
      schedule: {
        monday: { enabled: true, startTime: "09:00", endTime: "10:30" },
        wednesday: { enabled: true, startTime: "09:00", endTime: "10:30" },
        friday: { enabled: true, startTime: "09:00", endTime: "10:30" },
        tuesday: { enabled: false, startTime: "", endTime: "" },
        thursday: { enabled: false, startTime: "", endTime: "" }
      },
      enrolledStudents: ["STU2024001", "STU2024002", "STU2024004"],
      status: "Active",
      isEnrollmentOpen: true
    },
    {
      id: 2,
      courseName: "Data Structures and Algorithms",
      courseCode: "CS201",
      description: "Advanced programming concepts including data structures, algorithms, and complexity analysis.",
      credits: 4,
      department: "Computer Science",
      semester: "Fall",
      year: "2024",
      maxStudents: 25,
      instructor: "Dr. Sarah Johnson",
      instructorId: "EMP2024001",
      schedule: {
        tuesday: { enabled: true, startTime: "14:00", endTime: "15:30" },
        thursday: { enabled: true, startTime: "14:00", endTime: "15:30" },
        monday: { enabled: false, startTime: "", endTime: "" },
        wednesday: { enabled: false, startTime: "", endTime: "" },
        friday: { enabled: false, startTime: "", endTime: "" }
      },
      enrolledStudents: ["STU2024001", "STU2024002", "STU2024003"],
      status: "Active",
      isEnrollmentOpen: true
    },
    {
      id: 3,
      courseName: "Database Management Systems",
      courseCode: "CS301",
      description: "Comprehensive study of database design, implementation, and management.",
      credits: 3,
      department: "Computer Science",
      semester: "Fall",
      year: "2024",
      maxStudents: 30,
      instructor: "Dr. Sarah Johnson",
      instructorId: "EMP2024001",
      schedule: {
        monday: { enabled: true, startTime: "11:00", endTime: "12:30" },
        wednesday: { enabled: true, startTime: "11:00", endTime: "12:30" },
        tuesday: { enabled: false, startTime: "", endTime: "" },
        thursday: { enabled: false, startTime: "", endTime: "" },
        friday: { enabled: false, startTime: "", endTime: "" }
      },
      enrolledStudents: ["STU2024002", "STU2024003"],
      status: "Active",
      isEnrollmentOpen: true
    }
  ]);

  // Student enrollments and academic data
  const [studentData, setStudentData] = useState({
    "STU2024001": {
      enrolledCourses: ["CS101", "CS201"],
      grades: {
        "CS101": { current: "A-", progress: 75 },
        "CS201": { current: "B+", progress: 60 }
      },
      attendance: {
        "CS101": { attended: 42, total: 45, percentage: 93.3 },
        "CS201": { attended: 32, total: 38, percentage: 84.2 }
      }
    },
    "STU2024002": {
      enrolledCourses: ["CS101", "CS301"],
      grades: {
        "CS101": { current: "B", progress: 70 },
        "CS301": { current: "A", progress: 85 }
      },
      attendance: {
        "CS101": { attended: 40, total: 45, percentage: 88.9 },
        "CS301": { attended: 35, total: 40, percentage: 87.5 }
      }
    },
    "STU2024003": {
      enrolledCourses: ["CS201", "CS301"],
      grades: {
        "CS201": { current: "A", progress: 85 },
        "CS301": { current: "A-", progress: 80 }
      },
      attendance: {
        "CS201": { attended: 35, total: 38, percentage: 92.1 },
        "CS301": { attended: 38, total: 40, percentage: 95.0 }
      }
    },
    "STU2024004": {
      enrolledCourses: ["CS101"],
      grades: {
        "CS101": { current: "C+", progress: 45 }
      },
      attendance: {
        "CS101": { attended: 30, total: 45, percentage: 66.7 }
      }
    }
  });

  // Assignments created by teachers
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: "Programming Fundamentals Project",
      courseCode: "CS101",
      courseName: "Introduction to Computer Science",
      dueDate: "2024-02-05",
      status: "active",
      priority: "high",
      description: "Create a simple calculator application using basic programming concepts",
      instructions: "Build a calculator that can perform basic arithmetic operations. Include proper error handling and user interface.",
      points: 50,
      createdBy: "EMP2024001",
      allowedFileTypes: [".py", ".java", ".cpp", ".js", ".zip"], // Note: Now accepts any file type
      maxFileSize: 10 // Note: No size limit enforced
    },
    {
      id: 2,
      title: "Data Structures Implementation",
      courseCode: "CS201",
      courseName: "Data Structures and Algorithms",
      dueDate: "2024-02-10",
      status: "active",
      priority: "high",
      description: "Implement binary search tree with full documentation",
      instructions: "Create a complete BST implementation with insert, delete, search, and traversal methods. Include comprehensive documentation and test cases.",
      points: 100,
      createdBy: "EMP2024001",
      allowedFileTypes: [".py", ".java", ".cpp", ".zip", ".pdf"], // Note: Now accepts any file type
      maxFileSize: 15 // Note: No size limit enforced
    },
    {
      id: 3,
      title: "Database Design Project",
      courseCode: "CS301",
      courseName: "Database Management Systems",
      dueDate: "2024-02-08",
      status: "active",
      priority: "medium",
      description: "Design a normalized database for library management system",
      instructions: "Create an ER diagram, normalize to 3NF, and provide SQL scripts for table creation and sample data insertion.",
      points: 80,
      createdBy: "EMP2024001",
      allowedFileTypes: [".sql", ".pdf", ".docx", ".zip"], // Note: Now accepts any file type
      maxFileSize: 20 // Note: No size limit enforced
    }
  ]);

  // Assignment submissions
  const [submissions, setSubmissions] = useState([
    {
      id: 1,
      assignmentId: 3,
      studentId: "STU2024002",
      submittedAt: "2024-02-07T10:30:00Z",
      files: [
        { name: "library_database.sql", size: 2.5, type: "application/sql" },
        { name: "ER_Diagram.pdf", size: 1.2, type: "application/pdf" }
      ],
      comments: "Completed the database design with proper normalization. Included sample data and queries.",
      status: "submitted",
      grade: null,
      feedback: null
    }
  ]);

  // Add new course (called by teachers)
  const addCourse = (courseData) => {
    const newCourse = {
      id: courses.length + 1,
      ...courseData,
      enrolledStudents: [],
      status: "Active",
      isEnrollmentOpen: true
    };
    setCourses(prev => [...prev, newCourse]);
    return newCourse;
  };

  // Enroll student in course
  const enrollStudent = (studentId, courseCode) => {
    setCourses(prev => prev.map(course => {
      if (course.courseCode === courseCode && course.enrolledStudents.length < course.maxStudents) {
        return {
          ...course,
          enrolledStudents: [...course.enrolledStudents, studentId]
        };
      }
      return course;
    }));

    setStudentData(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        enrolledCourses: [...(prev[studentId]?.enrolledCourses || []), courseCode],
        grades: {
          ...prev[studentId]?.grades,
          [courseCode]: { current: "N/A", progress: 0 }
        },
        attendance: {
          ...prev[studentId]?.attendance,
          [courseCode]: { attended: 0, total: 0, percentage: 0 }
        }
      }
    }));
  };

  // Unenroll student from course
  const unenrollStudent = (studentId, courseCode) => {
    setCourses(prev => prev.map(course => {
      if (course.courseCode === courseCode) {
        return {
          ...course,
          enrolledStudents: course.enrolledStudents.filter(id => id !== studentId)
        };
      }
      return course;
    }));

    setStudentData(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        enrolledCourses: prev[studentId]?.enrolledCourses?.filter(code => code !== courseCode) || [],
        grades: Object.fromEntries(
          Object.entries(prev[studentId]?.grades || {}).filter(([code]) => code !== courseCode)
        ),
        attendance: Object.fromEntries(
          Object.entries(prev[studentId]?.attendance || {}).filter(([code]) => code !== courseCode)
        )
      }
    }));
  };

  // Get courses for a specific student
  const getStudentCourses = (studentId) => {
    const student = studentData[studentId];
    if (!student) return [];

    return courses.filter(course => 
      student.enrolledCourses.includes(course.courseCode)
    ).map(course => ({
      ...course,
      grade: student.grades[course.courseCode]?.current || "N/A",
      progress: student.grades[course.courseCode]?.progress || 0,
      attendance: student.attendance[course.courseCode] || { attended: 0, total: 0, percentage: 0 }
    }));
  };

  // Get available courses for enrollment (not enrolled by student)
  const getAvailableCoursesForStudent = (studentId) => {
    const student = studentData[studentId];
    const enrolledCourses = student?.enrolledCourses || [];
    
    return courses.filter(course => 
      course.status === "Active" && 
      course.isEnrollmentOpen &&
      !enrolledCourses.includes(course.courseCode) &&
      course.enrolledStudents.length < course.maxStudents
    );
  };

  // Get courses taught by a specific teacher
  const getTeacherCourses = (instructorId) => {
    return courses.filter(course => course.instructorId === instructorId);
  };

  // Get assignments for a specific student
  const getStudentAssignments = (studentId) => {
    const student = studentData[studentId];
    if (!student) return [];

    return assignments.filter(assignment => 
      student.enrolledCourses.includes(assignment.courseCode)
    ).map(assignment => {
      const submission = submissions.find(sub => 
        sub.assignmentId === assignment.id && sub.studentId === studentId
      );
      return {
        ...assignment,
        submission: submission || null,
        submissionStatus: submission ? submission.status : "pending"
      };
    });
  };

  // Get assignments for a specific teacher
  const getTeacherAssignments = (instructorId) => {
    return assignments.filter(assignment => assignment.createdBy === instructorId);
  };

  // Add new assignment (called by teachers)
  const addAssignment = (assignmentData) => {
    const newAssignment = {
      id: assignments.length + 1,
      ...assignmentData,
      status: "active"
    };
    setAssignments(prev => [...prev, newAssignment]);
    return newAssignment;
  };

  // Submit assignment
  const submitAssignment = (assignmentId, studentId, submissionData) => {
    const newSubmission = {
      id: submissions.length + 1,
      assignmentId,
      studentId,
      submittedAt: new Date().toISOString(),
      ...submissionData,
      status: "submitted",
      grade: null,
      feedback: null
    };
    setSubmissions(prev => [...prev, newSubmission]);
    return newSubmission;
  };

  // Get submissions for an assignment
  const getAssignmentSubmissions = (assignmentId) => {
    return submissions.filter(sub => sub.assignmentId === assignmentId);
  };

  // Grade submission
  const gradeSubmission = (submissionId, grade, feedback) => {
    setSubmissions(prev => prev.map(sub => 
      sub.id === submissionId 
        ? { ...sub, grade, feedback, status: "graded" }
        : sub
    ));
  };

  // Get all available courses (for enrollment)
  const getAvailableCourses = () => {
    return courses.filter(course => course.status === "Active");
  };

  const value = {
    currentUser,
    setCurrentUser,
    courses,
    setCourses,
    studentData,
    setStudentData,
    assignments,
    setAssignments,
    submissions,
    setSubmissions,
    addCourse,
    enrollStudent,
    unenrollStudent,
    getStudentCourses,
    getAvailableCoursesForStudent,
    getTeacherCourses,
    getStudentAssignments,
    getTeacherAssignments,
    addAssignment,
    submitAssignment,
    getAssignmentSubmissions,
    gradeSubmission,
    getAvailableCourses
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};