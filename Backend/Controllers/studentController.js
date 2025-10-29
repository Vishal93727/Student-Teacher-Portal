


import Student from "../Models/Student.js";

// Register a new student
export const registerStudent = async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.status(201).json({ success: true, student: newStudent });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to register student" });
  }
};

// Get all students
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch students" });
  }
};
export const createStudent = async (req, res) => {
  try {
    const student = new Student(req.body);
    const saved = await student.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getStudents = async (req, res) => {
  try {
    const data = await Student.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Filter students
export const filterStudents = async (req, res) => {
  try {
    const filters = req.query; // branch, department, year, semester, section
    const query = {};

    Object.keys(filters).forEach((key) => {
      if (filters[key]) query[key] = filters[key];
    });

    const students = await Student.find(query);
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ message: "Error filtering students" });
  }
};



