import React, { useEffect, useState } from "react";
import { IoPersonOutline } from "react-icons/io5";
import { FaUsersCog, FaEye } from "react-icons/fa";
import { BsBriefcase } from "react-icons/bs";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";


import {
  fetchDashboardStats,
  fetchRecentJobs,
  fetchRecentUsers,
  deleteJobById,
  deleteUserById,
} from "../api/adminApi.js";

const AdminDashboard = () => {
  const navigate = useNavigate();

  // Dashboard stats
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalRecruiters: 0,
    totalJobs: 0,
    totalApplications: 0,
  });

 
  const [jobs, setJobs] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);

        const statsData = await fetchDashboardStats();
        const recentJobsData = await fetchRecentJobs();
        const recentUsersData = await fetchRecentUsers();

        console.log("Dashboard Stats:", statsData);
        console.log("Recent Jobs:", recentJobsData);
        console.log("Recent Users:", recentUsersData);

        setStats({
          totalUsers: statsData.totalUsers || 0,
          totalRecruiters: statsData.totalRecruiters || 0,
          totalJobs: statsData.totalJobs || 0,
          totalApplications: statsData.totalApplications || 0,
        });

        setJobs(recentJobsData || []);
        setUsers(recentUsersData || []);
      } catch (error) {
        console.error(
          " Failed to load dashboard data:",
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

 
  const handleDeleteJob = async (id) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        await deleteJobById(id);
        setJobs((prev) => prev.filter((job) => job._id !== id));
        alert(" Job deleted successfully");
      } catch (error) {
        alert(" Failed to delete job");
        console.error(error);
      }
    }
  };


  const handleDeleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUserById(id);
        setUsers((prev) => prev.filter((user) => user._id !== id));
        alert(" User deleted successfully");
      } catch (error) {
        alert(" Failed to delete user");
        console.error(error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-green-900 text-xl">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[rgba(211,239,224,0.3)]">
      {/* Main Dashboard */}
      <div className="flex-1 p-8 rounded-xl shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-4xl font-bold text-green-900">Admin Dashboard</h2>
        </div>

       
        <div className="grid grid-cols-4 gap-6 mb-10">
          {/* Total Users */}
          <div className="bg-white p-7 rounded-xl shadow-md flex items-center justify-between hover:shadow-lg transition-all">
            <div>
              <h4 className="text-3xl font-bold text-gray-700">{stats.totalUsers}</h4>
              <p className="text-sm text-gray-500">Total Users</p>
            </div>
            <div className="bg-[#8EEC4E] text-white rounded-full p-3">
              <IoPersonOutline className="text-3xl" />
            </div>
          </div>

          {/* Recruiters */}
          <div className="bg-white p-7 rounded-xl shadow-md flex items-center justify-between hover:shadow-lg transition-all">
            <div>
              <h4 className="text-3xl font-bold text-gray-700">{stats.totalRecruiters}</h4>
              <p className="text-sm text-gray-500">Recruiters</p>
            </div>
            <div className="bg-[#8EEC4E] text-white rounded-full p-3">
              <FaUsersCog className="text-3xl" />
            </div>
          </div>

          {/* Jobs */}
          <div className="bg-white p-7 rounded-xl shadow-md flex items-center justify-between hover:shadow-lg transition-all">
            <div>
              <h4 className="text-3xl font-bold text-gray-700">{stats.totalJobs}</h4>
              <p className="text-sm text-gray-500">Job Posts</p>
            </div>
            <div className="bg-[#8EEC4E] text-white rounded-full p-3">
              <BsBriefcase className="text-3xl" />
            </div>
          </div>

          {/* Applications */}
          <div className="bg-white p-7 rounded-xl shadow-md flex items-center justify-between hover:shadow-lg transition-all">
            <div>
              <h4 className="text-3xl font-bold text-gray-700">{stats.totalApplications}</h4>
              <p className="text-sm text-gray-500">Applications</p>
            </div>
            <div className="bg-[#8EEC4E] text-white rounded-full p-3">
              <FaEye className="text-3xl" />
            </div>
          </div>
        </div>

   
        <div className="grid grid-cols-2 gap-8">
          {/* === Manage Jobs === */}
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Manage Jobs</h3>
              <button
                className="text-sm bg-green-900 text-white py-1 px-4 rounded-full hover:bg-green-700 transition-all"
                onClick={() => navigate("/admin/manage-jobs")}
              >
                View All
              </button>
            </div>

            <ul className="space-y-4">
              {jobs.length === 0 && <p className="text-gray-500">No jobs found</p>}
              {jobs.map((job) => (
                <li
                  key={job._id}
                  className="flex items-center justify-between border-b pb-3 hover:bg-gray-50 transition-all rounded-lg px-2"
                >
                  <div className="flex items-center space-x-3">
                    {job.company?.logo ? (
                      <img
                        src={job.company.logo}
                        alt={job.title}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <BsBriefcase className="text-green-700 text-xl" />
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{job.title}</p>
                      <p className="text-xs text-gray-500">{job.company?.name}</p>
                    </div>
                  </div>
                  <div className="flex space-x-3 text-gray-500">
                    {/* <HiOutlinePencilAlt className="cursor-pointer hover:text-green-700" /> */}
                    <MdDeleteOutline
                      className="cursor-pointer hover:text-red-600"
                      onClick={() => handleDeleteJob(job._id)}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Manage Users</h3>
              <button
                className="text-sm bg-green-900 text-white py-1 px-4 rounded-full hover:bg-green-700 transition-all"
                onClick={() => navigate("/admin/manage-users")}
              >
                View All
              </button>
            </div>

            <ul className="space-y-4">
              {users.length === 0 && <p className="text-gray-500">No users found</p>}
              {users.map((user) => (
                <li
                  key={user._id}
                  className="flex items-center justify-between border-b pb-3 hover:bg-gray-50 transition-all rounded-lg px-2"
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-100 text-green-800 font-bold rounded-full w-10 h-10 flex items-center justify-center">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.role}</p>
                    </div>
                  </div>
                  <div className="flex space-x-3 text-gray-500">
                    {/* <HiOutlinePencilAlt className="cursor-pointer hover:text-green-700" /> */}
                    <MdDeleteOutline
                      className="cursor-pointer hover:text-red-600"
                      onClick={() => handleDeleteUser(user._id)}
                    />
                  </div>
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
