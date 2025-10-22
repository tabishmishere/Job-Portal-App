import React, { useState } from "react";
import { IoPersonOutline } from "react-icons/io5";
import { GoBookmark } from "react-icons/go";
import { FaEye } from "react-icons/fa";
import { HiOutlinePencilAlt } from "react-icons/hi";
import tkxelLogo from "../assets/tkxel_logo.jpg";
import googleLogo from "../assets/google-logo.png";
import xevenLogo from "../assets/xeven-logo.jpg";
import dubizzleLogo from "../assets/dubizzle-logo.png";
import Sidebar from "./DashboardSidebar";

const AdminDashboard = () => {
  const [postedJobs, setPostJobs] = useState([
    {
      id: 1,
      title: "Full Stack Developer",
      type: "Full-time",
      location: "Pakistan",
      logo: tkxelLogo,
    },
    {
      id: 2,
      title: "QA Engineer",
      type: "Part-time",
      location: "USA",
      logo: googleLogo,
    },
    {
      id: 3,
      title: "Marketing Specialist",
      type: "Full-time",
      location: "Lahore",
      logo: dubizzleLogo,
    },
    {
      id: 4,
      title: "DevOps Engineer",
      type: "Full-time",
      location: "USA",
      logo: googleLogo,
    },
    {
      id: 5,
      title: "Product Designer",
      type: "Full-time",
      location: "Dubai",
      logo: xevenLogo,
    },
  ]);
  return (
    <div className="flex min-h-screen">
      <div className="w-64 h-full min-h-screen bg-white shadow-lg p-6 hidden md:block">
        <Sidebar/>
      </div>
      <div className="flex-1 p-8 bg-dashboard bg-[rgba(211,239,224,0.3)] rounded-xl shadow-lg mt-10 min-h-screen">
        {" "}
        {/* Dashboard Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-bold text-green-900">Dashboard</h2>
          <div className="flex space-x-4 items-center">
            <button className="bg-green-900 hover:bg-white hover:text-green-900 translate-all duration-300 cursor-pointer text-white font-semibold py-2 px-4 rounded-full shadow-sm">
              Post a Job
            </button>
          </div>
        </div>
        {/* Dashboard Stats */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-7 rounded-xl shadow-md flex items-center justify-around">
            <div className="flex flex-col">
              <h4 className="text-3xl font-bold text-gray-700">07</h4>
              <p className="text-sm text-gray-500">Posted Jobs</p>
            </div>
            <div className="bg-[#8EEC4E] text-white rounded-full p-3">
              <IoPersonOutline className="text-3xl" />
            </div>
          </div>
          <div className="bg-white p-7 rounded-xl shadow-md flex items-center justify-around">
            <div className="flex flex-col">
              <h4 className="text-3xl font-bold text-gray-700">03</h4>
              <p className="text-sm text-gray-500">Shortlisted</p>
            </div>
            <div className="bg-[#8EEC4E] text-white rounded-full p-3">
              <GoBookmark className="text-3xl" />
            </div>
          </div>

          <div className="bg-white p-7 rounded-xl shadow-md flex items-center justify-around">
            <div className="flex flex-col">
              <h4 className="text-3xl font-bold text-gray-700">1.7k</h4>
              <p className="text-sm text-gray-500">Applications</p>
            </div>
            <div className="bg-[#8EEC4E] text-white rounded-full p-3">
              <FaEye className="text-3xl" />
            </div>
          </div>

          <div className="bg-white p-7 rounded-xl shadow-md flex items-center justify-around">
            <div className="flex flex-col">
              <h4 className="text-3xl font-bold text-gray-700">04</h4>
              <p className="text-sm text-gray-500">Saved Candidates</p>
            </div>
            <div className="bg-[#8EEC4E] text-white rounded-full p-3">
              <HiOutlinePencilAlt className="text-3xl" />
            </div>
          </div>
        </div>
        <div className="flex gap-6 mb-8">
          {/* Job Views Graph */}
          <div className="bg-white p-4 rounded-lg shadow-sm w-2/3">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Job Views
            </h3>
            <div className="h-40 bg-gray-100 rounded-lg">
              <div className="flex justify-center items-center text-gray-500 h-full">
                <p>Coming soon....</p>
              </div>
            </div>
          </div>
          {/* Posted Job Section */}
          <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Posted Jobs
            </h3>

            <ul className="space-y-5">
              {postedJobs.map((job) => (
                <li key={job.id} className="flex items-center justify-between">
                  {/* Left: Icon + Job Info */}
                  <div className="flex items-center space-x-4">
                    <img
                      src={job.logo}
                      alt={job.title}
                      className="w-10 h-10 rounded-full object-contain"
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-gray-900">
                        {job.title}
                      </span>
                      <span className="text-xs text-gray-500">
                        {job.type}, {job.location}
                      </span>
                    </div>
                  </div>

                  {/* Right Menu Icon */}
                  <div className="text-gray-400 text-xl font-bold">⋯</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
