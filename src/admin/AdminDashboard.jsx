import React, { useState } from "react";
import { IoPersonCircleSharp } from "react-icons/io5";
import { TbSquaresSelected } from "react-icons/tb";
import { FaEye } from "react-icons/fa";
import { HiOutlinePencilAlt } from "react-icons/hi";

const AdminDashboard = () => {
  const [postedJobs, setPostJobs] = useState([
    {
      id: 1,
      title: "Full Stack Developer",
      type: "Full-time",
      location: "Pakistan",
    },
    {
      id: 2,
      title: "QA Engineer",
      type: "Part-time",
      location: "USA",
    },
    {
      id: 3,
      title: "Outbound Call Service",
      type: "Full-time",
      location: "USA",
    },
    {
      id: 4,
      title: "Product Designer",
      type: "Full-time",
      location: "Dubai",
    },
    {
      id: 5,
      title: "Marketing Specialist",
      type: "Full-time",
      location: "USA",
    },
  ]);
  return (
    <div className="flex-1 p-8 bg-dashboard  rounded-xl shadow-lg mt-10 ml-64 min-h-screen">
      {" "}
      {/* Dashboard Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-green-900">Dashboard</h2>
        <div className="flex space-x-4 items-center">
          <button className="bg-green-900 text-white py-2 px-4 rounded-full shadow-sm">
            Post a Job
          </button>
        </div>
      </div>
      {/* Dashboard Stats */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-5 rounded-xl shadow-sm flex items-center justify-around">
          <div>
            <h4 className="text-2xl font-bold text-gray-700">07</h4>
            <p className="text-sm text-gray-500">Posted Jobs</p>
          </div>
          <IoPersonCircleSharp className="text-5xl text-green-900" />
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm flex items-center justify-around">
          <div>
            <h4 className="text-2xl font-bold text-gray-700">03</h4>
            <p className="text-sm text-gray-500">Shorlisted</p>
          </div>
          <TbSquaresSelected className="text-5xl text-green-900" />
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm flex items-center justify-around">
          <div>
            <h4 className="text-2xl font-bold text-gray-700">1.7k</h4>
            <p className="text-sm text-gray-500">Applications</p>
          </div>
          <FaEye className="text-5xl text-green-900" />
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm flex items-center justify-around">
          <div>
            <h4 className="text-2xl font-bold text-gray-700">04</h4>
            <p className="text-sm text-gray-500">Saved Candidates</p>
          </div>
          <HiOutlinePencilAlt className="text-5xl text-green-900" />
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

        {/* Posted Jobs */}
        <div className="bg-white p-6 rounded-xl shadow-sm w-1/3">
          <h3 className="text-xl font-semibold text-green-800 mb-6">
            Posted Jobs
          </h3>
          <hr className="mb-6" />
          <ul className="space-y-5">
            {postedJobs.map((job) => (
              <li
                key={job.id}
                className="flex justify-between items-start border-b last:border-b-0 pb-4"
              >
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-900">
                    {job.title}
                  </span>
                  <span className="text-sm text-gray-500">
                    {job.type}, {job.location}
                  </span>
                </div>

                {/* Menu Icon Text */}
                <div className="text-gray-400 text-xl font-bold">⋯</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
