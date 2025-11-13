import React, { useState, useEffect } from "react";
import { FiMapPin, FiClock, FiSearch, FiBriefcase, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE = "http://localhost:5000/api";

const Jobs = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [appliedJobs, setAppliedJobs] = useState([]);

  // Modal and form states
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [cvFile, setCvFile] = useState(null);
  const [education, setEducation] = useState("");
  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState("");
  const [coverLetter, setCoverLetter] = useState("");

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleApply = (job) => {
    setSelectedJob(job);
    setShowApplyModal(true);
  };

  const submitApplication = async () => {
    if (!cvFile) return alert("Please upload your CV before applying.");

    const formData = new FormData();
    formData.append("cv", cvFile);
    formData.append("education", education);
    formData.append("experience", experience);
    formData.append("skills", skills);
    formData.append("coverLetter", coverLetter);

    try {
      const res = await axios.post(
        `${API_BASE}/applications/${selectedJob._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.success) {
        alert("Application submitted successfully!");
        setAppliedJobs((prev) => [...prev, selectedJob._id]);
        setShowApplyModal(false);
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting your application");
    }
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`${API_BASE}/jobs`);
        setJobs(res.data.jobs || []);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const matchSearch = job.title?.toLowerCase().includes(search.toLowerCase());
    const matchLocation = job.location
      ?.toLowerCase()
      .includes(location.toLowerCase());
    return matchSearch && matchLocation;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-white/70 backdrop-blur-lg shadow-sm">
        <p className="text-2xl font-extrabold text-gray-900">
          Jobi<span className="text-green-600">.</span>
        </p>

        {user && (
          <div className="relative">
            <img
              src={
                user?.profile?.avatar
                  ? `http://localhost:5000${user.profile.avatar}`
                  : "/default-avatar.png"
              }
              alt="profile"
              className="w-10 h-10 rounded-full cursor-pointer border border-gray-200"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg overflow-hidden">
                <button
                  onClick={() => navigate("/user/dashboard")}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                >
                  Profile
                </button>
                <button
                  onClick={() => navigate("/user/applied-jobs")}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                >
                  Applied Jobs
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="text-center py-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 flex justify-center items-center">
          <FiBriefcase className="w-10 h-10 mr-3 text-green-600" /> Find Your
          Dream Job
        </h1>
        <p className="text-gray-500 mt-3 text-lg max-w-2xl mx-auto">
          Discover exciting career opportunities that align with your passions
          and skills. Take the next step toward your future today.
        </p>
      </section>

      {/* Search Bar */}
      <div className="max-w-6xl mx-auto px-6 mb-12">
        <div className="flex flex-col sm:flex-row gap-4 bg-white/80 backdrop-blur-md shadow-md rounded-2xl p-5">
          <div className="relative flex-1">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search job title or keywords..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-green-500 outline-none transition-all"
            />
          </div>

          <div className="relative flex-1">
            <FiMapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Location (City or Remote)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-green-500 outline-none transition-all"
            />
          </div>

          <button className="px-8 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-all">
            Search
          </button>
        </div>
      </div>

      {/* Jobs Section */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Available Jobs ({filteredJobs.length})
        </h2>

        {loading ? (
          <div className="text-center py-20 bg-white/70 backdrop-blur-md rounded-2xl shadow-sm">
            <p className="text-lg text-gray-600 animate-pulse">
              Loading jobs...
            </p>
          </div>
        ) : filteredJobs.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredJobs.map((job) => (
              <div
                key={job._id}
                className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 leading-tight">
                    {job.title}
                  </h3>
                  <span className="text-xs font-medium text-green-700 bg-green-100 px-3 py-1 rounded-full">
                    {job.jobType || "N/A"}
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-3">
                  <span className="font-bold">Company:</span>{" "}
                  {job.company?.name || job.company || "Unknown"}
                </p>

                <div className="flex items-center text-gray-500 text-sm mb-1">
                  <FiMapPin className="mr-2 text-green-500" />
                  {job.location || "Not specified"}
                </div>

                <div className="flex items-center text-gray-500 text-sm mb-4">
                  <FiClock className="mr-2 text-green-500" />
                  {job.salaryRange
                    ? `Salary: ${job.salaryRange}`
                    : "Salary: Negotiable"}
                </div>

                <p className="text-gray-500 text-sm mb-6 line-clamp-3">
                  {job.description?.slice(0, 100) ||
                    "No description available."}
                  {job.description?.length > 100 && "..."}
                </p>

                <button
                  onClick={() => handleApply(job)}
                  disabled={appliedJobs.includes(job._id)}
                  className={`w-full py-2.5 rounded-lg font-medium transition-all ${
                    appliedJobs.includes(job._id)
                      ? "bg-gray-400 cursor-not-allowed text-white"
                      : "bg-green-600 text-white hover:bg-green-700"
                  }`}
                >
                  {appliedJobs.includes(job._id) ? "Applied" : "Apply Now"}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white/70 backdrop-blur-md rounded-2xl shadow-sm">
            <p className="text-lg text-gray-600">
              No jobs found for your search.
            </p>
          </div>
        )}
      </section>

      {/* Apply Modal */}
      {showApplyModal && selectedJob && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-[95%] max-w-lg shadow-xl relative">
            <h2 className="text-2xl text-center font-bold mb-6 text-gray-800">
              Apply to {selectedJob.title}
            </h2>

            <div className="space-y-4">
              {[
                ["Education", education, setEducation],
                ["Experience", experience, setExperience],
                ["Skills", skills, setSkills],
              ].map(([label, value, setValue]) => (
                <div key={label}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                  </label>
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                  />
                </div>
              ))}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cover Letter
                </label>
                <textarea
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  rows={3}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload CV
                </label>
                <input
                  type="file"
                  onChange={(e) => setCvFile(e.target.files[0])}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={submitApplication}
                className="bg-green-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-green-700 transition-all"
              >
                Submit Application
              </button>
              <button
                onClick={() => setShowApplyModal(false)}
                className="bg-gray-200 text-gray-800 px-5 py-2 rounded-lg font-medium hover:bg-gray-300 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Jobs;
