import React, { useState } from "react";
import { IoPersonOutline } from "react-icons/io5";
import { GoBookmark } from "react-icons/go";
import { FaEye } from "react-icons/fa";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { MdDeleteOutline } from "react-icons/md";
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
      <div className="hidden md:block rounded-xl min-h-screen p-6">
        <Sidebar />
      </div>

      {/* Main Dashboard */}
      <div className="flex-1 p-8 bg-[rgba(211,239,224,0.3)] rounded-xl shadow-lg min-h-screen">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-4xl font-bold text-green-900">Admin Dashboard</h2>
          <button className= "bg-green-900 cursor-pointer hover:bg-white hover:text-green-900 transition-all duration-300 text-white font-semibold py-2 px-6 rounded-full shadow-md">
            Add Admin
          </button>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-4 gap-6 mb-10">
          <div className="bg-white p-7 rounded-xl shadow-md flex items-center justify-between hover:shadow-lg transition-all">
            <div>
              <h4 className="text-3xl font-bold text-gray-700">125</h4>
              <p className="text-sm text-gray-500">Total Users</p>
            </div>
            <div className="bg-[#8EEC4E] text-white rounded-full p-3">
              <IoPersonOutline className="text-3xl" />
            </div>
          </div>

          <div className="bg-white p-7 rounded-xl shadow-md flex items-center justify-between hover:shadow-lg transition-all">
            <div>
              <h4 className="text-3xl font-bold text-gray-700">32</h4>
              <p className="text-sm text-gray-500">Recruiters</p>
            </div>
            <div className="bg-[#8EEC4E] text-white rounded-full p-3">
              <FaUsersCog className="text-3xl" />
            </div>
          </div>

          <div className="bg-white p-7 rounded-xl shadow-md flex items-center justify-between hover:shadow-lg transition-all">
            <div>
              <h4 className="text-3xl font-bold text-gray-700">45</h4>
              <p className="text-sm text-gray-500">Job Posts</p>
            </div>
            <div className="bg-[#8EEC4E] text-white rounded-full p-3">
              <BsBriefcase className="text-3xl" />
            </div>
          </div>

          <div className="bg-white p-7 rounded-xl shadow-md flex items-center justify-between hover:shadow-lg transition-all">
            <div>
              <h4 className="text-3xl font-bold text-gray-700">1.2k</h4>
              <p className="text-sm text-gray-500">Applications</p>
            </div>
            <div className="bg-[#8EEC4E] text-white rounded-full p-3">
              <FaEye className="text-3xl" />
            </div>
          </div>
        </div>

        {/* Management Sections */}
        <div className="grid grid-cols-2 gap-8">
          {/* Manage Jobs */}
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800">
                Manage Jobs
              </h3>
              <button className="text-sm bg-green-900 text-white py-1 px-4 rounded-full hover:bg-green-700 transition-all">
                View All
              </button>
            </div>

            <ul className="space-y-4">
              {jobs.map((job) => (
                <li
                  key={job.id}
                  className="flex items-center justify-between border-b pb-3 hover:bg-gray-50 transition-all rounded-lg px-2"
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={job.logo}
                      alt={job.title}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">
                        {job.title}
                      </p>
                      <p className="text-xs text-gray-500">{job.company}</p>
                    </div>
                  </div>
                  <div className="flex space-x-3 text-gray-500">
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
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800">
                Manage Users
              </h3>
              <button className="text-sm bg-green-900 text-white py-1 px-4 rounded-full hover:bg-green-700 transition-all">
                View All
              </button>
            </div>

            <ul className="space-y-4">
              {users.map((user) => (
                <li
                  key={user.id}
                  className="flex items-center justify-between border-b pb-3 hover:bg-gray-50 transition-all rounded-lg px-2"
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-100 text-green-800 font-bold rounded-full w-10 h-10 flex items-center justify-center">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500">{user.role}</p>
                    </div>
                  </div>
                  <div className="flex space-x-3 text-gray-500">
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

        {/* Analytics Section */}
        {/* <div className="bg-white p-6 mt-10 rounded-2xl shadow-md hover:shadow-lg transition-all">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Analytics Overview
          </h3>
          <div className="h-44 bg-gray-100 rounded-lg flex justify-center items-center text-gray-500">
            <p>Analytics Graph Coming Soon...</p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default AdminDashboard;
