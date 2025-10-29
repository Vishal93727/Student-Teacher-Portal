// import React, { useEffect, useState } from "react";

// const StudentAssignments = ({ currentUser }) => {
//   const [assignments, setAssignments] = useState([]);
// useEffect(() => {
//   fetch("http://localhost:5000/api/assignments")
//     .then(res => res.json())
//     .then(data => {
//       const activeAssignments = data.filter(a => a.status === "Active");
//       setAssignments(activeAssignments);
//     })
//     .catch(err => console.error(err));
// }, []);

  

//   return (
//     <div className="assignments-page">
//       <h1>📘 My Assignments</h1>
//       {assignments.length > 0 ? (
//         assignments.map(sub => (
//           <div key={sub._id} className="assignment-card">
//             <h3>{sub.assignmentId.title}</h3>
//             <p>Submitted: {new Date(sub.submittedAt).toDateString()}</p>
//             <p>Status: {sub.grade ? `Graded (${sub.grade})` : "Pending"}</p>
//           </div>
//         ))
//       ) : (
//         <p>No assignments submitted yet.</p>
//       )}
//     </div>
//   );
// };

// import React, { useEffect, useState } from "react";

// const StudentAssignments = ({ currentUser }) => {
//   const [assignments, setAssignments] = useState([]);
//   const [selectedAssignment, setSelectedAssignment] = useState(null);
//   const [submissionFile, setSubmissionFile] = useState(null);
//   const [submitting, setSubmitting] = useState(false);

//   // Fetch all assignments
//   // Fetch all assignments
//   useEffect(() => {
//     fetch("http://localhost:5000/api/assignments")
//       .then(res => res.json())
//       .then(data => {
//         // Show both Draft + Active
//         const visibleAssignments = data.filter(a =>
//           ["Active", "Draft"].includes(a.status)
//         );
//         setAssignments(visibleAssignments);
//       })
//       .catch(err => console.error("Error fetching assignments:", err));
//   }, []);

//   // Submit assignment
//   const handleSubmit = async (assignmentId) => {
//     if (!submissionFile) {
//       alert("Please upload your assignment file!");
//       return;
//     }

//     setSubmitting(true);
//     const formData = new FormData();
//     formData.append("studentName", currentUser?.name);
//     formData.append("assignmentId", assignmentId);
//     formData.append("file", submissionFile);

//     try {
//       const res = await fetch("http://localhost:5000/api/submissions", {
//         method: "POST",
//         body: formData,
//       });
//       const data = await res.json();

//       if (res.ok) {
//         alert("✅ Assignment submitted successfully!");
//         setSelectedAssignment(null);
//         setSubmissionFile(null);
//       } else {
//         alert(data.error || "❌ Submission failed.");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("❌ Network error submitting assignment.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
//       <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-10 tracking-wide">
//         📘 My Assignments
//       </h1>

//       {/* Assignment Grid */}
//       <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
// {assignments.map((a) => (
//     <div
//       key={a._id}
//       onClick={() => setSelectedAssignment(a)}
//       className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:border-indigo-400 transition-all duration-300 p-6 cursor-pointer flex flex-col justify-between"
//     >
//       <div>
//         <div className="flex justify-between items-center mb-3">
//           <h3 className="text-2xl font-semibold text-gray-800">
//             {a.title}
//           </h3>
//           <span
//             className={`px-3 py-1 text-sm font-medium rounded-full ${
//               a.subject === "Mathematics"
//                 ? "bg-blue-100 text-blue-700"
//                 : a.subject === "Science"
//                 ? "bg-green-100 text-green-700"
//                 : "bg-purple-100 text-purple-700"
//             }`}
//           >
//             {a.subject}
//           </span>
//         </div>

//         <p className="text-gray-600 text-base mb-4 break-words">
//           {a.description}
//         </p>
//       </div>

//       <div className="flex justify-between items-center text-sm text-gray-500 mt-auto">
//         <p>📅 {new Date(a.dueDate).toDateString()}</p>
//         <p>🏆 {a.totalMarks} Marks</p>
//       </div>
//     </div>
//   ))}
//       </div>


//       {/* Assignment Modal */}
// {/* Assignment Modal */}
// {selectedAssignment && (
//   <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-1">
//     <div className="bg-white rounded-3xl shadow-2xl w-full sm:w-3/4 md:w-2/3 lg:w-1/2 p-8 relative overflow-y-auto max-h-[90vh]">
//       <button
//         onClick={() => setSelectedAssignment(null)}
//         className="absolute top-3 right-5 text-gray-400 hover:text-red-500 text-2xl"
//       >
//         ✖
//       </button>

//       <h2 className="text-3xl font-bold text-indigo-700 mb-6">
//         {selectedAssignment.title}
//       </h2>

//       <div className="space-y-3 text-gray-700 text-base leading-relaxed">
//         <p>
//           <strong className="text-gray-900">Subject:</strong>{" "}
//           {selectedAssignment.subject}
//         </p>
//         <p>
//           <strong className="text-gray-900">Description:</strong>{" "}
//           {selectedAssignment.description}
//         </p>
//         <p>
//           <strong className="text-gray-900">Instructions:</strong>{" "}
//           {selectedAssignment.instructions || "—"}
//         </p>
//         <p>
//           <strong className="text-gray-900">Due Date:</strong>{" "}
//           {new Date(selectedAssignment.dueDate).toDateString()}
//         </p>
//         <p>
//           <strong className="text-gray-900">Total Marks:</strong>{" "}
//           {selectedAssignment.totalMarks}
//         </p>
//       </div>

//       {/* Upload Section */}
//       <div className="mt-8">
//         <label className="block text-gray-700 font-medium mb-3 text-lg">
//           Upload Your Work
//         </label>

//         <div className="border-2 border-dashed border-indigo-300 rounded-xl p-5 text-center hover:bg-indigo-50 transition">
//           <input
//             type="file"
//             onChange={(e) => setSubmissionFile(e.target.files[0])}
//             className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 cursor-pointer"
//           />
//           {submissionFile && (
//             <p className="mt-2 text-sm text-gray-500 truncate">
//               📎 {submissionFile.name}
//             </p>
//           )}
//         </div>
//       </div>

//       <button
//         onClick={() => handleSubmit(selectedAssignment._id)}
//         disabled={submitting}
//         className={`w-full mt-8 py-3 text-lg font-semibold rounded-xl text-white transition-all ${
//           submitting
//             ? "bg-gray-400 cursor-not-allowed"
//             : "bg-indigo-600 hover:bg-indigo-700"
//         }`}
//       >
//         {submitting ? "Submitting..." : "Submit Assignment"}
//       </button>
//     </div>
//   </div>
// )}

//     </div>
//   );
// };

// export default StudentAssignments;

// // export default StudentAssignments;


import React, { useEffect, useState } from "react";

const styles = {
  page: { minHeight: "100vh", padding: 24, paddingTop: 110, background: "linear-gradient(#ffffff,#eaf3ff)" },
  container: { maxWidth: 900, margin: "20 auto" },
  header: { display: "flex", alignItems: "center", gap: 16, marginBottom: 20 },
  title: { fontSize: 36, fontWeight: 800, color: "#2b6cb0" },
  card: { background: "#fff", borderRadius: 18, padding: 20, boxShadow: "0 6px 18px rgba(35,47,63,0.08)", border: "1px solid #edf2f7", display: "flex", justifyContent: "space-between", minHeight: 120, margin: 18 },
  left: { flex: 1, marginRight: 16 },
  titleCard: { fontSize: 22, fontWeight: 600, marginBottom: 8 },
  desc: { color: "#4a5568", fontSize: 15, lineHeight: 1.4 },
  meta: { textAlign: "right", minWidth: 140, color: "#718096", fontSize: 14 },
  modalBackdrop: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", justifyContent: "center", alignItems: "flex-end", padding: 16, zIndex: 50 },
  modal: { width: "100%", maxWidth: 800, background: "#fff", borderRadius: 18, padding: 20, maxHeight: "92vh", overflow: "auto" },
  label: { fontWeight: 600, color: "#2d3748", marginBottom: 6, display: "block" },
  dashed: { border: "2px dashed #c7d2fe", borderRadius: 12, padding: 14, textAlign: "center" },
  submitBtn: { width: "100%", marginTop: 16, padding: "12px 18px", background: "#4c51bf", color: "#fff", borderRadius: 12, fontWeight: 700, cursor: "pointer", border: "none" }
};

export default function StudentAssignmentsInline({ currentUser }) {
  const [assignments, setAssignments] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [submissionFile, setSubmissionFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
useEffect(() => {
    fetch("http://localhost:5000/api/assignments")
      .then(res => res.json())
      .then(data => {
        // Show both Draft + Active
        const visibleAssignments = data.filter(a =>
          ["Active", "Draft"].includes(a.status)
        );
        setAssignments(visibleAssignments);
      })
      .catch(err => console.error("Error fetching assignments:", err));
  }, []);
  

  const handleSubmit = async (id) => {
    if (!submissionFile) return alert("Add file");
    setSubmitting(true);
    const fd = new FormData();
    fd.append("studentName", currentUser?.name || "Student");
    fd.append("assignmentId", id);
    fd.append("file", submissionFile);
    try {
      const res = await fetch("http://localhost:5000/api/submissions", 
      {
      method: "POST",
      body: fd,
    });
      const json = await res.json();
      if (res.ok) {
        alert("Submitted");
        setSelectedAssignment(null);
        setSubmissionFile(null);
      } else alert(json.error || "error");
    } catch (e) { console.error(e); alert("network"); }
    setSubmitting(false);
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <div style={{ width: 56, height: 56, borderRadius: 8, background: "#e6f0ff", display: "flex", alignItems: "center", justifyContent: "center" }}>📘</div>
          <h1 style={styles.title}>My Assignments</h1>
        </div>

        {assignments.length === 0 && <div style={{ textAlign: "center", padding: 40, background: "#fff", borderRadius: 12 }}>No assignments</div>}

        {assignments.map(a => (
          <div key={a._id} style={styles.card} onClick={() => setSelectedAssignment(a)}>
            <div style={styles.left}>
              <div style={styles.titleCard}>{a.title}</div>
              <div style={styles.desc}>{a.description}</div>
            </div>
            <div style={styles.meta}>
              <div>📅 {a.dueDate ? new Date(a.dueDate).toDateString() : "-"}</div>
              <div style={{ marginTop: 8 }}>🏆 {a.totalMarks ?? 0} Marks</div>
              <div style={{ marginTop: 12, color: "#5b21b6", fontWeight: 600 }}>{a.subject}</div>
            </div>
          </div>
        ))}
      </div>

      {selectedAssignment && (
        <div style={styles.modalBackdrop}>
          <div style={styles.modal}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
              <h2 style={{ margin: 0 }}>{selectedAssignment.title}</h2>
              <button onClick={() => setSelectedAssignment(null)} style={{ background: "transparent", border: "none", fontSize: 20 }}>✖</button>
            </div>

            <div style={{ marginTop: 12 }}>
              <div style={styles.label}>Subject</div>
              <div>{selectedAssignment.subject}</div>

              <div style={{ marginTop: 10 }}>
                <div style={styles.label}>Description</div>
                <div>{selectedAssignment.description}</div>
              </div>

              <div style={{ marginTop: 10 }}>
                <div style={styles.label}>Instructions</div>
                <div>{selectedAssignment.instructions || "-"}</div>
              </div>

              <div style={{ marginTop: 14 }}>
                <div style={styles.label}>Upload your work</div>
                <div style={styles.dashed}>
                  <input type="file" onChange={(e) => setSubmissionFile(e.target.files[0])} />
                  {submissionFile && <div style={{ marginTop: 8 }}>{submissionFile.name}</div>}
                </div>
              </div>

              <button style={styles.submitBtn} onClick={() => handleSubmit(selectedAssignment._id)} disabled={submitting}>
                {submitting ? "Submitting..." : "Submit Assignment"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
