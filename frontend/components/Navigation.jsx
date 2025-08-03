import React from 'react';

const Navigation = ({ currentUser, currentView, setCurrentView, handleLogout, isMobileMenuOpen, toggleMobileMenu }) => {
  const menuItems = currentUser?.role === 'teacher'
    ? [
        { id: 'dashboard', label: 'Dashboard', icon: '📊' },
        { id: 'assignments', label: 'Assignments', icon: '📝' },
        { id: 'tests', label: 'Tests', icon: '📋' },
        { id: 'test-builder', label: 'Create Test', icon: '🧪' },
        { id: 'create-assignment', label: 'Create Assignment', icon: '📝' },
        { id: 'students', label: 'Students', icon: '👥' },
        { id: 'submissions', label: 'Submissions', icon: '📤' }
      ]
    : [
        { id: 'dashboard', label: 'Dashboard', icon: '📊' },
        { id: 'assignments', label: 'My Assignments', icon: '📝' },
        { id: 'tests', label: 'My Tests', icon: '📋' },
        { id: 'grades', label: 'Grades', icon: '🎯' }
      ];

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-brand">
          <span className="brand-icon">📚</span>
          <span className="brand-text">EduPortal</span>
        </div>
        <div className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          {menuItems.map(item => (
            <button
              key={item.id}
              className={`nav-item ${currentView === item.id ? 'active' : ''}`}
              onClick={() => {
                setCurrentView(item.id);
                toggleMobileMenu(false);
              }}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </div>
        <div className="nav-user">
          <span className="user-name">{currentUser?.name}</span>
          <span className="user-role">{currentUser?.role}</span>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
        <button className="mobile-menu-btn" onClick={() => toggleMobileMenu(!isMobileMenuOpen)}>
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
