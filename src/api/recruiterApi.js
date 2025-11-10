import axios from "axios";

const BASE_URL = "http://localhost:5000/api/recruiter";


const getToken = () => localStorage.getItem("token");


export const getRecruiterProfile = async () => {
  try {
    const token = getToken();
    const res = await axios.get(`${BASE_URL}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data.user;
  } catch (err) {
    console.error("getRecruiterProfile error:", err);
    throw err.response?.data?.message || err.message;
  }
};


export const updateRecruiterProfile = async ({ name, email, avatarFile }) => {
  try {
    const token = getToken();
    const fd = new FormData();
    if (name) fd.append("name", name);
    if (email) fd.append("email", email);
    if (avatarFile) fd.append("avatar", avatarFile);

    const res = await axios.put(`${BASE_URL}/profile`, fd, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data.user;
  } catch (err) {
    console.error("updateRecruiterProfile error:", err);
    throw err.response?.data?.message || err.message;
  }
};

export const getRecruiterDashboard = async () => {
  try {
    const token = getToken();
    const res = await axios.get(`${BASE_URL}/dashboard`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    console.error("getRecruiterDashboard error:", err);
    throw err.response?.data?.message || err.message;
  }
};
