import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FiArrowLeft } from "react-icons/fi";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/jobs/${id}`);
        if (res.data.success) {
          setJob(res.data.job);
        } else {
          setError("Failed to load job details");
        }
      } catch (err) {
        console.error(err);
        setError("Error fetching job data");
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-lg text-gray-600 animate-pulse">
          Loading job details...
        </p>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-red-600 text-lg font-medium">{error}</p>
      </div>
    );

  if (!job)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-gray-600 text-lg">Job not found</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-10 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <button
          className="flex mt-5 items-center gap-2 mb-8 bg-green-600 p-5 rounded-full text-white cursor-pointer hover:bg-green-500 font-medium transition"
          onClick={() => navigate(-1)}
        >
          <FiArrowLeft size={18} />
          Back to Jobs
        </button>

        {/* Job Card */}
        <div className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 p-8 md:p-12 border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 border-b pb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              {job.title || "Job Title"}
            </h1>
            <span className="bg-green-100 text-green-700 text-sm font-medium px-4 py-2 rounded-full capitalize">
              {job.jobType || "Full-time"}
            </span>
          </div>

          {/* Job Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-sm text-gray-500 font-medium">📍 Location</p>
              <p className="text-lg font-semibold text-gray-800 mt-1">
                {job.location || "Not specified"}
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-sm text-gray-500 font-medium">🏷️ Category</p>
              <p className="text-lg font-semibold text-gray-800 mt-1">
                {job.category || "N/A"}
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-sm text-gray-500 font-medium">💰 Salary</p>
              <p className="text-lg font-semibold text-gray-800 mt-1">
                {job.salaryRange || "Negotiable"}
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-sm text-gray-500 font-medium">🏢 Company</p>
              <p className="text-lg font-semibold text-gray-800 mt-1">
                {job.company?.name || "N/A"}
              </p>
            </div>
          </div>

          {/* Job Description */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Job Description
            </h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {job.description || "No description available."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
