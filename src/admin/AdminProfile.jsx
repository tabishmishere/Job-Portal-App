import React, { useEffect, useState } from "react";
import { fetchAdminProfile, updateAdminProfile } from "../api/adminApi.js";
import { API_URL } from "../api/index.js";

const AdminProfile = () => {
  const [admin, setAdmin] = useState(null);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await fetchAdminProfile();
        setAdmin(res.admin);
        setName(res.admin.name);
        setPreview(res.admin.profile?.avatar || "");
      } catch (err) {
        console.error("Failed to fetch admin profile:", err);
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append("name", name);
  if (avatar) formData.append("avatar", avatar); 

  try {
    const res = await updateAdminProfile(formData);
    setAdmin(res.admin);
    setPreview(res.admin.profile?.avatar || ""); 
    alert("Profile updated successfully!");
  } catch (err) {
    console.error(err);
    alert("Failed to update profile");
  }
};



  if (loading) return <div className="p-10 text-center">Loading profile...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-green-900 mb-6">Admin Profile</h1>

      <div className="bg-white shadow rounded-lg p-6 max-w-md mx-auto">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col items-center">
            <img
              src={
                preview
                  ? `${API_URL}${preview}`
                  : "https://cdn-icons-png.flaticon.com/512/2202/2202112.png"
              }
              alt="Avatar"
              className="w-24 h-24 rounded-full border-4 border-green-400 object-cover mb-3"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setAvatar(file);
                  setPreview(URL.createObjectURL(file));
                }
              }}
              className="text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-900 text-white py-2 rounded-md hover:bg-green-800 transition"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminProfile;
