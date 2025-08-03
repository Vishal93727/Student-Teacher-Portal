const TeacherDashboard = ({ assignments, tests, submissions, students, currentUser }) => {
  const stats = [
    { title: 'Active Tests', value: tests.filter(t => t.status === 'Published').length, icon: '📋', color: 'green' },
    { title: 'Students', value: students.length, icon: '👥', color: 'purple' },
    { title: 'Pending Reviews', value: submissions.filter(s => !s.grade).length, icon: '⏰', color: 'orange' }
  ];

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
        {/* Recent Assignments */}
        <div className="recent-section">
          <h2>Recent Assignments</h2>
          <div className="assignment-list">
            {assignments.slice(0, 3).map(assignment => (
              <div key={assignment.id} className="assignment-item">
                <div className="assignment-info">
                  <h4>{assignment.title}</h4>
                  <p>Due: {assignment.dueDate} • Subject: {assignment.subject}</p>
                </div>
                <span className={`status ${assignment.status.toLowerCase()}`}>{assignment.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Submissions */}
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
