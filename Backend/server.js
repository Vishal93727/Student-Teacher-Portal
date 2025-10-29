import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import database from './config/database.js';
import assignmentRoutes from "./Routers/assignmentRoutes.js";
import testRoutes from "./Routers/testRoutes.js";
import submissionRoutes from "./Routers/submissionRoutes.js";
import studentRoutes from "./Routers/studentRoutes.js";
import usersRoutes from "./Routers/usersRoutes.js";
import gradesRoutes from "./Routers/gradesRoutes.js";
import dashboardRoutes from "./Routers/dashboardRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app=express();

import fs from "fs";

if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

// 
//middlewares
app.use(express.json());
app.use(cors({
  origin:process.env.CLIENT_URL || "http://localhost:5173", ///provide fronyend domain
  credentials:true,  //allow cookies
  method:['GET','POST','PUT','DELETE'], //allowed method
  allowedHeaders:[
    'Content-Type',
    'Authorization'
    ]  //alloe headers
  
  }));
app.use(cookieParser());

//Application Routing
import authRoutes from "./Routers/authRoutes.js";
app.use('/api/auth',authRoutes)
app.use("/api/assignments", assignmentRoutes);
app.use("/api/tests", testRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/users", usersRoutes);
app.use("/api/grades", gradesRoutes);
// Health Check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});
//Listining
const PORT=process.env.PORT ||5000;
app.listen(PORT,async()=>{
  console.log(`Server running on port http://localhost:${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || "development"}`);
  await database();
})




//server.js
//server.js
// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from "dotenv";

// import authRoutes from "./Routers/authRoutes.js";
// //import userRoutes from "./Routers/userRoutes.js";
// import assignmentRoutes from "./Routers/assignmentRoutes.js";
// import testRoutes from "./Routers/testRoutes.js";
// import submissionRoutes from "./Routers/submissionRoutes.js";
// import studentRoutes from "./Routers/studentRoutes.js";
// import dashboardRoutes from "./Routers/dashboardRoutes.js";
// import cookieParser from "cookie-parser";
// dotenv.config();

// const app = express();

// // Middleware
// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL || "http://localhost:5173",
//     credentials: true,
    
//   method:['GET','POST','PUT','DELETE'], //allowed method
//   allowedHeaders:[
//     'Content-Type',
//     'Authorization'
//     ]  //alloe headers
  
//   })
// );
// app.use(cookieParser());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use("/uploads", express.static("uploads"));

// // Database Connection
// mongoose
//   .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/eduportal", {
    
//   })
//   .then(() => console.log("✅ MongoDB Connected Successfully"))
//   .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// // Routes
// app.use("/api/v1/auth", authRoutes);
// //app.use("/api/users", userRoutes);
// app.use("/api/assignments", assignmentRoutes);
// app.use("/api/tests", testRoutes);
// app.use("/api/submissions", submissionRoutes);
// app.use("/api/students", studentRoutes);
// app.use("/api/dashboard", dashboardRoutes);

// // Health Check
// app.get("/api/health", (req, res) => {
//   res.status(200).json({
//     status: "OK",
//     message: "Server is running",
//     timestamp: new Date().toISOString(),
//   });
// });

// // Error Handling Middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(err.status || 500).json({
//     success: false,
//     message: err.message || "Internal Server Error",
//     ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
//   });
// });

// // 404 Handler
// app.use((req, res) => {
//   res.status(404).json({
//     success: false,
//     message: "Route not found",
//   });
// });

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
//   console.log(`📍 Environment: ${process.env.NODE_ENV || "development"}`);
// });

// export default app;








