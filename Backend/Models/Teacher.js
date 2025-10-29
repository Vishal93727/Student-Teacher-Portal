import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  password: String,
  department: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Teacher", teacherSchema);
