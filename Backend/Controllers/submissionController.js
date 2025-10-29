import Submission from "../Models/Submission.js";

export const createSubmission = async (req, res) => {
  try {
    const submission = new Submission(req.body);
    const saved = await submission.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getSubmissions = async (req, res) => {
  try {
    const data = await Submission.find()
      .populate("student assignment teacher");
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
