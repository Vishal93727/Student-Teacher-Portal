import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Register from './Register';
const LoginComponent = ({ onLogin }) => {
  const [formData, setFormData] = useState({ email: '', password: '', role: 'student' });
const navigate = useNavigate();

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const userData = {
  //     id: 1,
  //     name: formData.role === 'teacher' ? 'Professor Smith' : 'John Student',
  //     email: formData.email,
  //     role: formData.role
  //   };
  //   onLogin(userData);
  // };
// const handleSubmit = async (e) => {
//   e.preventDefault();
//   try {
//     const response = await fetch("http://localhost:5000/api/auth/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         email: formData.email,
//         password: formData.password,
//       }),
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       alert(data.message || "Login failed");
//       return;
//     }

//     onLogin(data.user);
//     localStorage.setItem("token", data.token);
//   } catch (error) {
//     console.error("Login Error:", error);
//     alert("Error connecting to server");
//   }
// };
// const handleSubmit = async (e) => {
//   e.preventDefault();
//   try {
//     const response = await fetch("http://localhost:5000/api/auth/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email: formData.email, password: formData.password }),
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       alert(data.message);
//       return;
//     }

//     onLogin(data.user);
//     localStorage.setItem("token", data.token);
//   } catch (err) {
//     console.error(err);
//     alert("Server error");
//   }
// };
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
        role: formData.role, // optional if backend needs it
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Login failed");
      return;
    }

    console.log("Login Success:", data);
    onLogin(data.user);
    localStorage.setItem("token", data.token);
localStorage.setItem("user", JSON.stringify(data.user));

    
  } catch (err) {
    console.error("Server Error:", err);
    alert("Server error");
  }
};

const handleRegister = (e) => {
    e.preventDefault();
    navigate('/register');
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
         
      
       <div className="login-hea">
          <p>
            Don’t have an account?{' '}
            <a href="/register" onClick={handleRegister}>Sign Up</a>
          </p>
        </div>
    </div>
    </div>
   
  );
};

export default LoginComponent;
