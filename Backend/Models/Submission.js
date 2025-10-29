import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
  student: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Student", 
    required: true 
  },
  
  studentName: { 
    type: String, 
    required: true 
  },
  
  teacher: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Teacher" 
  },

  // ✅ Assignment Reference (if it's an assignment submission)
  assignment: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Assignment" 
  },

  // ✅ Test Reference (if it's a test submission)
  testId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Test" 
  },

  // ✅ Student answers (used for grading)
  answers: [{
    type: [String], // or [Number] if you store answer indices
    questionId: String,
      selectedOption: String,
      isCorrect: Boolean,
    default: [],
  }],
status: { type: String, default: "Submitted" },
  // ✅ Auto-calculated grade after comparing answers
  grade: { 
    type: String, 
    default: null 
  },

  percentage: { 
    type: Number, 
    default: 0 
  },

  submittedAt: { 
    type: Date, 
    default: Date.now 
  }
});

export default mongoose.model("Submission", submissionSchema);



// import express from "express";
// import multer from "multer";
// import path from "path";
// import Submission from "../Models/Submission.js";

// const router = express.Router();

// // Multer storage setup
// const storage = multer.diskStorage({
//   destination: "./uploads/",
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// const upload = multer({ storage });

// // ✅ Submit assignment
// router.post("/", upload.single("file"), async (req, res) => {
//   try {
//     const { studentName, assignmentId } = req.body;

//     const newSubmission = new Submission({
//       studentName,
//       assignmentId,
//       fileUrl: `/uploads/${req.file.filename}`,
//       submittedAt: new Date(),
//       status: "Submitted",
//     });

//     await newSubmission.save();
//     res.status(201).json({ message: "Assignment submitted successfully" });
//   } catch (err) {
//     console.error("Error saving submission:", err);
//     res.status(500).json({ error: "Failed to save submission" });
//   }
// });

// export default router;


// import express from "express";
// import multer from "multer";
// import fs from "fs/promises"; // ✅ use promise-based fs
// import path from "path";
// import Submission from "../Models/Submission.js";
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

// export default router;
