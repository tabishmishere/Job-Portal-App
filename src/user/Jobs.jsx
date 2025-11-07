// frontend/src/pages/Jobs.jsx
import React, { useState, useEffect } from "react";
import { FiMapPin, FiClock } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE = "http://localhost:5000/api";

const BriefcaseIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
  </svg>
);

const SearchIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

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

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Open modal when Apply Now is clicked
  const handleApply = (job) => {
    setSelectedJob(job);
    setShowApplyModal(true);
  };

  // Submit job application
  const submitApplication = async () => {
    if (!cvFile) return alert("CV is required");

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
        // Reset form
        setCvFile(null);
        setEducation("");
        setExperience("");
        setSkills("");
        setCoverLetter("");
      } else {
        alert(res.data.message || "Error applying");
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error applying");
    }
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`${API_BASE}/jobs`);
        setJobs(res.data.jobs || []);
      } catch (err) {
        console.error("fetchJobs error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const matchSearch = job.title?.toLowerCase().includes(search.toLowerCase());
    const matchLocation = job.location?.toLowerCase().includes(location.toLowerCase());
    return matchSearch && matchLocation;
  });

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-white shadow-sm border-b">
        <p className="text-2xl font-extrabold text-black">
          Jobi<span className="text-green-600">.</span>
        </p>
        {user && (
          <div className="relative">
            <img
              src={
                user.profile?.avatar
                  ? `http://localhost:5000${user.profile.avatar}`
                  : "/default-avatar.png"
              }
              alt="profile"
              className="w-10 h-10 rounded-full cursor-pointer border"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
                <button
                  onClick={() => navigate("/user/dashboard")}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Profile
                </button>
                <button
                  onClick={() => navigate("/user/applied-jobs")}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Applied Jobs
                </button>
                <button
                  onClick={() => navigate("/user/settings")}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Settings
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="p-4 md:p-12">
        {/* Hero */}
        <div className="text-center mb-10 mt-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 flex items-center justify-center">
            <BriefcaseIcon className="w-8 h-8 mr-3 text-green-600" /> Find Your Dream Job!
          </h1>
          <p className="text-lg text-gray-500 mt-2">
            Explore opportunities that match your passion
          </p>
        </div>

        {/* Search */}
        <div className="max-w-6xl mx-auto p-6 bg-white rounded-2xl border shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
            <div className="relative col-span-1 sm:col-span-7">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search job title or keywords..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border border-gray-300 rounded-lg p-3 pl-10 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="relative col-span-1 sm:col-span-3">
              <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Location (City or Remote)"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="border border-gray-300 rounded-lg p-3 pl-10 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <button className="col-span-1 sm:col-span-2 bg-green-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-green-700 transition-all shadow-md">
              Search
            </button>
          </div>
        </div>

        {/* Jobs List */}
        <section className="max-w-6xl mx-auto mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Available Jobs ({filteredJobs.length})
          </h2>

          {loading ? (
            <div className="text-center py-16 bg-white rounded-xl shadow-sm border">
              <p className="text-lg text-gray-500">Loading jobs...</p>
            </div>
          ) : filteredJobs.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredJobs.map((job) => (
                <div
                  key={job._id}
                  className="bg-white p-6 rounded-2xl border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                    <span className="text-xs font-medium text-green-700 bg-green-100 px-3 py-1 rounded-full">
                      {job.jobType || "N/A"}
                    </span>
                  </div>

                  <p className="text-gray-600 mb-2">
                    <strong>Company:</strong> {job.company?.name || job.company || "Unknown"}
                  </p>

                  <div className="flex items-center text-gray-600 mb-2">
                    <FiMapPin className="mr-2" />
                    {job.location || "Not specified"}
                  </div>

                  <div className="flex items-center text-gray-600 mb-2">
                    <FiClock className="mr-2" />
                    {job.salaryRange ? `Salary: ${job.salaryRange}` : "Salary: Negotiable"}
                  </div>

                  <p className="text-gray-500 text-sm mb-4 line-clamp-3">
                    {job.description?.slice(0, 100) || "No description available."}
                    {job.description?.length > 100 && "..."}
                  </p>

                  <button
                    onClick={() => handleApply(job)}
                    disabled={appliedJobs.includes(job._id)}
                    className={`px-4 py-2 rounded-lg text-white ${
                      appliedJobs.includes(job._id)
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    {appliedJobs.includes(job._id) ? "Applied" : "Apply Now"}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-xl shadow-sm border">
              <p className="text-lg text-gray-500">No jobs match your search.</p>
            </div>
          )}
        </section>
      </main>

      {/* Apply Modal */}
      {showApplyModal && selectedJob && (
        <div className="fixed inset-0  bg-gray-200 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Apply to {selectedJob.title}</h2>

            <label>Education:</label>
            <input
              type="text"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              className="w-full mb-2 border rounded px-2 py-1"
            />

            <label>Experience:</label>
            <input
              type="text"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full mb-2 border rounded px-2 py-1"
            />

            <label>Skills (comma separated):</label>
            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="w-full mb-2 border rounded px-2 py-1"
            />

            <label>Cover Letter:</label>
            <textarea
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              className="w-full mb-2 border rounded px-2 py-1"
            />

            <label>Upload CV:</label>
            <input
              type="file"
              onChange={(e) => setCvFile(e.target.files[0])}
              className="w-full mb-4"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={submitApplication}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Submit
              </button>
              <button
                onClick={() => setShowApplyModal(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded"
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
