

import express from "express";
import {
  registerStudent,
  getAllStudents,
  filterStudents,
  createStudent,
  getStudents,
} from "../Controllers/studentController.js";

const router = express.Router();

router.post("/", registerStudent);
router.get("/", getAllStudents);
router.get("/filter", filterStudents);
router.post("/", createStudent);
router.get("/", getStudents);
export default router;
