import React, { useState, useEffect } from 'react';


const StudentDashboard = () => {
    const stats = [
      { title: 'Pending Assignments', value: 3, icon: '📝', color: 'orange' },
      { title: 'Upcoming Tests', value: 2, icon: '📋', color: 'red' },
      { title: 'Average Grade', value: 'B+', icon: '🎯', color: 'green' },
      { title: 'Days to Deadline', value: 5, icon: '⏰', color: 'blue' }
    ];

  const [currentUser, setCurrentUser] = useState(null);
  const [currentView, setCurrentView] = useState('login');
  const [assignments, setAssignments] = useState([]);
  const [tests, setTests] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [students, setStudents] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Mock data initialization
  // useEffect(() => {
  //   // Mock assignments
  //   setAssignments([
  //     { id: 1, title: 'Math Assignment 1', dueDate: '2025-08-15', subject: 'Mathematics', status: 'Active' },
  //     { id: 2, title: 'Science Project', dueDate: '2025-08-20', subject: 'Science', status: 'Active' },
  //     { id: 3, title: 'History Essay', dueDate: '2025-08-25', subject: 'History', status: 'Draft' }
  //   ]);

  //   // Mock tests
  //   setTests([
  //     { id: 1, title: 'Algebra Quiz', duration: 30, questions: 15, status: 'Published' },
  //     { id: 2, title: 'Physics Test', duration: 45, questions: 20, status: 'Draft' }
  //   ]);

  //   // Mock students
  //   setStudents([
  //     { id: 1, name: 'John Doe', email: 'john@student.com', grade: 'A', submissions: 5 },
  //     { id: 2, name: 'Jane Smith', email: 'jane@student.com', grade: 'B+', submissions: 4 },
  //     { id: 3, name: 'Mike Johnson', email: 'mike@student.com', grade: 'A-', submissions: 5 }
  //   ]);

  //   // Mock submissions
  //   setSubmissions([
  //     { id: 1, studentName: 'John Doe', assignment: 'Math Assignment 1', submittedAt: '2025-08-01', status: 'Submitted', grade: null },
  //     { id: 2, studentName: 'Jane Smith', assignment: 'Science Project', submittedAt: '2025-08-02', status: 'Graded', grade: 'B+' }
  //   ]);
  // }, []);


useEffect(() => {

  const studentId = localStorage.getItem("studentId") || "<some-id>";
  const load = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/dashboard/student/${studentId}`);
      if (!res.ok) throw new Error("Failed to load dashboard");
      const json = await res.json();

      // set state
      setCurrentUser(json.student);
      setAssignments(json.pendingAssignments); // you may want to keep all assignments too
      setTests(json.upcomingTests);
      setSubmissions(json.recentSubmissions);
      // stats might be used to show tiles
      // e.g. stats: {pendingAssignmentsCount, upcomingTestsCount, averageGrade, daysToNearestDeadline}
    } catch (err) {
      console.error(err);
    }
  };
  load();
}, []);



    return (
      <div className="dashboard">
        <div className="dashboard-header">
          <h1>Student Dashboard</h1>
          <p>Welcome back, {currentUser?.name}! Here's your academic overview.</p>
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
            <h2>Upcoming Assignments</h2>
            <div className="assignment-list">
              {assignments.map(assignment => (
                <div key={assignment.id} className="assignment-item">
                  <div className="assignment-info">
                    <h4>{assignment.title}</h4>
                    <p>Due: {assignment.dueDate} • Subject: {assignment.subject}</p>
                  </div>
                  <button className="submit-btn">View Details</button>
                </div>
              ))}
            </div>
          </div>

          <div className="recent-section">
            <h2>Recent Grades</h2>
            <div className="grade-list">
              <div className="grade-item">
                <div className="grade-info">
                  <h4>Math Assignment 1</h4>
                  <p>Submitted: Aug 1, 2025</p>
                </div>
                <span className="grade graded">A-</span>
              </div>
              <div className="grade-item">
                <div className="grade-info">
                  <h4>Science Project</h4>
                  <p>Submitted: Aug 2, 2025</p>
                </div>
                <span className="grade graded">B+</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  export default StudentDashboard;