import axios from "axios";
import { getAuthConfig } from "./authConfig.js";

const API_URL = "http://localhost:5000/api/applications";

// Apply to a job (POST /api/applications/:jobId)
export const applyToJob = async (jobId) => {
  const res = await axios.post(`${API_URL}/${jobId}`, {}, getAuthConfig());
  return res.data;
};

// Get recruiter applications (GET /api/applications/recruiter)
export const getRecruiterApplications = async () => {
  const res = await axios.get(`${API_URL}/recruiter`, getAuthConfig());
  return res.data;
};

// Update application status (PUT /api/applications/:id/status)
export const updateApplicationStatus = async (id, status) => {
  const res = await axios.put(`${API_URL}/${id}/status`, { status }, getAuthConfig());
  return res.data;
};
