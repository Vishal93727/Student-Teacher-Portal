import React, { useState, useEffect } from 'react';
import LoginComponent from '../components/LoginComponent';
import Navigation from '../components/Navigation';
import StudentDashboard from './StudentDashboard';
import TeacherDashboard from './TeacherDashboard';
import TestBuilder from './TestBuilder';
import ComingSoon from './ComingSoon';
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

  useEffect(() => {
    setAssignments(mockAssignments);
    setTests(mockTests);
    setStudents(mockStudents);
    setSubmissions(mockSubmissions);
  }, []);

  const handleLogin = (user) => {
    setCurrentUser(user);
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
        return <div>Profile Page - Coming Soon</div>;
      case 'assignments':
        return currentUser.role === 'teacher' ? (
          <Assignment assignments={assignments} />
        ) : (
          <div>My Assignments Page - Coming Soon</div>
        );
      case 'tests':
        return currentUser.role === 'teacher' ? (
          <div>Tests Page - Coming Soon</div>
        ) : (
          <div>My Tests Page - Coming Soon</div>
        );
      case 'grades':
        return currentUser.role === 'teacher' ? (
          <div>Grades Page - Coming Soon</div>
        ) : (
          <div>Grades Page - Coming Soon</div>
        );
      case 'submissions':
        return currentUser.role === 'teacher' ? (
          <div>Submissions Page - Coming Soon</div>
        ) : (
          <div>My Submissions Page - Coming Soon</div>
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
