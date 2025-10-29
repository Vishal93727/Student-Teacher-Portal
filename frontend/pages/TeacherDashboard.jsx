// import Assignment from '../pages/Assignment';

// import React, { useEffect, useState } from 'react';


// const TeacherDashboard = ({ assignments, tests, submissions, students, currentUser }) => {
//   const stats = [
//     { title: 'Active Tests', value: tests.filter(t => t.status === 'Published').length, icon: '📋', color: 'green' },
//     { title: 'Students', value: students.length, icon: '👥', color: 'purple' },
//     { title: 'Pending Reviews', value: submissions.filter(s => !s.grade).length, icon: '⏰', color: 'orange' }
//   ];
// const [data, setData] = useState({ assignments: [], submissions: [], students: [], tests: [], stats: {} });

//   useEffect(() => {
//     const fetchDashboard = async () => {
//       const res = await fetch(`http://localhost:5000/api/dashboard/teacher/${currentUser._id}`);
//       const json = await res.json();
//       setData(json);
//     };
//     fetchDashboard();
//   }, [currentUser]);

  
  
//   return (
//     <div className="dashboard">
//       <div className="dashboard-header">
//         <h1>Teacher Dashboard</h1>
//         <p>Welcome back, {currentUser?.name}! Here's what's happening in your classes.</p>
//       </div>

//       <div className="stats-grid">
//         {stats.map((stat, index) => (
//           <div key={index} className={`stat-card ${stat.color}`}>
//             <div className="stat-icon">{stat.icon}</div>
//             <div className="stat-content">
//               <h3>{stat.value}</h3>
//               <p>{stat.title}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="dashboard-content">
//         {/* Recent Assignments */}
//         <div className="recent-section">
//           <h2>Recent Assignments</h2>
//           <div className="assignment-list">
//             {assignments.slice(0, 3).map(assignment => (
//               <div key={assignment.id} className="assignment-item">
//                 <div className="assignment-info">
//                   <h4>{assignment.title}</h4>
//                   <p>Due: {assignment.dueDate} • Subject: {assignment.subject}</p>
//                 </div>
//                 <span className={`status ${assignment.status.toLowerCase()}`}>{assignment.status}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Recent Submissions */}
//         <div className="recent-section">
//           <h2>Recent Submissions</h2>
//           <div className="submission-list">
//             {submissions.slice(0, 3).map(submission => (
//               <div key={submission.id} className="submission-item">
//                 <div className="submission-info">
//                   <h4>{submission.studentName}</h4>
//                   <p>{submission.assignment} • {submission.submittedAt}</p>
//                 </div>
//                 <span className={`grade ${submission.grade ? 'graded' : 'pending'}`}>
//                   {submission.grade || 'Pending'}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// import React, { useEffect, useState } from "react";

// const TeacherDashboard = () => {
// // const [teacher, setTeacher] = useState(null);
//   const [teacher, setTeacher] = useState(JSON.parse(localStorage.getItem("user")) || null);


//   const [data, setData] = useState({
//     assignments: [],
//     tests: [],
//     submissions: [],
//     students: [],
//     stats: {},
//   });
//   const [loading, setLoading] = useState(true);

//   // Step 1: Fetch logged-in teacher
//   const fetchTeacher = async () => {
//   try {
//     const token = localStorage.getItem("token");
//     if (!token) throw new Error("No auth token found");

//     const res = await fetch("http://localhost:5000/api/auth/me", {
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${token}`,
//       },
//     });

//     if (!res.ok) throw new Error(`Failed to fetch teacher info (${res.status})`);

//     const user = await res.json();
//     setTeacher(user);
//     return user;
//   } catch (error) {
//     console.error("❌ Error fetching teacher:", error);
//     setLoading(false);
//   }
// };

  

//   // Step 2: Fetch teacher dashboard data
//   const fetchDashboard = async (teacherId) => {
//     try {
//       const res = await fetch(
//         `http://localhost:5000/api/dashboard/teacher/${teacherId}`
//       );
//       if (!res.ok) throw new Error(`Failed to fetch dashboard (${res.status})`);
//       const json = await res.json();
//       setData(json);
//     } catch (error) {
//       console.error("❌ Error fetching dashboard data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const init = async () => {
//       const user = await fetchTeacher();
//       if (user?._id) await fetchDashboard(user._id);
//     };
//     init();
//   }, []);

//   const { assignments, submissions, students, stats } = data;

//   if (loading) return <p>Loading dashboard...</p>;
//   if (!teacher) return <p>No teacher data found. Please log in again.</p>;

//   return (
//     <div className="dashboard">
//       <div className="dashboard-header">
//         <h1>Teacher Dashboard</h1>
//         <p>Welcome back, {teacher.name || "Teacher"}! Here's your classroom summary.</p>
//       </div>

//       {/* Stats Section */}
//       <div className="stats-grid">
//         <div className="stat-card green">
//           <div className="stat-icon">📋</div>
//           <div className="stat-content">
//             <h3>{stats.activeTests || 0}</h3>
//             <p>Active Tests</p>
//           </div>
//         </div>
//         <div className="stat-card purple">
//           <div className="stat-icon">👥</div>
//           <div className="stat-content">
//             <h3>{students.length}</h3>
//             <p>Students</p>
//           </div>
//         </div>
//         <div className="stat-card orange">
//           <div className="stat-icon">⏰</div>
//           <div className="stat-content">
//             <h3>{stats.pendingReviews || 0}</h3>
//             <p>Pending Reviews</p>
//           </div>
//         </div>
//       </div>

//       {/* Assignments Section */}
//       <div className="dashboard-content">
//         <div className="recent-section">
//           <h2>Recent Assignments</h2>
//           <div className="assignment-list">
//             {assignments.length === 0 ? (
//               <p>No assignments yet.</p>
//             ) : (
//               assignments.slice(0,3).map(a => (
//   <div key={a._id ?? a.title + Math.random( )} className="assignment-item">

//                   <div className="assignment-info">
//                     <h4>{a.title}</h4>
//                     <p>
//                       Due:{" "}
//                       {a.dueDate
//                         ? new Date(a.dueDate).toLocaleDateString()
//                         : "N/A"}{" "}
//                       • Subject: {a.subject || "N/A"}
//                     </p>
//                   </div>
//                   <span
//                     className={`status ${a.status?.toLowerCase() || "pending"}`}
//                   >
//                     {a.status || "Pending"}
//                   </span>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>


//         {/* Submissions Section */}
//         <div className="recent-section">
//           <h2>Recent Submissions</h2>
//           <div className="submission-list">
//             {submissions.length === 0 ? (
//               <p>No submissions yet.</p>
//             ) : (
//               submissions.slice(0,3).map(s => (
//   <div key={s._id ?? s.assignmentTitle + s.studentName + Math.random()} className="submission-item">
//                   <div className="submission-info">
//                     <h4>{s.studentName}</h4>
//                     <p>
//                       {s.assignmentTitle} •{" "}
//                       {s.submittedAt
//                         ? new Date(s.submittedAt).toLocaleDateString()
//                         : "N/A"}
//                     </p>
//                   </div>
//                   <span className={`grade ${s.grade ? "graded" : "pending"}`}>
//                     {s.grade || "Pending"}
//                   </span>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TeacherDashboard;


// import React, { useEffect, useState } from 'react';

// const TeacherDashboard = ({ currentUser }) => {
//   const [data, setData] = useState({
//     assignments: [],
//     submissions: [],
//     students: [],
//     tests: [],
//   });

//   // Fetch data from backend
//   useEffect(() => {
//     const fetchDashboard = async () => {
//       try {
//         const res = await fetch(`http://localhost:5000/api/dashboard/teacher/${currentUser._id}`);
//         const json = await res.json();
//         setData(json);
//       } catch (error) {
//         console.error("Failed to fetch dashboard data:", error);
//       }
//     };
//     fetchDashboard();
//   }, [currentUser]);

//   // Stats based on fetched data
//   const stats = [
//     { title: 'Active Tests', value: data.tests.filter(t => t.status === 'Published').length, icon: '📋', color: 'green' },
//     { title: 'Students', value: data.students.length, icon: '👥', color: 'purple' },
//     { title: 'Pending Reviews', value: data.submissions.filter(s => !s.grade).length, icon: '⏰', color: 'orange' }
//   ];

//   return (
//     <div className="dashboard">
//       <div className="dashboard-header">
//         <h1>Teacher Dashboard</h1>
//         <p>Welcome back, {currentUser?.name}! Here's what's happening in your classes.</p>
//       </div>

//       <div className="stats-grid">
//         {stats.map((stat, index) => (
//           <div key={index} className={`stat-card ${stat.color}`}>
//             <div className="stat-icon">{stat.icon}</div>
//             <div className="stat-content">
//               <h3>{stat.value}</h3>
//               <p>{stat.title}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="dashboard-content">
//         {/* Recent Assignments */}
//         <div className="recent-section">
//           <h2>Recent Assignments</h2>
//           <div className="assignment-list">
//             {data.assignments.slice(0, 3).map(assignment => (
//               <div key={assignment.id} className="assignment-item">
//                 <div className="assignment-info">
//                   <h4>{assignment.title}</h4>
//                   <p>Due: {assignment.dueDate} • Subject: {assignment.subject}</p>
//                 </div>
//                 <span className={`status ${assignment.status.toLowerCase()}`}>{assignment.status}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Recent Submissions */}
//         <div className="recent-section">
//           <h2>Recent Submissions</h2>
//           <div className="submission-list">
//             {data.submissions.slice(0, 3).map(submission => (
//               <div key={submission.id} className="submission-item">
//                 <div className="submission-info">
//                   <h4>{submission.studentName}</h4>
//                   <p>{submission.assignment} • {submission.submittedAt}</p>
//                 </div>
//                 <span className={`grade ${submission.grade ? 'graded' : 'pending'}`}>
//                   {submission.grade || 'Pending'}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TeacherDashboard;

import React, { useEffect, useState } from 'react';

const TeacherDashboard = ({ currentUser }) => {
  const [dashboard, setDashboard] = useState({
    assignments: [],
    submissions: [],
    students: [],
    tests: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`http://localhost:5000/api/dashboard/teacher/${currentUser._id}`, {
          headers: { 'Content-Type': 'application/json' }
        });

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        console.log("Dashboard data:", data); // Check structure in console
        setDashboard(data);
      } catch (err) {
        console.error("Error fetching dashboard:", err);
        setError("Failed to load dashboard.");
      } finally {
        setLoading(false);
      }
    };

    if (currentUser?._id) fetchDashboard();
  }, [currentUser]);

  if (loading) return <p>Loading dashboard...</p>;
  if (error) return <p>{error}</p>;

  // Stats based on fetched data
  const stats = [
    { title: 'Active Tests', value: dashboard.tests?.filter(t => t.status === 'Published').length || 0, icon: '📋', color: 'green' },
    { title: 'Students', value: dashboard.students?.length || 0, icon: '👥', color: 'purple' },
    { title: 'Pending Reviews', value: dashboard.submissions?.filter(s => !s.grade).length || 0, icon: '⏰', color: 'orange' }
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Teacher Dashboard</h1>
        <p>Welcome back, {currentUser?.name}!</p>
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

      <div className="recent-section">
        <h2>Recent Assignments</h2>
        <div className="assignment-list">
          {dashboard.assignments?.length === 0 ? (
            <p>No assignments found.</p>
          ) : (
            dashboard.assignments.slice(0, 5).map(a => (
              <div key={a._id || a.id} className="assignment-item">
                <div className="assignment-info">
                  <h4>{a.title}</h4>
                  <p>Due: {a.dueDate} • Subject: {a.subject}</p>
                </div>
                <span className={`status ${a.status?.toLowerCase()}`}>{a.status}</span>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="recent-section">
        <h2>Recent Submissions</h2>
        <div className="submission-list">
          {dashboard.submissions?.length === 0 ? (
            <p>No submissions yet.</p>
          ) : (
            dashboard.submissions.slice(0, 5).map(s => (
              <div key={s._id || s.id} className="submission-item">
                <div className="submission-info">
                  <h4>{s.studentName}</h4>
                  <p>{s.assignment} • {s.submittedAt}</p>
                </div>
                <span className={`grade ${s.grade ? 'graded' : 'pending'}`}>{s.grade || 'Pending'}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
