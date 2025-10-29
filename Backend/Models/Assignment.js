// // backend/models/Assignment.js
// import mongoose from "mongoose";

// const assignmentSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: String,
//   subject: { type: String, required: true },
//   dueDate: { type: Date, required: true },
//   createdDate: { type: Date, default: Date.now },
//   status: { type: String, enum: ["Draft", "Active", "Closed"], default: "Draft" },
//   totalMarks: { type: Number, required: true },
//   submissionType: { type: String, enum: ["file", "text", "both"], default: "file" },
//   instructions: String,
//   attachments: [String],
// });

// export default mongoose.model("Assignment", assignmentSchema);


// import mongoose from "mongoose";

// // const assignmentSchema = new mongoose.Schema({
// //   title: { type: String, required: true },
// //   description: String,
// //   subject: String,
// //   dueDate: Date,
// //   totalMarks: Number,
// //   submissionType: String,
// //   instructions: String,
// //   status: { type: String, default: "Pending" },
// //   attachments: [String],
// //   createdDate: { type: Date, default: Date.now },
// // });
// // 🧩 Assignment Schema (created by teachers)
// const assignmentSchema = new mongoose.Schema({
//   title: String,
//   description: String,
//   subject: String,
//   dueDate: Date,
//   totalMarks: Number,
//   instructions: String,
//   status: String,
//   createdBy: String, // teacher name or ID
// });
// const Assignment = mongoose.model("Assignment", assignmentSchema);
// export default Assignment;

import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  title: String,
  description: String,
  subject: String,
  dueDate: Date,
  totalMarks: Number,
  submissionType: String,
  instructions: String,
  status: { type: String, default: "Draft" },
  createdDate: { type: Date, default: Date.now },
  createdBy: { type: String }, // Teacher name
});

const Assignment = mongoose.model("Assignment", assignmentSchema);
 export default Assignment;
