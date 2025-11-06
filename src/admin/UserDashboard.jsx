import React from "react";
import { useNavigate } from "react-router-dom";
import { FiBriefcase, FiUser, FiLogOut } from "react-icons/fi";

const UserDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    navigate("/login");
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-6 md:px-12">
      {/* Page Header */}
      <header className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          Dashboard <span className="text-green-600">.</span>
        </h1>
      </header>

      {/* User Info Card */}
      <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl shadow-md p-8 flex flex-col md:flex-row items-center md:items-start md:space-x-6 space-y-4 md:space-y-0">
        <img
          src={
            user.profile?.avatar
              ? `http://localhost:5000${user.profile.avatar}`
              : "/default-avatar.png"
          }
          alt="Profile"
          className="w-24 h-24 rounded-full border-4 border-green-500 shadow-md object-cover"
        />
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
          <p className="text-gray-500">{user.email}</p>
          <span className="inline-block mt-2 px-3 py-1 text-sm rounded-full bg-green-100 text-green-700 font-medium capitalize">
            {user.role}
          </span>
        </div>
      </div>

      {/* Dashboard Options */}
      <div className="max-w-4xl mx-auto mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Applied Jobs */}
        <div
          onClick={() => navigate("/user/applied-jobs")}
          className="bg-white/90 border border-gray-200 rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer"
        >
          <FiBriefcase className="text-green-600 text-3xl mb-3" />
          <h3 className="text-lg font-semibold text-gray-800 mb-1">Applied Jobs</h3>
          <p className="text-gray-500 text-sm">View all the jobs you applied for</p>
        </div>

        {/* Profile Settings */}
        <div
          onClick={() => navigate("/user/profilesetting")}
          className="bg-white/90 border border-gray-200 rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer"
        >
          <FiUser className="text-green-600 text-3xl mb-3" />
          <h3 className="text-lg font-semibold text-gray-800 mb-1">Profile Settings</h3>
          <p className="text-gray-500 text-sm">Update your personal and professional info</p>
        </div>

        {/* Logout */}
        <div
          onClick={handleLogout}
          className="bg-red-50 border border-red-200 rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer"
        >
          <FiLogOut className="text-red-500 text-3xl mb-3" />
          <h3 className="text-lg font-semibold text-red-600 mb-1">Logout</h3>
          <p className="text-gray-500 text-sm">Sign out from your account</p>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
