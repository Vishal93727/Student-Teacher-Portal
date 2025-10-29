import React, { useState, useEffect } from 'react';
import LoginComponent from '../components/LoginComponent';
import Navigation from '../components/Navigation';
import StudentDashboard from './StudentDashboard';
import TeacherDashboard from './TeacherDashboard';
import TestBuilder from './TestBuilder';
import ComingSoon from './ComingSoon';
import ProfilePage from './ProfilePage';
import StudentAssignments from './StudentAssignments';
import TestsPage from './TestsPage';
import GradesPage from './GradesPage';
import SubmissionsPage from './SubmissionsPage';

import Assignment from '../pages/Assignment';
import Register from '../components/Register';
import Navbar from '../components/Navbar'
import TeacherStudentFilter from './TeacherStudentFilter';
import { mockAssignments, mockTests, mockStudents, mockSubmissions } from '../data/mockData';
import '../styles/styles.css';

const StudentTeacherPortal = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentView, setCurrentView] = useState('login');
  const [assignments, setAssignments] = useState([]);
    const [createAssignments, setCreateAssignments] = useState([]);

  const [tests, setTests] = useState([]);
  const [students, setStudents] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const [assignRes, testRes, subRes] = await Promise.all([
//         fetch("http://localhost:5000/api/assignments").then(r => r.json()),
//         fetch("http://localhost:5000/api/tests").then(r => r.json()),
//         fetch("http://localhost:5000/api/submissions").then(r => r.json())
//       ]);
//       setAssignments(assignRes);
//       setTests(testRes);
//       setSubmissions(subRes);
//     } catch (err) {
//       console.error("Error loading data:", err);
//     }
//   };
//   fetchData();
// }, []);
useEffect(() => {
  const fetchData = async () => {
    try {
      const [assignRes, testRes, subRes] = await Promise.all([
        fetch("http://localhost:5000/api/assignments").then(r => r.json()),
        fetch("http://localhost:5000/api/tests").then(r => r.json()),
        fetch("http://localhost:5000/api/submissions").then(r => r.json())
      ]);

      // ✅ Safely handle both array or wrapped object responses
      setAssignments(Array.isArray(assignRes) ? assignRes : assignRes.assignments || []);
      setTests(Array.isArray(testRes) ? testRes : testRes.tests || []);
      setSubmissions(Array.isArray(subRes) ? subRes : subRes.submissions || []);
    } catch (err) {
      console.error("Error loading data:", err);
    }
  };

  fetchData();
}, []);

  // const handleLogin = (user) => {
  //   setCurrentUser(user);
  //   setCurrentView('dashboard');
  // };
  const handleLogin = (user) => {
  // Map backend `id` to `_id` so dashboard works
  const mappedUser = { ...user, _id: user.id };
  setCurrentUser(mappedUser);
  localStorage.setItem("user", JSON.stringify(mappedUser));
  setCurrentView('dashboard');
};



  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('login');
    setIsMobileMenuOpen(false);
  };

  const renderCurrentView = () => {
    if (!currentUser) return (<>
      <Navbar/>
    <LoginComponent onLogin={handleLogin} />
    </>);
    
    switch (currentView) {
     
      case 'dashboard':
        return currentUser.role === 'teacher' ? (
          <TeacherDashboard
          currentUser={currentUser}
            assignments={assignments}
            tests={tests}
            students={students}
            submissions={submissions}
            createAssignments={createAssignments}
         
          />
        ) : (
          <StudentDashboard
            assignments={assignments}
            tests={tests}
            submissions={submissions.filter(sub => sub.studentName === currentUser.name)}
          
          />
        );
      case 'test-builder':
        return currentUser.role === 'teacher' ? <TestBuilder /> : <div>Access Denied</div>;
      case 'create-assignment':
        return currentUser.role === 'teacher' ? <Assignment /> : <div>Access Denied</div>;
      case 'register':
        return <Register onRegistrationSuccess={handleLogin} />;
      case 'profile':
        return currentUser ? <ProfilePage currentUser={currentUser} /> : <p>Loading...</p>;
;// 
  

      case 'assignments':
        return currentUser.role === 'teacher' ? (
          <Assignment assignments={assignments} />
        ) : (
          <div><StudentAssignments/></div>
        );
      case 'tests':
        return currentUser.role === 'teacher' ? (
          <div>Tests Page - Coming Soon</div>
        ) : (
          <TestsPage/>
        );
      case 'grades':
        return currentUser.role === 'teacher' ? (
          <div>Grades Page - Coming Soon</div>
        ) : (
          <GradesPage/>
        );
      case 'submissions':
        return currentUser.role === 'teacher' ? (
          <div>Submissions Page - Coming Soon</div>
        ) : (
          <SubmissionsPage/>
        );
      case 'logout':
        handleLogout();
        return <div>Logging out...</div>;
      case 'coming-soon':
        return <ComingSoon />;
      case 'login':
        return <LoginComponent onLogin={handleLogin} />;
    
      case 'students':
        return <TeacherStudentFilter />;
        default:
        return <ComingSoon />;
    }
    
    

// inside renderCurrentView():
// switch (currentView) {
//   case 'dashboard':
//     return currentUser.role === 'teacher' ? (
//       <TeacherDashboard
//         assignments={assignments}
//         tests={tests}
//         students={students}
//         submissions={submissions}
//       />
//     ) : (
//       <StudentDashboard
//         assignments={assignments}
//         tests={tests}
//         submissions={submissions.filter(sub => sub.studentName === currentUser.name)}
//       />
//     );

//   case 'profile':
//     return <ProfilePage currentUser={currentUser} />;

//   case 'assignments':
//     return currentUser.role === 'teacher' ? (
//       <Assignment assignments={assignments} />
//     ) : (
//       <StudentAssignments currentUser={currentUser} />
//     );

//   case 'tests':
//     return <TestsPage />;

//   case 'grades':
//     return <GradesPage currentUser={currentUser} />;

//   case 'submissions':
//     return <SubmissionsPage currentUser={currentUser} />;

//   case 'students':
//     return <TeacherStudentFilter />;

//   case 'logout':
//     handleLogout();
//     return <div>Logging out...</div>;

//   default:
//     return <ProfilePage currentUser={currentUser} />;
// }

  };

  return (
    <div className="app">
      {currentUser && (
        <Navigation
          currentUser={currentUser}
          currentView={currentView}
          setCurrentView={setCurrentView}
          handleLogout={handleLogout}
          isMobileMenuOpen={isMobileMenuOpen}
          toggleMobileMenu={setIsMobileMenuOpen}
        />
      )}
      <main className="main-content">
        {renderCurrentView()}
      </main>
    </div>
  );
};

export default StudentTeacherPortal;
