import React, { useState, useEffect } from "react";
import { FiMapPin } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE = "http://localhost:5000/api";

const SearchIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const Jobs = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [cvFile, setCvFile] = useState(null);
  const [education, setEducation] = useState("");
  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState("");
  const [coverLetter, setCoverLetter] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const jobType = ["Full-time", "Part-time", "Internship", "Remote"];
  const jobCategory = [
    "Programming",
    "Design",
    "Marketing",
    "Sales",
    "Content Writing",
  ];

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`${API_BASE}/jobs`);
        setJobs(res.data.jobs || []);
        setFilteredJobs(res.data.jobs || []);
      } catch (err) {
        console.error("fetchJobs error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

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
    if (!cvFile) return alert("Please upload your CV!");

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
    let filtered = jobs;

    if (search.trim()) {
      filtered = filtered.filter((job) =>
        job.title?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (location.trim()) {
      filtered = filtered.filter((job) =>
        job.location?.toLowerCase().includes(location.toLowerCase())
      );
    }

    if (selectedTypes.length > 0) {
      filtered = filtered.filter((job) => selectedTypes.includes(job.jobType));
    }

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((job) =>
        selectedCategories.includes(job.category)
      );
    }

    setFilteredJobs(filtered);
  }, [search, location, selectedTypes, selectedCategories, jobs]);

  const toggleType = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <p className="text-2xl font-extrabold text-gray-900">
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
              alt="Profile"
              className="w-10 h-10 rounded-full cursor-pointer ring-2 ring-gray-200 hover:ring-green-400 transition"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />
            {dropdownOpen && (
              <div className="absolute right-0 mt-3 w-48 bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden z-50">
                <button
                  onClick={() => navigate("/user/dashboard")}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Profile
                </button>
                <button
                  onClick={() => navigate("/user/applied-jobs")}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Applied Jobs
                </button>
                <button
                  onClick={() => navigate("/user/settings")}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Settings
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="px-6 md:px-12 py-10">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Find your <span className="text-green-600">Dream Job</span> Here!
          </h1>
          <p className="text-gray-500 text-lg mt-3">
            Discover opportunities that match your passion
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-6xl mx-auto bg-white shadow-md border border-gray-200 rounded-2xl px-6 py-5 mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
            <div className="relative sm:col-span-7">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search jobs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border border-gray-300 rounded-xl py-3 pl-10 pr-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
              />
            </div>

            <div className="relative sm:col-span-3">
              <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="e.g. Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full border border-gray-300 rounded-xl py-3 pl-10 pr-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
              />
            </div>

            <button className="sm:col-span-2 bg-green-600 text-white font-semibold py-3 rounded-xl hover:bg-green-700 active:bg-green-800 transition shadow-md">
              Search Jobs
            </button>
          </div>
        </div>

        {/* Filters + Jobs */}
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10">
          {/* Filters */}
          <aside className="bg-white border border-gray-200 rounded-2xl shadow-sm p-10 md:w-1/4 h-fit md:sticky md:top-24 self-start">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Filters</h2>

            <div className="space-y-8 overflow-y-auto max-h-[80vh] pr-2">
              {/* Job Type */}
              <div>
                <h3 className="font-semibold text-gray-700 mb-3">Job Type</h3>
                <div className="space-y-2">
                  {jobType.map((type) => (
                    <label
                      key={type}
                      className="flex items-center gap-2 text-gray-600 hover:text-green-600 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedTypes.includes(type)}
                        onChange={() => toggleType(type)}
                        className="accent-green-600 h-4 w-4 cursor-pointer"
                      />
                      {type}
                    </label>
                  ))}
                </div>
              </div>

              <hr className="border-gray-300" />

              {/* Category */}
              <div>
                <h3 className="font-semibold text-gray-700 mb-3">Category</h3>
                <div className="space-y-2">
                  {jobCategory.map((cat) => (
                    <label
                      key={cat}
                      className="flex items-center gap-2 text-gray-600 hover:text-green-600 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat)}
                        onChange={() => toggleCategory(cat)}
                        className="accent-green-600 h-4 w-4 cursor-pointer"
                      />
                      {cat}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Job Listings */}
          <section className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Available Jobs ({filteredJobs.length})
            </h2>

            {loading ? (
              <p className="text-center text-gray-500 animate-pulse">
                Loading jobs...
              </p>
            ) : filteredJobs.length === 0 ? (
              <div className="text-center bg-white py-10 rounded-2xl border border-gray-200 shadow-sm">
                <p className="text-gray-600">
                  No jobs found matching your filters.
                </p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredJobs.map((job) => (
                  <div
                    key={job._id}
                    className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col justify-between min-h-[320px]"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-lg font-bold text-gray-900 leading-snug">
                          {job.title}
                        </h3>
                        <span className="text-xs px-4 whitespace-nowrap py-1.5 rounded-full bg-green-100 text-green-700 font-medium">
                          {job.jobType || "N/A"}
                        </span>
                      </div>

                      <p className="text-sm text-gray-700">
                        <span className="font-semibold">Company:</span>{" "}
                        {job.company?.name || job.company || "Unknown"}
                      </p>

                      <p className="flex items-center text-gray-500 text-sm mt-1">
                        <FiMapPin className="w-4 h-4 mr-1 text-green-600" />
                        {job.location || "Not specified"}
                      </p>

                      <div className="mt-3">
                        <span className="inline-block bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full">
                          {job.category || "General"}
                        </span>
                      </div>

                      <p className="mt-5 font-semibold text-gray-900 text-lg">
                        {job.salaryRange || job.salary || "Negotiable"}
                      </p>
                    </div>

                    <button
                      onClick={() => handleApply(job)}
                      disabled={appliedJobs.includes(job._id)}
                      className={`w-full py-2.5 mt-6 rounded-lg font-semibold transition-colors shadow-sm ${
                        appliedJobs.includes(job._id)
                          ? "bg-gray-400 text-white cursor-not-allowed"
                          : "bg-green-600 text-white hover:bg-green-700 active:bg-green-800"
                      }`}
                    >
                      {appliedJobs.includes(job._id) ? "Applied" : "Apply Now"}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Apply Modal */}
      {showApplyModal && selectedJob && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl relative">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Apply for {selectedJob.title}
            </h2>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Education"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Experience"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Skills (comma separated)"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
              <textarea
                placeholder="Cover Letter"
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 h-24 focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
              <input
                type="file"
                onChange={(e) => setCvFile(e.target.files[0])}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </div>

            <div className="flex justify-end mt-5 space-x-3">
              <button
                onClick={submitApplication}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow"
              >
                Submit
              </button>
              <button
                onClick={() => setShowApplyModal(false)}
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg"
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
