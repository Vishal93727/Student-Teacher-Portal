// const express=require("express");
// const {userRegistration,userLogin, userPasswordForget, userPasswordReset,userVerifyEmail,userLogout}=require("../Controllers/controllers-user");
// const authMiddleware=require('../Middlewares/authMiddleware')



// const authRouter=express.Router();
// authRouter.post('/register',userRegistration);
// authRouter.post('/login',userLogin);
// authRouter.post('/forget-password',userPasswordForget);
// authRouter.post('/reset-password/:token',userPasswordReset);
// authRouter.post('/verify-email/:token',userVerifyEmail);
// authRouter.post('/logout',authMiddleware,userLogout);
// module.exports=authRouter;
import express from "express";
import userController from "../Controllers/userControllers.js";
import authMiddleware from "../Middlewares/authMiddleware.js";

const {
  userRegistration,
  userLogin,
  userPasswordForget,
  userPasswordReset,
  userVerifyEmail,
  userLogout,
  getProfile,
  getGrades,
  getStudentAssignments,
} = userController;

const authRouter = express.Router();

// Routes
//authRouter.post("/register/student", userRegistration);
authRouter.post("/register", userRegistration);
authRouter.post("/login", userLogin);
authRouter.post("/forget-password", userPasswordForget);
authRouter.post("/reset-password/:token", userPasswordReset);
authRouter.post("/verify-email/:token", userVerifyEmail);
authRouter.post("/logout", authMiddleware, userLogout);

// Profile
authRouter.get("/profile/:userId", getProfile);

// Student-specific data
authRouter.get("/student-assignments/:studentName", getStudentAssignments);
authRouter.get("/grades", getGrades);

export default authRouter;

