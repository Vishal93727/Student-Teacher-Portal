import { Schema, model } from "mongoose";

const userSchema = new Schema(
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

const User = model("User", userSchema);
export default User;


// const userSchema = new Schema(
//   {
//     firstName: { type: String, required: true },
//     lastName: { type: String, required: true },
//     name: { type: String }, // optional, combined
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     phone: String,
//     dateOfBirth: String,
//     gender: String,
//     bloodGroup: String,
//     nationality: { type: String, default: "Indian" },
//     religion: String,
//     category: String,
//     rollNumber: String,
//     registrationNumber: String,
//     branch: String,
//     department: String,
//     year: String,
//     semester: String,
//     batchYear: Number,
//     section: String,

//     permanentAddress: {
//       street: String,
//       city: String,
//       state: String,
//       pincode: String,
//       country: { type: String, default: "India" }
//     },
//     currentAddress: {
//       street: String,
//       city: String,
//       state: String,
//       pincode: String,
//       country: { type: String, default: "India" }
//     },
//     sameAsPermanent: { type: Boolean, default: false },

//     fatherName: String,
//     motherName: String,
//     guardianName: String,
//     parentPhone: String,
//     parentEmail: String,
//     parentOccupation: String,
//     emergencyContact: {
//       name: String,
//       relation: String,
//       phone: String
//     },

//     previousEducation: {
//       schoolName: String,
//       board: String,
//       passingYear: String,
//       percentage: String,
//       subjects: String
//     },

//     hobbies: [String],
//     skills: [String],

//     isVerified: { type: Boolean, default: false },
//     verificationToken: String,
//     resetPasswordToken: String,
//     resetPasswordExpires: Date
//   },
//   { timestamps: true }
// );

// const User = model("User", userSchema);
// module.exports = User;
