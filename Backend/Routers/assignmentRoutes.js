// backend/routes/assignmentRoutes.js
import express from "express";
import multer from "multer";
import {
  createAssignment,
  getAssignments,
  getAssignmentById,
  updateAssignment,
  deleteAssignment,
} from "../Controllers/assignmentController.js";
import Assignment from "../Models/Assignment.js";

const router = express.Router();

// File upload setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// Routes
router.post("/", upload.array("attachments"), createAssignment);
//router.get("/", getAssignments);
router.get("/:id", getAssignmentById);
router.put("/:id", upload.array("attachments"), updateAssignment);
router.delete("/:id", deleteAssignment);
// ✅ Fetch all assignments (for students)
router.get("/", async (req, res) => {
  try {
    const assignments = await Assignment.find();
    res.json(assignments);
  } catch (err) {
    console.error("Error fetching assignments:", err);
    res.status(500).json({ error: "Failed to fetch assignments" });
  }
});

// ✅ Fetch assignments by teacher
router.get("/teacher/:name", async (req, res) => {
  try {
    const assignments = await Assignment.find({ createdBy: req.params.name });
    res.json(assignments);
  } catch (err) {
    console.error("Error fetching teacher assignments:", err);
    res.status(500).json({ error: "Failed to fetch teacher assignments" });
  }
});

// ✅ Create a new assignment
router.post("/", async (req, res) => {
  try {
    const newAssignment = new Assignment(req.body);
    await newAssignment.save();
    res.status(201).json({ message: "Assignment created successfully", newAssignment });
  } catch (err) {
    console.error("Error creating assignment:", err);
    res.status(500).json({ error: "Failed to create assignment" });
  }
});

export default router;





