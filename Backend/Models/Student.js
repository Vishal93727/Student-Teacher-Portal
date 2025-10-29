// import mongoose from "mongoose";

// const studentSchema = new mongoose.Schema({
//   firstName: { type: String, required: true },
//   lastName: { type: String, required: true },
//   rollNumber: { type: String, required: true, unique: true },
//   email: { type: String, required: true },
//   phone: { type: String },
//   branch: { type: String },
//   department: { type: String },
//   year: { type: String },
//   semester: { type: String },
//   section: { type: String },
//   registeredAt: { type: Date, default: Date.now },
// });

// const Student = mongoose.model("Student", studentSchema);
// export default Student;


import { Schema, model } from "mongoose";

const studentSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    phone:{
      type: String,
      required: true
    } ,
    dateOfBirth:{
type: String,
      required: true
    },
    gender: {
type: String,
      required: true
    },
    bloodGroup:{
      type: String
    },
    nationality: { type: String, default: "Indian" },
    religion :{
      type: String
    },
    category:{
      type: String
    },
    rollNumber:{
      type: String
    },
    registrationNumber:{
      type: String
    },
    branch:{
      type: String
    },
    department:{
      type: String
    },
    year:{
      type: String
    },
    semester:{
      type: String
    },
role: { type: String, enum: ["student", "teacher"], required: true },


    isVerified: {
      type: Boolean,
      default: false
    },
    verificationToken: {
      type: String
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date
  },
  { timestamps: true }
);

const Student = model("Student", studentSchema);
export default Student;