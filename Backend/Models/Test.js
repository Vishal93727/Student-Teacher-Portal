// import mongoose from "mongoose";

// const questionSchema = new mongoose.Schema({
//   type: { type: String, required: true },
//   question: { type: String, required: true },
//   options: [String],
//   correctAnswer: String,
//   points: { type: Number, default: 1 }
// });

// const testSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: String,
//   duration: { type: Number, default: 30 },
//   attempts: { type: Number, default: 1 },
//   questions: [questionSchema],
//   status: { type: String, default: "Draft" },
//   createdAt: { type: Date, default: Date.now }
// });

// export default mongoose.model("Test", testSchema);


import mongoose from "mongoose";

// 🧩 Question Schema
const questionSchema = new mongoose.Schema({
  type: { type: String, required: true }, // e.g. "MCQ", "True/False", "Short Answer"
  question: { type: String, required: true },
  options: [String], // used if MCQ
  correctAnswer: String, // correct option or answer text
  points: { type: Number, default: 1 } // each question’s marks
});

// 🧠 Test Schema
const testSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  duration: { type: Number, default: 30 }, // in minutes
  attempts: { type: Number, default: 1 },
  status: { type: String, default: "Draft" },

  // ✅ Array of questions (embedded subdocument)
  questions: [questionSchema],

  // ✅ Automatically calculate total marks
  totalMarks: {
    type: Number,
    default: 0
  },

  // ✅ Optional field to link tests created by specific teacher
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher"
  },

  createdAt: { type: Date, default: Date.now }
});

// 🧮 Pre-save middleware to calculate total marks automatically
testSchema.pre("save", function (next) {
  if (this.questions && this.questions.length > 0) {
    this.totalMarks = this.questions.reduce((sum, q) => sum + (q.points || 1), 0);
  } else {
    this.totalMarks = 0;
  }
  next();
});

export default mongoose.model("Test", testSchema);
