import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoPersonOutline } from "react-icons/io5";
import { GoBookmark } from "react-icons/go";
import { FaEye } from "react-icons/fa";
import { HiOutlinePencilAlt } from "react-icons/hi";

const RecruiterDashboard = () => {
  const [stats, setStats] = useState({});
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/recruiter/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.success) {
          setStats(res.data.stats || {});
          setJobs(res.data.postedJobs || []);
        } else {
          console.error("Dashboard fetch not successful", res.data);
        }
      } catch (err) {
        console.error("fetch dashboard error", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-8 bg-[rgba(211,239,224,0.3)] rounded-xl min-h-screen">
      <h2 className="text-4xl font-bold text-green-900 mb-8">Recruiter Dashboard</h2>

      <div className="grid grid-cols-4 gap-6 mb-8">
        <Card title="Posted Jobs" value={stats.totalJobs} icon={<IoPersonOutline />} />
        <Card title="Shortlisted" value={stats.shortlisted} icon={<GoBookmark />} />
        <Card title="Applications" value={stats.totalApplications} icon={<FaEye />} />
        <Card title="Saved Candidates" value={stats.savedCandidates} icon={<HiOutlinePencilAlt />} />
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold mb-4">Posted Jobs</h3>
        <ul className="space-y-4">
          {jobs.length ? jobs.map(job => (
            <li key={job._id} className="flex items-center justify-between">
              <div>
                <p className="font-semibold">{job.title}</p>
                <p className="text-sm text-gray-500">{job.jobType} • {job.location}</p>
              </div>
              <div className="text-sm text-gray-400">{new Date(job.createdAt).toLocaleDateString()}</div>
            </li>
          )) : <p className="text-gray-500">No jobs posted yet.</p>}
        </ul>
      </div>
    </div>
  );
};

const Card = ({ title, value, icon }) => (
  <div className="bg-white p-7 rounded-xl shadow-md flex items-center justify-around">
    <div>
      <h4 className="text-3xl font-bold text-gray-700">{value ?? 0}</h4>
      <p className="text-sm text-gray-500">{title}</p>
    </div>
    <div className="bg-[#8EEC4E] text-white rounded-full p-3 text-3xl">{icon}</div>
  </div>
);

export default RecruiterDashboard;
