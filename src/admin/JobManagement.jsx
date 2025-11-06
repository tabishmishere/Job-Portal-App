// src/admin/JobManagement.jsx
import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import JobForm from "../components/Admin/JobForm";
import { getRecruiterJobs, deleteJob } from "../api/JobApi.jsx";
import { useNavigate } from "react-router-dom";

const JobManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postedJobs, setPostedJobs] = useState([]);
  const navigate = useNavigate();

  const fetchJobs = async () => {
    try {
      const response = await getRecruiterJobs();
      console.log("Jobs API response:", response);
      if (response.success) {
        setPostedJobs(response.jobs);
      } else {
        setPostedJobs([]);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      const res = await deleteJob(id);
      if (res.success) {
        setPostedJobs((prev) => prev.filter((j) => j._id !== id));
      } else {
        console.error("Delete failed:", res);
      }
    } catch (err) {
      console.error("Delete job error:", err);
    }
  };

  const handleEdit = (jobId) => {
    // navigate to an edit page or open modal with job data
    navigate(`/recruiter/add-job?edit=${jobId}`);
  };

  return (
    <div className="flex-1 p-4 sm:p-8 bg-[rgba(211,239,224,0.3)] rounded-xl shadow-lg min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-green-900"> Job Management </h2>
      </div>

      <div className="bg-white rounded-xl shadow-lg">
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full table-auto text-sm">
            <thead>
              <tr>
                <th className="py-4 px-6 text-left font-medium text-gray-900"> Job Title </th>
                <th className="py-4 px-6 text-left font-medium text-gray-900"> Date </th>
                <th className="py-4 px-6 text-left font-medium text-gray-900"> Location </th>
                <th className="py-4 px-6 text-left font-medium text-gray-900"> Applicants </th>
                <th className="py-4 px-6 text-left font-medium text-gray-900"> Actions </th>
              </tr>
            </thead>
            <tbody>
              {postedJobs.map((job) => (
                <tr key={job._id} className="border-t hover:bg-gray-100 transition-all">
                  <td className="py-4 px-6 text-gray-800">{job.title}</td>
                  <td className="py-4 px-6 text-gray-600">{new Date(job.createdAt).toLocaleDateString()}</td>
                  <td className="py-4 px-6 text-gray-600">{job.location}</td>
                  <td className="py-4 px-6 text-gray-600">{job.applicantCount ?? 0}</td>
                  <td className="py-4 px-6">
                    <div className="flex space-x-4">
                      <button onClick={() => handleDelete(job._id)} className="text-gray-600 hover:text-red-600 transition-all">
                        <MdDelete className="text-xl" />
                      </button>
                      <button onClick={() => handleEdit(job._id)} className="text-gray-600 hover:text-green-600 transition-all">
                        <FaEdit className="text-xl" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {postedJobs.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-gray-500">No jobs posted yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile view */}
        <div className="block md:hidden p-4 space-y-4">
          {postedJobs.map((job) => (
            <div key={job._id} className="bg-gray-50 rounded-lg p-4 shadow border border-gray-200">
              <div className="mb-2">
                <p className="text-sm text-gray-500">Job Title</p>
                <p className="text-base font-semibold text-gray-800">{job.title}</p>
              </div>
              <div className="mb-2">
                <p className="text-sm text-gray-500">Date</p>
                <p className="text-base text-gray-700">{new Date(job.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="mb-2">
                <p className="text-sm text-gray-500">Location</p>
                <p className="text-base text-gray-700">{job.location}</p>
              </div>
              <div className="mb-2">
                <p className="text-sm text-gray-500">Applicants</p>
                <p className="text-base text-gray-700">{job.applicantCount ?? 0}</p>
              </div>
              <div className="flex space-x-4 pt-2">
                <button onClick={() => handleDelete(job._id)} className="text-gray-600 hover:text-red-600 transition-all">
                  <MdDelete className="text-xl" />
                </button>
                <button onClick={() => handleEdit(job._id)} className="text-gray-600 hover:text-green-600 transition-all">
                  <FaEdit className="text-xl" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && <JobForm setPostedJobs={setPostedJobs} setIsModalOpen={setIsModalOpen} />}
    </div>
  );
};

export default JobManagement;
