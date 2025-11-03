import React, { useState } from "react";
import { IoPersonOutline } from "react-icons/io5";
import { GoBookmark } from "react-icons/go";
import { FaEye } from "react-icons/fa";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { MdOutlineWorkOutline, MdDeleteOutline } from "react-icons/md";
import { FaUsersCog } from "react-icons/fa";
import { BsBriefcase } from "react-icons/bs";
import Sidebar from "./AdminSidebar";
import tkxelLogo from "../assets/tkxel_logo.jpg";
import googleLogo from "../assets/google-logo.png";
import xevenLogo from "../assets/xeven-logo.jpg";
import dubizzleLogo from "../assets/dubizzle-logo.png";

const AdminDashboard = () => {
  // Mock Data — Replace with API later
  const [jobs, setJobs] = useState([
    { id: 1, title: "Frontend Developer", company: "Tkxel", logo: tkxelLogo },
    { id: 2, title: "Backend Developer", company: "Google", logo: googleLogo },
    { id: 3, title: "Marketing Lead", company: "Dubizzle", logo: dubizzleLogo },
  ]);

  const [users, setUsers] = useState([
    { id: 1, name: "Ali Khan", role: "User" },
    { id: 2, name: "Sara Ahmed", role: "Recruiter" },
    { id: 3, name: "John Doe", role: "User" },
  ]);

  const handleDeleteJob = (id) => {
    setJobs(jobs.filter((job) => job.id !== id));
    alert("Job deleted successfully");
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
    alert("User deleted successfully");
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="min-h-screen p-6 hidden md:block rounded-xl mt-10">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 bg-[rgba(211,239,224,0.3)] rounded-xl shadow-lg mt-10 min-h-screen">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-bold text-green-900">Admin Dashboard</h2>
          <div className="flex space-x-4 items-center">
            <button className="bg-green-900 hover:bg-white hover:text-green-900 transition-all duration-300 cursor-pointer text-white font-semibold py-2 px-4 rounded-full shadow-sm">
              Add Admin
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-7 rounded-xl shadow-md flex items-center justify-around">
            <div className="flex flex-col">
              <h4 className="text-3xl font-bold text-gray-700">125</h4>
              <p className="text-sm text-gray-500">Total Users</p>
            </div>
            <div className="bg-[#8EEC4E] text-white rounded-full p-3">
              <IoPersonOutline className="text-3xl" />
            </div>
          </div>

          <div className="bg-white p-7 rounded-xl shadow-md flex items-center justify-around">
            <div className="flex flex-col">
              <h4 className="text-3xl font-bold text-gray-700">32</h4>
              <p className="text-sm text-gray-500">Recruiters</p>
            </div>
            <div className="bg-[#8EEC4E] text-white rounded-full p-3">
              <FaUsersCog className="text-3xl" />
            </div>
          </div>

          <div className="bg-white p-7 rounded-xl shadow-md flex items-center justify-around">
            <div className="flex flex-col">
              <h4 className="text-3xl font-bold text-gray-700">45</h4>
              <p className="text-sm text-gray-500">Job Posts</p>
            </div>
            <div className="bg-[#8EEC4E] text-white rounded-full p-3">
              <BsBriefcase className="text-3xl" />
            </div>
          </div>

          <div className="bg-white p-7 rounded-xl shadow-md flex items-center justify-around">
            <div className="flex flex-col">
              <h4 className="text-3xl font-bold text-gray-700">1.2k</h4>
              <p className="text-sm text-gray-500">Applications</p>
            </div>
            <div className="bg-[#8EEC4E] text-white rounded-full p-3">
              <FaEye className="text-3xl" />
            </div>
          </div>
        </div>

        {/* Management Sections */}
        <div className="grid grid-cols-2 gap-6">
          {/* Manage Jobs */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Manage Jobs</h3>
              <button className="bg-green-900 text-white py-1 px-3 rounded-lg hover:bg-green-700 text-sm">
                View All
              </button>
            </div>

            <ul className="space-y-4">
              {jobs.map((job) => (
                <li
                  key={job.id}
                  className="flex items-center justify-between border-b pb-3"
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={job.logo}
                      alt={job.title}
                      className="w-10 h-10 rounded-full object-contain"
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-gray-900">
                        {job.title}
                      </span>
                      <span className="text-xs text-gray-500">{job.company}</span>
                    </div>
                  </div>

                  <div className="flex space-x-3 text-gray-600">
                    <HiOutlinePencilAlt className="cursor-pointer hover:text-green-700" />
                    <MdDeleteOutline
                      className="cursor-pointer hover:text-red-600"
                      onClick={() => handleDeleteJob(job.id)}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Manage Users */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Manage Users</h3>
              <button className="bg-green-900 text-white py-1 px-3 rounded-lg hover:bg-green-700 text-sm">
                View All
              </button>
            </div>

            <ul className="space-y-4">
              {users.map((user) => (
                <li
                  key={user.id}
                  className="flex items-center justify-between border-b pb-3"
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-100 text-green-800 font-bold rounded-full w-10 h-10 flex items-center justify-center">
                      {user.name.charAt(0)}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-gray-900">
                        {user.name}
                      </span>
                      <span className="text-xs text-gray-500">{user.role}</span>
                    </div>
                  </div>

                  <div className="flex space-x-3 text-gray-600">
                    <HiOutlinePencilAlt className="cursor-pointer hover:text-green-700" />
                    <MdDeleteOutline
                      className="cursor-pointer hover:text-red-600"
                      onClick={() => handleDeleteUser(user.id)}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Placeholder for Analytics */}
        <div className="bg-white p-6 mt-8 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Analytics Overview
          </h3>
          <div className="h-40 bg-gray-100 rounded-lg flex justify-center items-center text-gray-500">
            <p>Analytics Graph Coming Soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
