import React from "react";
import { FaTachometerAlt, FaUsers, FaBriefcase, FaUserShield } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AdminSidebar = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-green-900 text-white w-64 p-6 rounded-xl h-full flex flex-col justify-between">
      <div>
        <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
        <ul className="space-y-4">
          <li className="hover:bg-green-800 p-2 rounded-lg cursor-pointer flex items-center space-x-3">
            <FaTachometerAlt /> <span>Dashboard</span>
          </li>
          <li className="hover:bg-green-800 p-2 rounded-lg cursor-pointer flex items-center space-x-3">
            <FaUsers /> <span>Manage Users</span>
          </li>
          <li className="hover:bg-green-800 p-2 rounded-lg cursor-pointer flex items-center space-x-3">
            <FaBriefcase /> <span>Manage Jobs</span>
          </li>
          <li className="hover:bg-green-800 p-2 rounded-lg cursor-pointer flex items-center space-x-3">
            <FaUserShield /> <span>Settings</span>
          </li>
        </ul>
      </div>
      <div className="bg-white text-green-900 font-semibold py-2 px-4 rounded-lg hover:bg-green-100" 
      onClick={() => {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            navigate("/login");
          }}>
        <p>Logout</p>
      </div>
    </div>
  );
};

export default AdminSidebar;
