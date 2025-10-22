// DashboardSidebar.jsx
import React from "react";
import { FaUser, FaBriefcase, FaEnvelope, FaSignOutAlt } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { BiUserCircle, BiTrash } from "react-icons/bi";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="fixed h-full w-64 bg-white hidden md:flex flex-col justify-between">
      {/* User Info */}
      <div className="p-6 border-b">
        <div className="flex items-center space-x-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Muhammad Asad
            </h3>
            <span className="text-sm text-gray-500">Recruiter</span>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-4 text-gray-700 font-medium">
          <li>
            <Link
              to="/dashboard"
              className="flex items-center space-x-3 bg-green-900 text-white p-5 rounded-lg"
            >
              <FaUser className="text-lg" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className="flex items-center space-x-3 hover:text-green-600"
            >
              <BiUserCircle className="text-lg" />
              <span>My Profile</span>
            </Link>
          </li>
          <li>
            <Link
              to="/jobs"
              className="flex items-center space-x-3 hover:text-green-600"
            >
              <FaBriefcase className="text-lg" />
              <span>My Jobs</span>
            </Link>
          </li>
          <li>
            <Link
              to="/messages"
              className="flex items-center space-x-3 hover:text-green-600"
            >
              <FaEnvelope className="text-lg" />
              <span>Messages</span>
            </Link>
          </li>
          <li>
            <Link
              to="/settings"
              className="flex items-center space-x-3 hover:text-green-600"
            >
              <IoSettingsOutline className="text-lg" />
              <span>Account Settings</span>
            </Link>
          </li>
          <li>
            <Link
              to="/delete-account"
              className="flex items-center space-x-3 text-red-500 hover:text-red-700"
            >
              <BiTrash className="text-lg" />
              <span>Delete Account</span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t">
        <button className="flex items-center space-x-3 text-gray-700 hover:text-red-600 w-full">
          <FaSignOutAlt className="text-lg" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
