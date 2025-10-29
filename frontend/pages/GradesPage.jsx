import React, { useEffect, useState } from "react";

const GradesPage = ({ currentUser }) => {
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    const loadGrades = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/grades");
        const data = await res.json();

        if (currentUser?.role === "student") {
          setGrades(data.filter(g => g.studentName === currentUser.name));
        } else {
          setGrades(data);
        }
      } catch (err) {
        console.error("Error fetching grades:", err);
      }
    };

    loadGrades();
  }, [currentUser]);

  return (
    <div className="grades-page">
      <h1>🏁 Grades</h1>

      {grades.length > 0 ? (
        <div className="grades-grid">
          {grades.map((g, idx) => (
            <div key={idx} className="grade-card">
              <p><strong>Student:</strong> {g.studentName}</p>
              <p><strong>Test:</strong> {g.assignmentId?.title}</p>
              <p><strong>Percentage:</strong> {g.percentage || "Pending"}%</p>
              <p><strong>Grade:</strong> <span className={`grade ${g.grade}`}>{g.grade || "Pending"}</span></p>
            </div>
          ))}
        </div>
      ) : (
        <p>No grades available.</p>
      )}
    </div>
  );
};

export default GradesPage;
