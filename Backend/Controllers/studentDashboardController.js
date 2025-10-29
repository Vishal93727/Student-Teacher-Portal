// backend/controllers/studentDashboardController.js
import Assignment from "../Models/Assignment.js";
import Test from "../Models/Test.js";
import Submission from "../Models/Submission.js";
import Student from "../Models/Student.js";
import mongoose from "mongoose";
/**
 * Convert letter-grade or numeric to a numeric score (0–100).
 * Supports: numeric strings, numbers, and common letter grades.
 */
function gradeToNumber(grade) {
  if (grade === null || grade === undefined || grade === "") return null;

  // numeric grade (string or number)
  const num = Number(grade);
  if (!isNaN(num)) return num;

  // letter grade mapping approximate (you can tune to your scale)
  const map = {
    "A+": 97, "A": 93, "A-": 90,
    "B+": 87, "B": 83, "B-": 80,
    "C+": 77, "C": 73, "C-": 70,
    "D+": 67, "D": 63, "D-": 60,
    "F": 50
  };
  return map[grade] ?? null;
}

/**
 * Convert numeric (0-100) back to a letter grade (approx).
 */
function numberToLetterGrade(num) {
  if (num === null || num === undefined) return "N/A";
  if (num >= 97) return "A+";
  if (num >= 93) return "A";
  if (num >= 90) return "A-";
  if (num >= 87) return "B+";
  if (num >= 83) return "B";
  if (num >= 80) return "B-";
  if (num >= 77) return "C+";
  if (num >= 73) return "C";
  if (num >= 70) return "C-";
  if (num >= 60) return "D";
  return "F";
}

export const getStudentDashboard = async (req, res) => {
  try {
    const studentId = req.params.id;
    // ✅ Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).json({ message: "Invalid student ID" });
    }
    // Validate ObjectId
if (!/^[0-9a-fA-F]{24}$/.test(studentId)) {
  return res.status(400).json({ message: "Invalid student ID" });
}
    const student = await Student.findById(studentId).lean();
    if (!student) return res.status(404).json({ message: "Student not found" });

    // Load all assignments, tests, submissions related
    const [assignments, tests, submissions] = await Promise.all([
      Assignment.find().lean(),
      Test.find().lean(),
      Submission.find({ student: studentId }).lean()
    ]);

    // Identify submissions by assignment id for quick lookup
    const submittedAssignmentIds = new Set(
      submissions.map(s => String(s.assignment))
    );

    // Pending assignments = assignments that are Active (or not Closed) AND not submitted by this student
    const now = new Date();
    const pendingAssignments = assignments
      .filter(a => {
        // a.dueDate might be stored as string or Date — attempt to parse
        let due = a.dueDate ? new Date(a.dueDate) : null;
        const isActive = !a.status || String(a.status).toLowerCase().includes("active") || a.status === "Active";
        const notSubmitted = !submittedAssignmentIds.has(String(a._id ?? a.id));
        // show only not past due
        const notPastDue = !due || due >= now;
        return isActive && notSubmitted && notPastDue;
      })
      .map(a => ({
        id: a._id ?? a.id,
        title: a.title,
        dueDate: a.dueDate,
        subject: a.subject,
        status: a.status
      }));

    // Upcoming tests: Published and date in future
    const upcomingTests = tests
      .filter(t => {
        const isPublished = t.status && String(t.status).toLowerCase() === "published";
        const testDate = t.date ? new Date(t.date) : null;
        const inFuture = !testDate || testDate >= now;
        return isPublished && inFuture;
      })
      .map(t => ({
        id: t._id ?? t.id,
        title: t.title,
        date: t.date,
        duration: t.duration,
        questions: t.questions?.length ?? t.questions
      }));

    // Recent grades: sort student's submissions by submittedAt desc
    const recentSubmissions = submissions
      .sort((a,b) => new Date(b.submittedAt) - new Date(a.submittedAt))
      .slice(0, 10) // limit to last 10
      .map(s => ({
        id: s._id ?? s.id,
        assignment: s.assignment,
        studentName: s.studentName || `${student.firstName ?? student.name ?? ""} ${student.lastName ?? ""}`.trim(),
        submittedAt: s.submittedAt,
        grade: s.grade,
        remarks: s.remarks || s.feedback || ""
      }));

    // Average grade calculation
    const numericGrades = submissions
      .map(s => gradeToNumber(s.grade))
      .filter(g => g !== null);
    const averageGradeNumber = numericGrades.length > 0
      ? Math.round(numericGrades.reduce((a,b)=>a+b,0) / numericGrades.length)
      : null;
    const averageGrade = averageGradeNumber !== null ? numberToLetterGrade(averageGradeNumber) : "N/A";

    // Days to nearest deadline: find min (dueDate - now)
    const futureDueDates = assignments
      .map(a => ({ id: a._id ?? a.id, dueDate: a.dueDate ? new Date(a.dueDate) : null }))
      .filter(a => a.dueDate && a.dueDate >= now);

    let daysToNearestDeadline = null;
    if (futureDueDates.length > 0) {
      const diffs = futureDueDates.map(d => Math.ceil((d.dueDate - now) / (1000 * 60 * 60 * 24)));
      daysToNearestDeadline = Math.min(...diffs);
    }

    const stats = {
      pendingAssignmentsCount: pendingAssignments.length,
      upcomingTestsCount: upcomingTests.length,
      averageGrade,
      daysToNearestDeadline
    };

    res.json({
      student: {
        id: student._id ?? student.id,
        name: student.firstName ? `${student.firstName} ${student.lastName || ""}`.trim() : (student.name || ""),
        email: student.email,
        rollNumber: student.rollNumber,
      },
      stats,
      pendingAssignments,
      upcomingTests,
      recentSubmissions
    });
  } catch (err) {
    console.error("student dashboard error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


