

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import '../styles/styles.css'
import StudentTeacherPortal from '../pages/StudentTeacherPortal';
import Footer from '../components/Footer'


import Register from '../components/Register';

function App() {
  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<StudentTeacherPortal/>} />
        <Route path="/register" element={<Register />} />
      </Routes>
        <Footer/>
    </Router>
  );
}
export default App
