// import Assignment from "../Models/Assignment.js";
// import Submission from "../Models/Submission.js";
// import Student from "../Models/Student.js";
// import Test from "../Models/Test.js";

// export const getTeacherDashboard = async (req, res) => {
//   try {
//     const teacherId = req.params.id;

//     const [assignments, submissions, students, tests] = await Promise.all([
//       Assignment.find({ teacher: teacherId }),
//       Submission.find({ teacher: teacherId }),
//       Student.find(),
//       Test.find()
//     ]);

//     const stats = {
//       activeTests: tests.filter(t => t.status === "Published").length,
//       studentCount: students.length,
//       pendingReviews: submissions.filter(s => !s.grade).length
//     };

//     res.json({
//       stats,
//       assignments,
//       submissions,
//       students,
//       tests
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// backend/Controllers/dashboardController.js
import Assignment from "../Models/Assignment.js";
import Submission from "../Models/Submission.js";
import Student from "../Models/Student.js";
import Test from "../Models/Test.js";

export const getTeacherDashboard = async (req, res) => {
  try {
    const teacherId = req.params.id;
    console.log("📘 Fetching dashboard for teacher:", teacherId);

    // Fetch in parallel
    const [assignments, submissions, students, tests] = await Promise.all([
      Assignment.find({ teacher: teacherId }),
      Submission.find({ teacher: teacherId }),
      Student.find(),
      Test.find(),
    ]);

    const stats = {
      activeTests: tests.filter((t) => t.status === "Published").length,
      studentCount: students.length,
      pendingReviews: submissions.filter((s) => !s.grade).length,
    };

    return res.status(200).json({
      success: true,
      stats,
      assignments,
      submissions,
      students,
      tests,
    });
  } catch (error) {
    console.error("❌ Dashboard fetch error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

