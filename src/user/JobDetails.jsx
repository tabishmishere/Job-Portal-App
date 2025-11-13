import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const JobDetails = () => {
  const { id } = useParams(); // job id from route
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

  if (loading) return <p className="text-center mt-10">Loading job details...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;
  if (!job) return <p className="text-center mt-10 text-gray-600">Job not found</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <button
        className="mb-6 text-green-600 hover:underline"
        onClick={() => navigate(-1)}
      >
        ← Back to Jobs
      </button>

      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-8">
        <h1 className="text-3xl font-bold mb-4">{job.title || "Job Title"}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Job Location</label>
            <p className="mt-1 text-gray-800">{job.location || "Not specified"}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Job Category</label>
            <p className="mt-1 text-gray-800">{job.category || "N/A"}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Job Type</label>
            <p className="mt-1 text-gray-800">{job.jobType || "N/A"}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Salary</label>
            <p className="mt-1 text-gray-800">{job.salaryRange || "Negotiable"}</p>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Company Name</label>
            <p className="mt-1 text-gray-800">{job.company?.name || "N/A"}</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Job Description</label>
          <p className="text-gray-700 whitespace-pre-line">{job.description || "No description available."}</p>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
