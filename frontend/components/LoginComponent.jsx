
import React, { useState, useEffect } from 'react';
import StudentDashboard from './StudentDashboard';
import Navigation from './Navigation';
import TeacherDashboard from './TeacherDashboard';
//import TestBuilder from './TestBuilder'


  // Login Component
  const LoginComponent = () => {
    const [formData, setFormData] = useState({ email: '', password: '', role: 'student' });
const [currentUser, setCurrentUser] = useState(null);
  const [currentView, setCurrentView] = useState('login');
  const [assignments, setAssignments] = useState([]);
  const [tests, setTests] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [students, setStudents] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Mock data initialization
  useEffect(() => {
    // Mock assignments
    setAssignments([
      { id: 1, title: 'Math Assignment 1', dueDate: '2025-08-15', subject: 'Mathematics', status: 'Active' },
      { id: 2, title: 'Science Project', dueDate: '2025-08-20', subject: 'Science', status: 'Active' },
      { id: 3, title: 'History Essay', dueDate: '2025-08-25', subject: 'History', status: 'Draft' }
    ]);

    // Mock tests
    setTests([
      { id: 1, title: 'Algebra Quiz', duration: 30, questions: 15, status: 'Published' },
      { id: 2, title: 'Physics Test', duration: 45, questions: 20, status: 'Draft' }
    ]);

    // Mock students
    setStudents([
      { id: 1, name: 'John Doe', email: 'john@student.com', grade: 'A', submissions: 5 },
      { id: 2, name: 'Jane Smith', email: 'jane@student.com', grade: 'B+', submissions: 4 },
      { id: 3, name: 'Mike Johnson', email: 'mike@student.com', grade: 'A-', submissions: 5 }
    ]);

    // Mock submissions
    setSubmissions([
      { id: 1, studentName: 'John Doe', assignment: 'Math Assignment 1', submittedAt: '2025-08-01', status: 'Submitted', grade: null },
      { id: 2, studentName: 'Jane Smith', assignment: 'Science Project', submittedAt: '2025-08-02', status: 'Graded', grade: 'B+' }
    ]);
  }, []);

  // Authentication
  const handleLogin = (userData) => {
    setCurrentUser(userData);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('login');
    setIsMobileMenuOpen(false);
  };

    const handleSubmit = (e) => {
      e.preventDefault();
      // Mock authentication
      const userData = {
        id: 1,
        name: formData.role === 'teacher' ? 'Professor Smith' : 'John Student',
        email: formData.email,
        role: formData.role
      };
      handleLogin(userData);
    };

    return (
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h1>📚 Student-Teacher Portal</h1>
            <p>Welcome back! Please sign in to your account.</p>
          </div>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="role">I am a:</label>
              <select
                id="role"
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </select>
            </div>
            <button type="submit" className="login-btn">Sign In</button>
          </form>
          <div className="login-footer">
            <p>Don't have an account? <a href="#register">Sign up here</a></p>
          </div>
        </div>
      </div>
    );
    // Render current view
  const renderCurrentView = () => {
    if (!currentUser) return <LoginComponent />;

    switch (currentView) {
      case 'dashboard':
        return currentUser.role === 'teacher' ? <TeacherDashboard /> : <StudentDashboard />;
      case 'test-builder':
        return currentUser.role === 'teacher' ? <TestBuilder /> : <div>Access Denied</div>;
      default:
        return <div className="coming-soon">🚧 This feature is coming soon!</div>;
    }
  };

  return (
    <div className="app">
      {currentUser && <Navigation />}
      <main className="main-content">
        {renderCurrentView()}
      </main>
      </div>
  );

  };
  
  export default LoginComponent;