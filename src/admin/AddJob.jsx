// src/admin/AddJob.jsx
import React, { useState, useEffect } from "react";
import { createJob, getJobById, updateJob } from "../api/JobApi.jsx";
import { useNavigate, useLocation } from "react-router-dom";

const AddJob = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    jobType: "Full-Time",
    salaryRange: "",
    category: "Programming",
    company: { name: "", logo: "", website: "" },
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Check if ?edit=<jobId> exists in URL
  const searchParams = new URLSearchParams(location.search);
  const editJobId = searchParams.get("edit");
  const isEditMode = Boolean(editJobId);

  // If in edit mode, fetch job data to prefill
  useEffect(() => {
    const fetchJob = async () => {
      if (!editJobId) return;
      setLoading(true);
      try {
        const res = await getJobById(editJobId);
        if (res.success && res.job) {
          setFormData({
            title: res.job.title || "",
            description: res.job.description || "",
            location: res.job.location || "",
            jobType: res.job.jobType || "Full-Time",
            salaryRange: res.job.salaryRange || "",
            category: res.job.category || "Programming",
            company: {
              name: res.job.company?.name || "",
              logo: res.job.company?.logo || "",
              website: res.job.company?.website || "",
            },
          });
        } else {
          setMessage("Failed to load job details.");
        }
      } catch (err) {
        console.error("Error fetching job:", err);
        setMessage("Error fetching job data.");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [editJobId]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("company.")) {
      const key = name.split(".")[1];
      setFormData({ ...formData, company: { ...formData.company, [key]: value } });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      let res;
      if (isEditMode) {
        res = await updateJob(editJobId, formData);
      } else {
        res = await createJob(formData);
      }

      if (res.success) {
        navigate("/recruiter/job-management");
      } else {
        setMessage(res.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Job submit error:", error);
      setMessage(error.response?.data?.message || "Error submitting job.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-[rgba(211,239,224,0.3)]">
      <h2 className="text-3xl ml-5 mt-5 mb-2 sm:text-4xl font-bold text-green-900">
        {isEditMode ? "Edit Job" : "Add Job"}
      </h2>

      <div className="max-w-5xl mt-10 mx-auto bg-white shadow-md rounded-2xl p-8">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Job Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2"> Job Title </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter job title"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2"> Job Location </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter location"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2"> Job Category </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option>Programming</option>
              <option>Design</option>
              <option>Marketing</option>
              <option>Management</option>
            </select>
          </div>

          {/* Job Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2"> Job Type </label>
            <select
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option>Full-Time</option>
              <option>Part-Time</option>
              <option>Remote</option>
              <option>Contract</option>
            </select>
          </div>

          {/* Salary */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2"> Salary </label>
            <input
              type="number"
              name="salaryRange"
              value={formData.salaryRange}
              onChange={handleChange}
              placeholder="e.g. 40000"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Company Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2"> Company Name </label>
            <input
              type="text"
              name="company.name"
              value={formData.company.name}
              onChange={handleChange}
              placeholder="Enter company name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2"> Job Description </label>
            <textarea
              name="description"
              rows="5"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter detailed job description..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              required
            ></textarea>
          </div>

          {/* Submit */}
          <div className="flex justify-start">
            <button
              type="submit"
              disabled={loading}
              className={`bg-green-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-all ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading
                ? isEditMode
                  ? "Updating..."
                  : "Adding..."
                : isEditMode
                ? "Update Job"
                : "Add Job"}
            </button>
          </div>
        </form>

        {message && <p className="mt-4 text-center text-sm font-medium text-gray-700">{message}</p>}
      </div>
    </div>
  );
};

export default AddJob;
