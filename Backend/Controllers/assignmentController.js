// backend/controllers/assignmentController.js
import Assignment from "../Models/Assignment.js";

// Create new assignment
export const createAssignment = async (req, res) => {
  try {
    const { title, description, subject, dueDate, totalMarks, submissionType, instructions, status } = req.body;
    const attachments = req.files ? req.files.map(file => file.filename) : [];
    const assignment = new Assignment({
      title,
      description,
      subject,
      dueDate,
      totalMarks,
      submissionType,
      instructions,
      status,
      attachments,
    });
    await assignment.save();
    res.status(201).json(assignment);
  } catch (error) {
    res.status(500).json({ message: "Error creating assignment", error });
  }
};

// Get all assignments
export const getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find().sort({ createdDate: -1 });
    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching assignments", error });
  }
};

// Get single assignment by ID
export const getAssignmentById = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) return res.status(404).json({ message: "Assignment not found" });
    res.status(200).json(assignment);
  } catch (error) {
    res.status(500).json({ message: "Error fetching assignment", error });
  }
};

// Update assignment
export const updateAssignment = async (req, res) => {
  try {
    const updatedData = req.body;
    if (req.files && req.files.length > 0) {
      updatedData.attachments = req.files.map(file => file.filename);
    }
    const assignment = await Assignment.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    if (!assignment) return res.status(404).json({ message: "Assignment not found" });
    res.status(200).json(assignment);
  } catch (error) {
    res.status(500).json({ message: "Error updating assignment", error });
  }
};

// Delete assignment// assignmentController.js
export const deleteAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) return res.status(404).json({ success: false, message: 'Assignment not found' });

    await assignment.remove();
    res.json({ success: true, message: 'Assignment deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

