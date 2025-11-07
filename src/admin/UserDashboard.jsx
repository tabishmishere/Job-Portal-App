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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 py-12 px-6 md:px-12">
      {/* Header */}
      <header className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          Welcome Back,{" "}
          <span className="text-green-600">{user.name}!</span>
        </h1>
      </header>

      {/* User Info Card */}
      <div className="max-w-4xl mx-auto bg-white/60 backdrop-blur-xl border border-gray-200 rounded-3xl shadow-lg p-8 flex flex-col md:flex-row items-center md:items-start gap-6 hover:shadow-2xl transition-all">
        <div className="relative">
          <div className="absolute inset-0 rounded-full border-4 border-green-400 animate-pulse"></div>
          <img
            src={
              user.profile?.avatar
                ? `http://localhost:5000${user.profile.avatar}`
                : "/default-avatar.png"
            }
            alt="Profile"
            className="relative w-28 h-28 rounded-full border-4 border-green-500 shadow-md object-cover"
          />
        </div>

        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
          <p className="text-gray-500">{user.email}</p>
          <span className="inline-block mt-3 px-4 py-1 text-sm rounded-full bg-green-100 text-green-700 font-medium capitalize">
            {user.role}
          </span>
        </div>
      </div>

      {/* Dashboard Options */}
      <div className="max-w-4xl mx-auto mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Applied Jobs */}
        <div
          onClick={() => navigate("/user/applied-jobs")}
          className="bg-white/70 border border-gray-200 rounded-2xl p-8 flex flex-col items-center text-center hover:bg-green-50 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer"
        >
          <FiBriefcase className="text-green-600 text-4xl mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Applied Jobs
          </h3>
          <p className="text-gray-500 text-sm">
            View all the jobs you’ve applied for
          </p>
        </div>

        {/* Profile Settings */}
        <div
          onClick={() => navigate("/user/profilesetting")}
          className="bg-white/70 border border-gray-200 rounded-2xl p-8 flex flex-col items-center text-center hover:bg-green-50 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer"
        >
          <FiUser className="text-green-600 text-4xl mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Profile Settings
          </h3>
          <p className="text-gray-500 text-sm">
            Update your personal and professional details
          </p>
        </div>

        {/* Logout */}
        <div
          onClick={handleLogout}
          className="bg-gradient-to-br from-red-50 to-red-100 border border-red-200 rounded-2xl p-8 flex flex-col items-center text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer"
        >
          <FiLogOut className="text-red-500 text-4xl mb-4" />
          <h3 className="text-xl font-semibold text-red-600 mb-2">Logout</h3>
          <p className="text-gray-500 text-sm">Sign out of your account</p>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
