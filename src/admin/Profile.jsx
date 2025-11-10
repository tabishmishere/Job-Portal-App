// src/admin/Profile.jsx
import React, { useEffect, useState } from "react";
import { updateRecruiterProfile } from "../api/recruiterApi";

const Profile = () => {
  const [form, setForm] = useState({ name: "", email: "" });
  const [file, setFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  // Load user data from localStorage on mount
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (user) {
      setForm({ name: user.name || "", email: user.email || "" });
      setAvatarPreview(user.profile?.avatar || null);
    }
  }, []);

  // Handle file change for avatar preview
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setAvatarPreview(URL.createObjectURL(selectedFile));
    }
  };

  // Save profile changes
  const handleSave = async () => {
    try {
      const updatedUser = await updateRecruiterProfile({
        name: form.name,
        email: form.email,
        avatarFile: file,
      });

      // Update local state & localStorage
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setForm({ name: updatedUser.name, email: updatedUser.email });
      setAvatarPreview(updatedUser.profile?.avatar || null);
      alert("Profile updated successfully");
    } catch (err) {
      alert(err);
      console.error("Error updating profile:", err);
    }
  };

  return (
    <div className="rounded-xl p-10 min-h-screen bg-[rgba(211,239,224,0.3)]">
      <h2 className="text-3xl mb-5 sm:text-4xl font-bold text-green-900">
        Recruiter Profile
      </h2>

      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-2xl p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              type="email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Avatar Upload */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profile Image
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-black"
            />
            {avatarPreview && (
              <img
                src={avatarPreview.startsWith("http") ? avatarPreview : `http://localhost:5000/api${avatarPreview}`}
                alt="avatar"
                className="mt-3 w-32 h-32 object-cover rounded-full border"
              />
            )}
          </div>

          {/* Save Button */}
          <div className="flex justify-start md:col-span-2">
            <button
              onClick={handleSave}
              className="bg-green-900 cursor-pointer text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-all"
            >
              Save Profile
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;
