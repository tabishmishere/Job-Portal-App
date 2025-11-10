import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/login");
    } else {
      setUser(storedUser);
    }
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
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900">User Dashboard</h1>
      </div>

      {/* User Info Card */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8 flex items-center space-x-6">
        <img src={
                  user.profile?.avatar
                  ? `http://localhost:5000${user.profile.avatar}`
                  : "/default-avatar.png"
              }
                  alt="Profile"
                  className="w-10 h-10 rounded-full cursor-pointer"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
            />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
          <p className="text-gray-500">{user.email}</p>
          <p className="text-gray-500 capitalize">{user.role}</p>
        </div>
      </div>

      {/* Dashboard Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Applied Jobs */}
        <div
          className="bg-white p-6 rounded-xl shadow-md cursor-pointer hover:shadow-lg transition duration-200"
          onClick={() => navigate("/user/applied-jobs")}
        >
          <h3 className="text-xl font-semibold mb-2">Applied Jobs</h3>
          <p className="text-gray-500">View all the jobs you applied for</p>
        </div>

        {/* Profile Settings */}
        <div
          className="bg-white p-6 rounded-xl shadow-md cursor-pointer hover:shadow-lg transition duration-200"
          onClick={() => navigate("/user/profilesetting")}
        >
          <h3 className="text-xl font-semibold mb-2">Profile Settings</h3>
          <p className="text-gray-500">Update your profile and personal info</p>
        </div>

        {/* Account Actions */}
        <div
          className="bg-white p-6 rounded-xl shadow-md cursor-pointer hover:shadow-lg transition duration-200"
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
