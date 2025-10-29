// frontend/services/api.js
// import axios from "axios";

// const API = axios.create({ baseURL: "http://localhost:5000/api" });

// export const fetchAssignments = () => API.get("/assignments");
// export const createAssignment = (formData) =>
//   API.post("/assignments", formData, { headers: { "Content-Type": "multipart/form-data" } });
// export const updateAssignment = (id, formData) =>
//   API.put(`/assignments/${id}`, formData, { headers: { "Content-Type": "multipart/form-data" } });
// export const deleteAssignment = (id) => API.delete(`/assignments/${id}`);


import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const fetchAssignments = () => axios.get(`${API_URL}/assignments`);

export const createAssignment = (assignmentData) =>
  axios.post(`${API_URL}/assignments`, assignmentData);

export const updateAssignment = (id, data) =>
  axios.put(`${API_URL}/assignments/${id}`, data);

export const deleteAssignment = (id) =>
  axios.delete(`${API_URL}/assignments/${id}`);
