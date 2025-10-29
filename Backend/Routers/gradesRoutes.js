import express from "express";
import Submission from "../Models/Submission.js";
import Test from "../Models/Test.js";
import User from "../Models/user.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    console.log("📘 Fetching submissions...");
    const submissions = await Submission.find()
  .populate("student")  // ✅ matches field name in schema
  .populate("testId");  // ✅ if testId exists in your Submission schema


    console.log(`✅ Found ${submissions.length} submissions`);

    const calculatedGrades = await Promise.all(
      submissions.map(async (sub, index) => {
        console.log(`➡️ Processing submission ${index + 1}:`, sub._id);

        if (!sub.testId) {
          console.log("⚠️ Missing testId for submission:", sub._id);
          return {
            studentName: sub.studentId?.name || "Unknown",
            assignmentId: { title: "Unknown Test" },
            grade: "Pending",
          };
        }

        const test = await Test.findById(sub.testId);
        if (!test) {
          console.log("❌ Test not found for testId:", sub.testId);
          return {
            studentName: sub.studentId?.name || "Unknown",
            assignmentId: { title: "Missing Test Data" },
            grade: "Pending",
          };
        }

        console.log(`🧩 Comparing answers for test: ${test.title}`);

        if (!Array.isArray(test.questions) || test.questions.length === 0) {
          console.log("⚠️ No questions found in test:", test._id);
          return {
            studentName: sub.studentId?.name || "Unknown",
            assignmentId: { title: test.title },
            grade: "Pending",
          };
        }

        const totalQuestions = test.questions.length;
        let correctCount = 0;

        for (let i = 0; i < totalQuestions; i++) {
          const correct = test.questions[i]?.correctOption;
          const answer = sub.answers?.[i];
          if (correct === answer) correctCount++;
        }

        const percentage = (correctCount / totalQuestions) * 100 || 0;

        let grade;
        if (percentage >= 90) grade = "A+";
        else if (percentage >= 80) grade = "A";
        else if (percentage >= 70) grade = "B+";
        else if (percentage >= 60) grade = "B";
        else if (percentage >= 50) grade = "C";
        else grade = "F";

        console.log(`✅ Calculated grade: ${grade} (${percentage.toFixed(2)}%)`);

        return {
          studentName: sub.studentId?.name || "Unknown",
          assignmentId: { title: test.title },
          grade,
          percentage: percentage.toFixed(2),
        };
      })
    );

    res.json(calculatedGrades);
  } catch (error) {
    console.error("❌ Error calculating grades:", error);
    res.status(500).json({ message: "Failed to calculate grades" });
  }
});

export default router;
