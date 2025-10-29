import Test from "../Models/Test.js";

// Create a new test
export const createTest = async (req, res) => {
  try {
    const test = new Test(req.body);
    const savedTest = await test.save();
    res.status(201).json(savedTest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all tests
export const getTests = async (req, res) => {
  try {
    const tests = await Test.find().sort({ createdAt: -1 });
    res.json(tests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get test by ID
export const getTestById = async (req, res) => {
  try {
    const test = await Test.findById(req.params.id);
    if (!test) return res.status(404).json({ message: "Test not found" });
    res.json(test);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update test
export const updateTest = async (req, res) => {
  try {
    const updated = await Test.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete test
export const deleteTest = async (req, res) => {
  try {
    await Test.findByIdAndDelete(req.params.id);
    res.json({ message: "Test deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
