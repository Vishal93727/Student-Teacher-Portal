

// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import '../styles/styles.css'
// import StudentTeacherPortal from '../pages/StudentTeacherPortal';
// import Footer from '../components/Footer'

// import Register from '../components/Register';

// function App() {
//   return (
//     <Router>
      
//       <Routes>
//         <Route path="/" element={<StudentTeacherPortal/>} />
//         <Route path="/register" element={<Register />} />
//       </Routes>
//         <Footer/>
//     </Router>
//   );
// }
// export default App


import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '../styles/styles.css';
import StudentTeacherPortal from '../pages/StudentTeacherPortal';
import Footer from '../components/Footer';
import Register from '../components/Register';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  // Load user from localStorage (for persistence)
  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  // Function to handle login from LoginComponent
  const handleLogin = (userData) => {
    setCurrentUser(userData);
    localStorage.setItem("currentUser", JSON.stringify(userData));
  };

  // Function to logout
  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <StudentTeacherPortal
              currentUser={currentUser}
              onLogin={handleLogin}
              onLogout={handleLogout}
            />
          }
        />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
