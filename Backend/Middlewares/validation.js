export const validateAssignment = (req, res, next) => {
  const { title, subject, dueDate, totalMarks } = req.body;
  if (!title || !subject || !dueDate || !totalMarks) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  next();
};
