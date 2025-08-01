import React from 'react';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <>
      <footer className="footer">
        <div className="footer-container">

          {/* About */}
          <div className="footer-section">
            <h2 className="footer-logo">🎓 EduPortal</h2>
            <p>
              EduPortal is a modern platform for students and teachers to share assignments, grades, and academic progress all in one place.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">Student Dashboard</a></li>
              <li><a href="#">Teacher Dashboard</a></li>
              <li><a href="#">Assignments</a></li>
              <li><a href="#">Login</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h3>Contact Us</h3>
            <p>📧 info@eduportal.com</p>
            <p>📞 +91 98765 43210</p>
            <p>📍 Pune, Maharashtra</p>
          </div>

          {/* Newsletter */}
          <div className="footer-section">
            <h3>Newsletter</h3>
            <p>Stay updated with our latest features.</p>
            <input type="email" placeholder="Your email" className="email-input" />
            <button className="subscribe-btn">Subscribe</button>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="footer-bottom">
          <div className="social-icons">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-linkedin-in"></i></a>
            <a href="#"><i className="fab fa-github"></i></a>
          </div>
          <div className="legal-links">
            <a href="#">Terms</a> | <a href="#">Privacy</a>
          </div>
          <div className="copyright">
            &copy; {year} EduPortal. All rights reserved. | Designed by Vishal Mourya
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;