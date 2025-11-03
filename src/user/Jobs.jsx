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

const BriefcaseIcon = ({ className }) => (
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
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <header className="flex justify-between items-center p-4 bg-white shadow-md">
        <p className="text-2xl font-extrabold text-black">
          Jobi<span className="text-green-500 text-2xl">.</span>
        </p>

        {/* Profile Icon */}
        {user && (
          <div className="relative">
            <img src={
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

      {/* Main Content Area */}
      <main className="p-4 md:p-12">
        {/* Title */}
        <div className="text-center mb-10 mt-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 flex items-center justify-center">
            <BriefcaseIcon className="w-8 h-8 md:w-10 md:h-10 mr-3 text-gray-500" />
            Find your Dream Job Here!
          </h1>
          <p className="text-lg text-gray-500 mt-2">
            Discover opportunities that match your passion
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl border-black border shadow-sm">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-12 sm:gap-4">
            <div className="relative col-span-1 sm:col-span-7">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for jobs..."
                className="border border-gray-300 rounded-lg p-3 pl-10 w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-150"
              />
            </div>

            <div className="relative col-span-1 sm:col-span-3">
              <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Location (e.g., City, Remote, State)"
                className="border border-gray-300 rounded-lg p-3 pl-10 w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-150"
              />
            </div>

            <button className="col-span-1 sm:col-span-2 bg-green-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-green-700 transition duration-200 ease-in-out w-full">
              Search Jobs
            </button>
          </div>
        </div>

        {/* Filters & Job List */}
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:space-x-8 mt-8">
          {/* Filters */}
          <aside className="md:w-1/5 bg-white p-6 rounded-xl border-black border shadow-sm mb-8 md:mb-0">
            <h2 className="text-xl font-semibold mb-4">Filters</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Job Type</h3>
                <div className="space-y-1">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Full-time
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Part-time
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Internship
                  </label>
                </div>
              </div>
            </div>
          </aside>

          {/* Job Listings */}
          <section className="md:w-4/5">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Available Jobs (0)
            </h2>
            <div className="text-center p-8 bg-white rounded-xl border-black border shadow-sm">
              <p className="text-lg text-gray-500">Loading dream jobs...</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Jobs;
