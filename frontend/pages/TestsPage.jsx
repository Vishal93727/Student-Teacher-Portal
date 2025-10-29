



// import React, { useEffect, useState } from "react";

// const TestsPage = () => {
//   const [tests, setTests] = useState([]);
//   const [activeTest, setActiveTest] = useState(null);
//   const [answers, setAnswers] = useState({});
//   const [timeLeft, setTimeLeft] = useState(0);
//   const [isTestActive, setIsTestActive] = useState(false);
//   const [showResult, setShowResult] = useState(false);
//   const [score, setScore] = useState(0);

//   useEffect(() => {
//     const fetchTests = async () => {
//       try {
//         const res = await fetch("http://localhost:5000/api/tests");
//         const data = await res.json();
//         setTests(Array.isArray(data) ? data : []);
//       } catch (err) {
//         console.error("Error fetching tests:", err);
//       }
//     };
//     fetchTests();
//   }, []);

//   // 🕒 Timer effect
//   useEffect(() => {
//     if (!isTestActive || timeLeft <= 0) return;

//     const timer = setInterval(() => {
//       setTimeLeft((prev) => {
//         if (prev <= 1) {
//           clearInterval(timer);
//           handleSubmit(); // auto submit
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [isTestActive, timeLeft]);

//   const startTest = (test) => {
//     setActiveTest(test);
//     setAnswers({});
//     setScore(0);
//     setShowResult(false);
//     setIsTestActive(true);
//     setTimeLeft(test.duration * 60);
//   };

//   const handleAnswerChange = (questionIndex, selectedOption) => {
//     setAnswers((prev) => ({
//       ...prev,
//       [questionIndex]: selectedOption,
//     }));
//   };

//   const handleSubmit = () => {
//     if (!activeTest) return;

//     let totalScore = 0;
//     activeTest.questions.forEach((q, i) => {
//       if (answers[i] === q.correctAnswer) totalScore += q.points || 1;
//     });

//     setScore(totalScore);
//     setIsTestActive(false);
//     setShowResult(true);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
//         🧩 Online Test Portal
//       </h1>

//       {/* ✅ Test List View */}
//       {!isTestActive && !showResult && (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {tests.map((test) => (
//             <div
//               key={test._id}
//               className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition-all border border-gray-200"
//             >
//               <h2 className="text-xl font-semibold text-gray-800 mb-2">
//                 {test.title}
//               </h2>
//               <p className="text-gray-600 mb-3">{test.description}</p>

//               <div className="flex justify-between text-sm text-gray-600 mb-4">
//                 <p>⏱ {test.duration} mins</p>
//                 <p>🎯 {test.questions?.length || 0} questions</p>
//               </div>

//               <button
//                 onClick={() => startTest(test)}
//                 className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all"
//               >
//                 Start Test
//               </button>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* 📝 Test Question Screen */}
//       {isTestActive && activeTest && (
//         <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-6 border border-gray-200">
//           <h2 className="text-2xl font-bold text-gray-800 mb-3">{activeTest.title}</h2>
//           <p className="text-gray-600 mb-2">⏱ Time Left: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}</p>
//           <p className="text-gray-500 mb-6">{activeTest.description}</p>

//           {activeTest.questions.map((q, index) => (
//             <div key={index} className="mb-6 border-b pb-4">
//               <h3 className="font-semibold text-gray-800 mb-2">
//                 Q{index + 1}. {q.question}
//               </h3>

//               {q.options?.map((opt, optIndex) => (
//                 <label key={optIndex} className="block text-gray-700 mb-1">
//                   <input
//                     type="radio"
//                     name={`question-${index}`}
//                     value={opt}
//                     checked={answers[index] === opt}
//                     onChange={() => handleAnswerChange(index, opt)}
//                     className="mr-2 accent-blue-600"
//                   />
//                   {opt || <span className="text-gray-400 italic">(true/false)</span>}
//                 </label>
//               ))}
//             </div>
//           ))}

//           <button
//             onClick={handleSubmit}
//             className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition-all"
//           >
//             Submit Test
//           </button>
//         </div>
//       )}

//       {/* 🏁 Result Summary Screen */}
//       {showResult && (
//         <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-lg border border-gray-200 text-center">
//           <h2 className="text-2xl font-bold text-green-600 mb-4">✅ Test Submitted</h2>
//           <p className="text-gray-700 text-lg mb-2">Your Score: <span className="font-bold text-blue-700">{score}</span></p>
//           <p className="text-gray-600 mb-6">
//             Total Questions: {activeTest.questions.length} | Duration: {activeTest.duration} mins
//           </p>

//           <button
//             onClick={() => {
//               setShowResult(false);
//               setActiveTest(null);
//             }}
//             className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all"
//           >
//             Back to Tests
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TestsPage;



import React, { useEffect, useState } from "react";

const styles = {
  page: {
    minHeight: "100vh",
    padding: 24,
    paddingTop: 110,
    background: "linear-gradient(#ffffff,#eaf3ff)",
  },
  container: { maxWidth: 900, margin: "0 auto" },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  title: { fontSize: 36, fontWeight: 800, color: "#2b6cb0" },
  card: {
    background: "#fff",
    borderRadius: 18,
    padding: 20,
    boxShadow: "0 6px 18px rgba(35,47,63,0.08)",
    border: "1px solid #edf2f7",
    display: "flex",
    justifyContent: "space-between",
    minHeight: 120,
    margin: 18,
  },
  left: { flex: 1, marginRight: 16 },
  titleCard: { fontSize: 22, fontWeight: 600, marginBottom: 8, color: "#2d3748" },
  desc: { color: "#4a5568", fontSize: 15, lineHeight: 1.4 },
  meta: { textAlign: "right", minWidth: 140, color: "#718096", fontSize: 14 },
  modalBackdrop: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.45)",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    padding: 16,
    zIndex: 50,
  },
  modal: {
    width: "100%",
    maxWidth: 800,
    background: "#fff",
    borderRadius: 18,
    padding: 20,
    maxHeight: "92vh",
    overflow: "auto",
  },
  label: { fontWeight: 600, color: "#2d3748", marginBottom: 6, display: "block" },
  dashed: {
    border: "2px dashed #c7d2fe",
    borderRadius: 12,
    padding: 14,
    textAlign: "center",
  },
  submitBtn: {
    width: "100%",
    marginTop: 16,
    padding: "12px 18px",
    background: "#4c51bf",
    color: "#fff",
    borderRadius: 12,
    fontWeight: 700,
    cursor: "pointer",
    border: "none",
  },
};

const TestsPage = () => {
  const [tests, setTests] = useState([]);
  const [activeTest, setActiveTest] = useState(null);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [isTestActive, setIsTestActive] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/tests");
        const data = await res.json();
        setTests(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching tests:", err);
      }
    };
    fetchTests();
  }, []);

  // Timer effect
  useEffect(() => {
    if (!isTestActive || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit(); // auto submit when time ends
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTestActive, timeLeft]);

  const startTest = (test) => {
    setActiveTest(test);
    setAnswers({});
    setScore(0);
    setShowResult(false);
    setIsTestActive(true);
    setTimeLeft(test.duration * 60);
  };

  const handleAnswerChange = (index, selectedOption) => {
    setAnswers((prev) => ({ ...prev, [index]: selectedOption }));
  };

  // const handleSubmit = () => {
  //   if (!activeTest) return;
  //   let totalScore = 0;
  //   activeTest.questions.forEach((q, i) => {
  //     if (answers[i] === q.correctAnswer) totalScore += q.points || 1;
  //   });
  //   setScore(totalScore);
  //   setIsTestActive(false);
  //   setShowResult(true);
  // };
 const handleSubmit = async () => {
  if (!activeTest) return;

  // Calculate score
  let totalScore = 0;
  activeTest.questions.forEach((q, i) => {
    if (answers[i] === q.correctAnswer) totalScore += q.points || 1;
  });
  setScore(totalScore);
  setIsTestActive(false);
  setShowResult(true);

  // Prepare payload
  const currentUser = JSON.parse(localStorage.getItem("user")); // make sure you store user after login
  
// Convert answers object to array of strings
  const answersArray = activeTest.questions.map((q, i) => answers[i] || "");
const payload = {
  studentId: currentUser._id,
  studentName: currentUser.name,
  testId: activeTest._id,
  answers: answersArray,
  score: totalScore,
  submittedAt: new Date().toISOString(),
};

  
  if (!currentUser || !currentUser._id || !currentUser.name) {
    alert(" Thank you for submissions....");
    return;
  }

  try {
    // Send POST request to backend
    const res = await fetch("http://localhost:5000/api/submissions", 
    {
      method: "POST",
  headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
      studentId: currentUser._id,
  studentName: currentUser.name,
  testId: activeTest._id,
  answers: answersArray,
  score: totalScore,
  submittedAt: new Date().toISOString(),
    
  }),
    });
    const result = await res.json();
    if (res.ok) {
      console.log("Test submitted successfully:", result);
      alert("Test submitted successfully!");
    } else {
      console.error("Error submitting test:", result);
      alert(result.message || "Error submitting test.");
    }
  } catch (err) {
    console.error("Error submitting test:", err);
    alert("Server error while submitting test.");
  }
};
  



  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>🧩 Online Test Portal</h1>
        </div>

        {/* ✅ Test List */}
        {!isTestActive && !showResult && (
          <div>
            {tests.map((test) => (
              <div key={test._id} style={styles.card}>
                <div style={styles.left}>
                  <div style={styles.titleCard}>{test.title}</div>
                  <div style={styles.desc}>{test.description}</div>
                </div>
                <div style={styles.meta}>
                  <p>⏱ {test.duration} mins</p>
                  <p>🎯 {test.questions?.length || 0} questions</p>
                  <button
                    onClick={() => startTest(test)}
                    style={{
                      ...styles.submitBtn,
                      marginTop: 10,
                      background: "#2b6cb0",
                    }}
                  >
                    Start Test
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 📝 Test Modal */}
        {isTestActive && activeTest && (
          <div style={styles.modalBackdrop}>
            <div style={styles.modal}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: "#2d3748", marginBottom: 10 }}>
                {activeTest.title}
              </h2>
              <p style={{ color: "#4a5568", marginBottom: 10 }}>
                ⏱ Time Left: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
              </p>
              <p style={{ color: "#718096", marginBottom: 20 }}>{activeTest.description}</p>

              {activeTest.questions.map((q, i) => (
                <div key={i} style={{ marginBottom: 20 }}>
                  <label style={styles.label}>
                    Q{i + 1}. {q.question}
                  </label>
                  <div style={styles.dashed}>
                    {q.options?.map((opt, j) => (
                      <div key={j}>
                        <label>
                          <input
                            type="radio"
                            name={`question-${i}`}
                            value={opt}
                            checked={answers[i] === opt}
                            onChange={() => handleAnswerChange(i, opt)}
                            style={{ marginRight: 8 }}
                          />
                          {opt || "(true/false)"}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <button onClick={handleSubmit} style={styles.submitBtn}>
                Submit Test
              </button>
            </div>
          </div>
        )}

        {/* 🏁 Result Summary */}
        {showResult && (
          <div style={{ ...styles.modal, textAlign: "center", marginTop: 50 }}>
            <h2 style={{ fontSize: 28, fontWeight: 700, color: "#38a169", marginBottom: 10 }}>
              ✅ Test Submitted
            </h2>
            <p style={{ fontSize: 18, color: "#2d3748" }}>
              Your Score: <b style={{ color: "#2b6cb0" }}>{score}</b>
            </p>
            <p style={{ color: "#718096", marginBottom: 20 }}>
              Total Questions: {activeTest.questions.length} | Duration: {activeTest.duration} mins
            </p>
            <button
              onClick={() => {
                setShowResult(false);
                setActiveTest(null);
              }}
              style={{ ...styles.submitBtn, background: "#2b6cb0" }}
            >
              Back to Tests
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestsPage;


