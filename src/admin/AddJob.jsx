import React, { useState } from "react";
import axios from "axios";

const AddJob = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    jobType: "Full-time",
    salaryRange: "",
    category: "Programming",
    recruiterId: "672999999999999999999999", // replace later with actual recruiter ID
    company: { name: "", logo: "", website: "" },
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("company.")) {
      const companyField = name.split(".")[1];
      setFormData({
        ...formData,
        company: { ...formData.company, [companyField]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // Direct axios call instead of createJob()
      const res = await axios.post("http://localhost:5000/api/jobs", formData);

      setMessage("Job created successfully!");
      console.log("Job created:", res.data);

      // Reset form
      setFormData({
        title: "",
        description: "",
        location: "",
        jobType: "Full-time",
        salaryRange: "",
        category: "Programming",
        recruiterId: "672999999999999999999999",
        company: { name: "", logo: "", website: "" },
      });
    } catch (error) {
      setMessage("❌ Error creating job. Please try again.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-[rgba(211,239,224,0.3)]">
      <h2 className="text-3xl ml-5 mt-5 mb-2 sm:text-4xl font-bold text-green-900">
        Add Job
      </h2>

      <div className="max-w-5xl mt-10 mx-auto bg-white shadow-md rounded-2xl p-8">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Job Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Title
            </label>
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
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Location
            </label>
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
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Category
            </label>
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
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Type
            </label>
            <select
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Remote</option>
              <option>Intern</option>
            </select>
          </div>

          {/* Salary */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Salary
            </label>
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
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Name
            </label>
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
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Description
            </label>
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

          {/* Submit Button */}
          <div className="flex justify-start">
            <button
              type="submit"
              disabled={loading}
              className={`bg-green-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-all ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Adding..." : "Add Job"}
            </button>
          </div>
        </form>

        {/* Message */}
        {message && (
          <p className="mt-4 text-center text-sm font-medium text-gray-700">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default AddJob;
