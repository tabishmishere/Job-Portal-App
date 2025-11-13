import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) navigate("/login");
    else setUser(storedUser);
  }, [navigate]);

  // Update user when localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const updatedUser = JSON.parse(localStorage.getItem("user"));
      setUser(updatedUser);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);
  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6 md:p-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
          Welcome,{" "}
          <span className="text-green-600">{user.name.split(" ")[0]}</span>
        </h1>
        <p className="text-gray-500 mt-2 text-lg">
          Manage your account, view applied jobs, and update your profile
          easily.
        </p>
      </div>

      {/* User Info Card */}
      <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-md rounded-2xl shadow-lg flex items-center space-x-6 p-6 mb-12 ">
        <img
          src={
            user.profile?.avatar
              ? `http://localhost:5000${user.profile.avatar}`
              : "/default-avatar.png"
          }
          alt="Profile"
          className="w-20 h-20 rounded-full border-2 border-green-500 hover:scale-105 transform transition-all cursor-pointer"
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
          <p className="text-gray-500">{user.email}</p>
          <p className="text-green-700 capitalize">{user.role}</p>
        </div>
      </div>

      {/* Dashboard Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Applied Jobs */}
        <div
          className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 cursor-pointer"
          onClick={() => navigate("/user/applied-jobs")}
        >
          <h3 className="text-xl font-semibold mb-2 text-gray-900">
            Applied Jobs
          </h3>
          <p className="text-gray-500">View all the jobs you applied for</p>
        </div>

        {/* Profile Settings */}
        <div
          className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 cursor-pointer"
          onClick={() => navigate("/user/profilesetting")}
        >
          <h3 className="text-xl font-semibold mb-2 text-gray-900">
            Profile Settings
          </h3>
          <p className="text-gray-500">Update your profile and personal info</p>
        </div>

        {/* Logout */}
        <div
          className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 cursor-pointer"
          onClick={() => {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            navigate("/login");
          }}
        >
          <h3 className="text-xl font-semibold mb-2 text-red-600">Logout</h3>
          <p className="text-gray-500">Sign out from your account</p>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
