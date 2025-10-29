import React, { useEffect, useState } from "react";

const SubmissionsPage = ({ currentUser }) => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/submissions")
      .then(res => res.json())
      .then(data => {
        if (currentUser.role === "student") {
          setSubmissions(data.filter(sub => sub.studentName === currentUser.name));
        } else {
          setSubmissions(data);
        }
      })
      .catch(err => console.error(err));
  }, [currentUser]);

  return (
    <div className="submissions-page">
      <h1>📤 Submissions</h1>
      {submissions.length > 0 ? (
        submissions.map(sub => (
          <div key={sub._id} className="submission-card">
            <p><strong>Student:</strong> {sub.studentName}</p>
            <p><strong>Assignment:</strong> {sub.assignmentId?.title}</p>
            <p><strong>Status:</strong> {sub.grade ? "Graded" : "Pending"}</p>
          </div>
        ))
      ) : (
        <p>No submissions found.</p>
      )}
    </div>
  );
};

export default SubmissionsPage;
