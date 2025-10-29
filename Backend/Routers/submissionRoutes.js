// // import express from "express";
// // import { createSubmission, getSubmissions } from "../Controllers/submissionController.js";

// // const router = express.Router();
// // router.post("/", createSubmission);
// // router.get("/", getSubmissions);
// // export default router;

// import express from "express";
// import multer from "multer";
// import fs from "fs/promises"; // ✅ use promise-based fs
// import path from "path";
// import Submission from "../Models/Submission.js";
// import {  getSubmissions } from "../Controllers/submissionController.js";
// const router = express.Router();
// const upload = multer({ dest: "uploads/" });

// router.post("/", upload.single("file"), async (req, res) => {
//   try {
//     const { studentName, assignmentId } = req.body;
//     const file = req.file;

//     if (!file) {
//       return res.status(400).json({ message: "No file uploaded" });
//     }

//     const newPath = path.join("uploads", `${Date.now()}-${file.originalname}`);
//     await fs.rename(file.path, newPath); // ✅ now works fine

//     // Save in DB if needed
//     // await Submission.create({ studentName, assignmentId, filePath: newPath });
// const newSubmission = new Submission({
//       studentName,
//       assignmentId,
//       fileUrl: `/uploads/${req.file.filename}`,
//       submittedAt: new Date(),
//       status: "Submitted",
//     });

//     await newSubmission.save();
//     res.status(201).json({ message: "Submission saved successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });
// router.get("/", getSubmissions);
// export default router;

import express from "express";
import multer from "multer";
import fs from "fs/promises";
import path from "path";
import Submission from "../Models/Submission.js";
import { getSubmissions } from "../Controllers/submissionController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// 📘 POST: handle both assignment and test submissions
// router.post("/", upload.single("file"), async (req, res) => {
//   try {
//     const {
//       studentId,
//       studentName,
//       assignmentId,
//       testId,
//       answers, // for test submissions
//     } = req.body;

//     let fileUrl = null;

//     // ✅ If it's a file upload (assignment submission)
//     if (req.file) {
//       const newPath = path.join("uploads", `${Date.now()}-${req.file.originalname}`);
//       await fs.rename(req.file.path, newPath);
//       fileUrl = `/uploads/${req.file.filename}`;
//     }

//     // ✅ Create submission document
//     const newSubmission = new Submission({
//       studentId,
//       studentName,
//       assignment: assignmentId || null,
//       testId: testId || null,
//       fileUrl,
//       answers: answers ? JSON.parse(answers) : [],
//       submittedAt: new Date(),
//       status: "Submitted",
//     });

//     await newSubmission.save();

//     res.status(201).json({
//       success: true,
//       message: "Submission saved successfully",
//       submission: newSubmission,
//     });
//   } catch (error) {
//     console.error("❌ Error saving submission:", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });
// router.post("/", upload.single("file"), async (req, res) => {
//   try {
//     const {
//       studentId,
//       studentName,
//       assignmentId,
//       testId,
//       answers,
//     } = req.body;

//     if (!testId && !assignmentId) {
//       return res.status(400).json({ message: "No testId or assignmentId provided" });
//     }

//     // Handle file upload
//     let fileUrl = null;
//     if (req.file) {
//       const newFilename = `${Date.now()}-${req.file.originalname}`;
//       const newPath = path.join("uploads", newFilename);
//       await fs.rename(req.file.path, newPath);
//       fileUrl = `/uploads/${newFilename}`;
//     }

//     // Handle answers safely
//     let parsedAnswers;
//     if (answers) {
//       parsedAnswers = typeof answers === "string" ? JSON.parse(answers) : answers;
//     } else {
//       parsedAnswers = {};
//     }
// const newSubmission = new Submission({
//   studentId: studentId,  // required field
//   studentName,
//   assignment: assignmentId || null,
//   testId: testId || null,
//   fileUrl,
//   answers: parsedAnswers,
//   submittedAt: new Date(),
//   status: "Submitted",
// });

//     // const newSubmission = new Submission({
//     //   studentId: studentId || null,
//     //   studentName: studentName || "Anonymous",
//     //   assignment: assignmentId || null,
//     //   testId: testId || null,
//     //   fileUrl,
//     //   answers: parsedAnswers,
//     //   submittedAt: new Date(),
//     //   status: "Submitted",
//     // });

//     await newSubmission.save();

//     res.status(201).json({
//       success: true,
//       message: "Submission saved successfully",
//       submission: newSubmission,
//     });
//   } catch (error) {
//     console.error("❌ Error saving submission:", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });
router.post("/", upload.single("file"), async (req, res) => {
  try {
    const { studentId, studentName, assignmentId, testId, answers } = req.body;

    // Validate required fields
    if (!studentId || !studentName) {
      return res.status(400).json({ message: "studentId and studentName are required" });
    }

    // Validate ObjectId format
    if (!/^[0-9a-fA-F]{24}$/.test(studentId)) {
      return res.status(400).json({ message: "Invalid studentId format" });
    }

    if (!testId && !assignmentId) {
      return res.status(400).json({ message: "No testId or assignmentId provided" });
    }

    // File handling
    let fileUrl = null;
    if (req.file) {
      const newFilename = `${Date.now()}-${req.file.originalname}`;
      const newPath = path.join("uploads", newFilename);
      await fs.rename(req.file.path, newPath);
      fileUrl = `/uploads/${newFilename}`; // corrected fileUrl
    }

    // Parse answers safely
    let parsedAnswers = [];
    if (answers) {
      if (typeof answers === "string") {
        parsedAnswers = JSON.parse(answers);
      } else if (Array.isArray(answers)) {
        parsedAnswers = answers;
      } else {
        parsedAnswers = Object.values(answers);
      }
    }

    // Create submission
    const newSubmission = new Submission({
      studentId,
      studentName,
      assignment: assignmentId || null,
      testId: testId || null,
      fileUrl,
      answers: parsedAnswers,
      submittedAt: new Date(),
      status: "Submitted",
    });

    await newSubmission.save();

    res.status(201).json({
      success: true,
      message: "Submission saved successfully",
      submission: newSubmission,
    });
  } catch (error) {
    console.error("❌ Error saving submission:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});



// 📘 GET: all submissions
router.get("/", getSubmissions);

export default router;


