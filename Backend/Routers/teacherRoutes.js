// backend/routes/teacherRoutes.js
import express from "express";
import Assignment from "../Models/Assignment.js";
import Test from "../Models/Test.js";
import Submission from "../Models/Submission.js";

const router = express.Router();

// Create Assignment
router.post("/assignment", async (req, res) => {
  try {
    const assignment = await Assignment.create(req.body);
    res.status(201).json(assignment);
  } catch (err) {
    res.status(500).json({ message: "Error creating assignment" });
  }
});

// Get All Assignments
router.get("/assignments", async (req, res) => {
  try {
    const list = await Assignment.find();
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: "Error fetching assignments" });
  }
});

// Create Test
router.post("/test", async (req, res) => {
  try {
    const test = await Test.create(req.body);
    res.status(201).json(test);
  } catch (err) {
    res.status(500).json({ message: "Error creating test" });
  }
});

// Get Submissions (for teacher)
router.get("/submissions", async (req, res) => {
  try {
    const list = await Submission.find().populate("student assignment");
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: "Error fetching submissions" });
  }
});

export default router;
