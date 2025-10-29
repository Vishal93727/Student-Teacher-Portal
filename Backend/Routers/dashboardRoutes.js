import express from "express";
import { getTeacherDashboard } from "../Controllers/dashboardController.js";
import { getStudentDashboard } from "../Controllers/studentDashboardController.js";
const router = express.Router();
router.get("/teacher/:id", getTeacherDashboard);
router.get("/student/:id", getStudentDashboard);
export default router;




