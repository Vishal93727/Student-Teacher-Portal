import React, { useState } from 'react';

const LoginComponent = ({ onLogin }) => {
  const [formData, setFormData] = useState({ email: '', password: '', role: 'student' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      id: 1,
      name: formData.role === 'teacher' ? 'Professor Smith' : 'John Student',
      email: formData.email,
      role: formData.role
    };
    onLogin(userData);
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
            <label>Email Address</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>I am a:</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>
          <button type="submit" className="login-btn">Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default LoginComponent;
