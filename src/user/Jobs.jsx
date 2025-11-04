import React, { useState } from "react";
import { FiMapPin } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

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

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const jobType = useState(["Full-time", "Part-time", "Internship", "Remote"]);
  const jobCategory = useState([
    "Programming",
    "Design",
    "Marketing",
    "Sales",
    "Content Writing",
  ]);

  const jobs = [
    {
      id: 1,
      title: "Front-End Developer",
      company: "TechNova Solutions",
      location: "Remote",
      type: "Full-time",
      category: "Programming",
      salary: "$800 - $1200",
    },
    {
      id: 2,
      title: "UI/UX Designer",
      company: "Tkxel",
      location: "Lahore",
      type: "Part-time",
      category: "Design",
      salary: "$500 - $900",
    },
    {
      id: 3,
      title: "Digital Marketing Intern",
      company: "Systems Limited",
      location: "Lahore",
      type: "Internship",
      category: "Marketing",
      salary: "$200 - $400",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <header className="flex justify-between items-center p-4 bg-white shadow-md">
        <p className="text-2xl font-extrabold text-black">
          Jobi<span className="text-green-500 text-2xl">.</span>
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
              className="w-10 h-10 rounded-full cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50">
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

      {/* Main Content */}
      <main className="p-4 md:p-12">
        {/* Title */}
        <div className="text-center mb-10 mt-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 flex items-center justify-center">
            Find your Dream Job Here!
          </h1>
          <p className="text-lg text-gray-500 mt-2">
            Discover opportunities that match your passion
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-sm">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-12 sm:gap-4">
            <div className="relative col-span-1 sm:col-span-7">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search jobs..."
                className="border border-gray-300 rounded-lg p-3 pl-10 w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-150"
              />
            </div>

            <div className="relative col-span-1 sm:col-span-3">
              <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="e.g. Location"
                className="border border-gray-300 rounded-lg p-3 pl-10 w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-150"
              />
            </div>

            <button className="col-span-1 sm:col-span-2 bg-green-600 cursor-pointer text-white font-semibold py-3 px-8 rounded-lg hover:bg-green-700 transition duration-200 ease-in-out w-full">
              Search Jobs
            </button>
          </div>
        </div>

        {/* Filters & Job List */}
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:space-x-8 mt-8">
          {/* Filters */}
          <aside className="md:w-1/5 bg-white p-6 rounded-xl shadow-sm border border-gray-200 md:h-fit md:sticky md:top-24">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Filters</h2>

            {/* Job Type */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">
                Job Type
              </h3>
              <div className="flex flex-col gap-3">
                {jobType[0].map((type) => (
                  <label
                    key={type}
                    className="flex items-center gap-3 text-gray-600 hover:text-green-600 cursor-pointer transition"
                  >
                    <input
                      type="checkbox"
                      className="accent-green-600 h-4 w-4 cursor-pointer"
                    />
                    <span className="text-sm font-medium">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            <hr className="my-4 border-gray-300" />

            {/* Job Category */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3">
                Category
              </h3>
              <div className="flex flex-col gap-3">
                {jobCategory[0].map((cat) => (
                  <label
                    key={cat}
                    className="flex items-center gap-3 text-gray-600 hover:text-green-600 cursor-pointer transition"
                  >
                    <input
                      type="checkbox"
                      className="accent-green-600 h-4 w-4 cursor-pointer"
                    />
                    <span className="text-sm font-medium">{cat}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Job Listings */}
          <section className="md:w-4/5">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Available Jobs ({jobs.length})
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white shadow-sm rounded-xl p-5 hover:shadow-md transition"
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {job.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-1">{job.company}</p>
                  <p className="flex items-center text-gray-500 text-sm mb-3">
                    <FiMapPin className="w-4 h-4 mr-1" /> {job.location}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                      {job.type}
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                      {job.category}
                    </span>
                  </div>
                  <p className="text-gray-700 font-semibold mb-3">
                    {job.salary}
                  </p>
                  <button className="w-full cursor-pointer bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition">
                    Apply Now
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Jobs;
