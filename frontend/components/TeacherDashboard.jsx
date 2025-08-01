import React, { useState, useEffect } from 'react';

// Dashboard Components
  const TeacherDashboard = () => {
    const stats = [
      { title: 'Total Assignments', value: assignments.length, icon: '📝', color: 'blue' },
      { title: 'Active Tests', value: tests.filter(t => t.status === 'Published').length, icon: '📋', color: 'green' },
      { title: 'Students', value: students.length, icon: '👥', color: 'purple' },
      { title: 'Pending Reviews', value: submissions.filter(s => !s.grade).length, icon: '⏰', color: 'orange' }
    ];
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
    return (
      <div className="dashboard">
        <div className="dashboard-header">
          <h1>Teacher Dashboard</h1>
          <p>Welcome back, {currentUser?.name}! Here's what's happening in your classes.</p>
        </div>
        
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className={`stat-card ${stat.color}`}>
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-content">
                <h3>{stat.value}</h3>
                <p>{stat.title}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="dashboard-content">
          <div className="recent-section">
            <h2>Recent Assignments</h2>
            <div className="assignment-list">
              {assignments.slice(0, 3).map(assignment => (
                <div key={assignment.id} className="assignment-item">
                  <div className="assignment-info">
                    <h4>{assignment.title}</h4>
                    <p>Due: {assignment.dueDate} • Subject: {assignment.subject}</p>
                  </div>
                  <span className={`status ${assignment.status.toLowerCase()}`}>
                    {assignment.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="recent-section">
            <h2>Recent Submissions</h2>
            <div className="submission-list">
              {submissions.slice(0, 3).map(submission => (
                <div key={submission.id} className="submission-item">
                  <div className="submission-info">
                    <h4>{submission.studentName}</h4>
                    <p>{submission.assignment} • {submission.submittedAt}</p>
                  </div>
                  <span className={`grade ${submission.grade ? 'graded' : 'pending'}`}>
                    {submission.grade || 'Pending'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default TeacherDashboard;
