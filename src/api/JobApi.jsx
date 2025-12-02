import axios from "axios";
const API_URL = "http://localhost:5000/api/jobs";

const getAuthConfig = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    },
  };
};

// Get all jobs (public)
export const getAllJobs = async () => {
  const res = await axios.get(API_URL, getAuthConfig());
  return res.data; // { success: true, jobs: [...] }
};

// Get recruiter (my) jobs
export const getRecruiterJobs = async () => {
  const res = await axios.get(`${API_URL}/my-jobs`, getAuthConfig());
  return res.data; // { success: true, jobs: [...] }
};

// Get single job
export const getJobById = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`, getAuthConfig());
  return res.data;
};

// Create job
export const createJob = async (jobData) => {
  const res = await axios.post(API_URL, jobData, getAuthConfig());
  return res.data;
};

// Update job
export const updateJob = async (id, jobData) => {
  const res = await axios.put(`${API_URL}/${id}`, jobData, getAuthConfig());
  return res.data;
};

// Delete job
export const deleteJob = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`, getAuthConfig());
  return res.data;
};
