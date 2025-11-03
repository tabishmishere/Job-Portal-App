import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import JobForm from "../components/Admin/JobForm";
import { getAllJobs, deleteJob } from "../api/JobApi.jsx";

const JobManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [postedJobs, setPostedJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await getAllJobs();
        setPostedJobs(response.data.jobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  const handleEdit = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleJobUpdated = (updatedJob) => {
    setPostedJobs((prevJobs) =>
      prevJobs.map((job) => (job._id === updatedJob._id ? updatedJob : job))
    );
  };

  // Delete job handler.
  const handleDelete = async (jobId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this job?");
    if (!confirmDelete) return;

    try {
      await deleteJob(jobId);
      setPostedJobs((prevJobs) =>
        prevJobs.filter((job) => job._id !== jobId && job.id !== jobId)
      );
      alert("Job deleted successfully!");
    } catch (error) {
      console.error("Error deleting job:", error);
      alert("Failed to delete job.");
    }
  };

  return (
    <div className="flex-1 p-4 sm:p-8 bg-[rgba(211,239,224,0.3)] rounded-xl shadow-lg min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-green-900">
          Job Management
        </h2>
      </div>

      <div className="bg-white rounded-xl shadow-lg">
        {/* Table View for larger screens */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full table-auto text-sm">
            <thead>
              <tr>
                <th className="py-4 px-6 text-left font-medium text-gray-900">
                  Job Title
                </th>
                <th className="py-4 px-6 text-left font-medium text-gray-900">
                  Company
                </th>
                <th className="py-4 px-6 text-left font-medium text-gray-900">
                  Location
                </th>
                <th className="py-4 px-6 text-left font-medium text-gray-900">
                  Date Posted
                </th>
                <th className="py-4 px-6 text-left font-medium text-gray-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {postedJobs.map((job) => (
                <tr
                  key={job._id || job.id}
                  className="border-t hover:bg-gray-100 transition-all"
                >
                  <td className="py-4 px-6 text-gray-800">{job.title}</td>
                  <td className="py-4 px-6 text-gray-600">
                    {job.company?.name || job.company}
                  </td>
                  <td className="py-4 px-6 text-gray-600">{job.location}</td>
                  <td className="py-4 px-6 text-gray-600">
                    {new Date(
                      job.datePosted || job.date || job.createdAt
                    ).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex space-x-4">
                    {/* Delete button */}
                      <button
                        className="text-gray-600 hover:text-red-600 transition-all"
                        onClick={() => handleDelete(job._id || job.id)}
                      >
                        <MdDelete className="text-xl" />
                      </button>

                      {/* Edit button */}
                      <button
                        className="text-gray-600 hover:text-green-600 transition-all"
                        onClick={() => handleEdit(job)}
                      >
                        <FaEdit className="text-xl" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="block md:hidden p-4 space-y-4">
          {postedJobs.map((job) => (
            <div
              key={job._id || job.id}
              className="bg-gray-50 rounded-lg p-4 shadow border border-gray-200"
            >
              <div className="mb-2">
                <p className="text-sm text-gray-500">Job Title</p>
                <p className="text-base font-semibold text-gray-800">
                  {job.title}
                </p>
              </div>
              <div className="mb-2">
                <p className="text-sm text-gray-500">Company</p>
                <p className="text-base text-gray-700">
                  {job.company?.name || job.company}
                </p>
              </div>
              <div className="mb-2">
                <p className="text-sm text-gray-500">Location</p>
                <p className="text-base text-gray-700">{job.location}</p>
              </div>
              <div className="mb-2">
                <p className="text-sm text-gray-500">Date Posted</p>
                <p className="text-base text-gray-700">
                  {new Date(
                    job.datePosted || job.date || job.createdAt
                  ).toLocaleDateString()}
                </p>
              </div>

              <div className="flex space-x-4 pt-2">
                {/* Delete button */}
                <button
                  className="text-gray-600 hover:text-red-600 transition-all"
                  onClick={() => handleDelete(job._id || job.id)}
                >
                  <MdDelete className="text-xl" />
                </button>

                {/* Edit button */}
                <button
                  className="text-gray-600 hover:text-green-600 transition-all"
                  onClick={() => handleEdit(job)}
                >
                  <FaEdit className="text-xl" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for editing job */}
      {isModalOpen && selectedJob && (
        <JobForm
          job={selectedJob}
          onClose={() => setIsModalOpen(false)}
          onJobUpdated={handleJobUpdated}
        />
      )}
    </div>
  );
};

export default JobManagement;
