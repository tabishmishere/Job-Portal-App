import axios from "axios";
import { getAuthConfig } from "./authConfig.js";
import { API_URL } from "./index.js"; 

const ADMIN_USERS = `${API_URL}/admin/users`;

export const fetchAdminProfile = async () => {
  const res = await axios.get(`${API_URL}/admin/profile`, getAuthConfig());
  return res.data;
};

export const updateAdminProfile = async (formData) => {
  const res = await axios.put(
    `${API_URL}/admin/profile`,
    formData,
    getAuthConfig(true) 
  );
  return res.data;
};

export const fetchAdminUsers = async () => {
  const res = await axios.get(ADMIN_USERS, getAuthConfig());
  return res.data;
};

export const updateUserRole = async (id, payload) => {
  const res = await axios.put(`${ADMIN_USERS}/${id}`, payload, getAuthConfig());
  return res.data;
};

export const deleteUser = async (id) => {
  const res = await axios.delete(`${ADMIN_USERS}/${id}`, getAuthConfig());
  return res.data;
};

export const fetchAllJobsAdmin = async () => {
  const res = await axios.get(`${API_URL}/jobs`, getAuthConfig()); 
  return res.data;
};

export const deleteJob = async (id) => {
  const res = await axios.delete(`${API_URL}/admin/jobs/${id}`, getAuthConfig());
  return res.data;
};

export const fetchDashboardStats = async () => {
  const { data } = await axios.get(`${API_URL}/admin/dashboard-stats`, getAuthConfig());
  return data; 
};


export const fetchRecentJobs = async (limit = 3) => {
  const { data } = await axios.get(`${API_URL}/admin/jobs/recent?limit=${limit}`, getAuthConfig());
  return data.jobs;
};

export const fetchRecentUsers = async (limit = 3) => {
  const { data } = await axios.get(`${API_URL}/admin/users/recent?limit=${limit}`, getAuthConfig());
  return data.users;
};


export const deleteJobById = async (id) => {
  await axios.delete(`${API_URL}/admin/jobs/${id}`, getAuthConfig());
};

export const deleteUserById = async (id) => {
  await axios.delete(`${API_URL}/admin/users/${id}`, getAuthConfig());
};