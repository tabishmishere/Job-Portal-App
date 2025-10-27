import React from "react";
import { FiMapPin } from "react-icons/fi";

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

// const BriefcaseIcon = ({ className }) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     className={className}
//   >
//     <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
//     <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
//   </svg>
// );

const Jobs = () => {
  return (
    <div className="min-h-screen bg-gray-50 mt-10">
      {/* Main Content Area */}
      <main className="p-4 md:p-12">
        {/* Title and Subtitle Block */}
        <div className="text-center mb-10 mt-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 flex items-center justify-center">
            {/* Gray Briefcase Icon (Inline SVG)
            <BriefcaseIcon className="w-8 h-8 md:w-10 md:h-10 mr-3 text-gray-500" /> */}
            Find your <span className="text-green-700 ml-2">Dream Job</span>.
          </h1>
          <p className="text-lg text-gray-500 mt-3">
            Discover opportunities that match your passion <br /> and skills
          </p>
        </div>

        {/* Search Bar Container */}
        <div className="max-w-6xl mx-auto p-6 bg-white rounded-2xl border border-gray-200 shadow-md">
          {/* Grid Layout for 2.5fr : 1fr : 1fr ratio (approximated as 7:3:2 columns).
            sm: (640px and up): All elements are on a single horizontal row (sm:grid-cols-12)
          */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-12 sm:gap-6">
            {/* Job Title/Keyword Input (2.5fr -> sm:col-span-7) */}
            <div className="relative col-span-1 sm:col-span-7">
              {/* Gray Search Icon (Inline SVG) */}
              <SearchIcon className="absolute left-3 top-6 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for jobs..."
                className="border border-gray-300 rounded-xl p-3 pl-10 w-full focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 transition duration-150"
              />
            </div>

            {/* Location Input (1fr -> sm:col-span-3) */}
            <div className="relative col-span-1 sm:col-span-3">
              {/* Gray Location Icon (Inline SVG) */}
              <FiMapPin className="absolute left-3 top-6 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="e.g, Remote"
                className="border border-gray-300 rounded-xl p-3 pl-10 w-full focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 transition duration-150"
              />
            </div>

            {/* Search Jobs Button (1fr -> sm:col-span-2) */}
            <button className="col-span-1 sm:col-span-2 bg-green-900 cursor-pointer text-white font-semibold py-2 px-4 rounded-xl hover:bg-green-900 shadow-sm hover:shadow-md transition duration-200 ease-in-out w-full">
              Search Jobs
            </button>
          </div>
        </div>

        <br />

        <div>
          {/* 4. Filter and Job List Section (20% / 80% Split) */}
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:space-x-8">
            {/* Filter Sidebar (20% Width) */}
            <aside className="md:w-1/5 bg-white p-6 rounded-2xl border border-gray-200 shadow-md mb-8 md:mb-0">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Filters
              </h2>
              <hr  className="mb-4"/>
              {/* Filter Options (e.g., Job Type, Experience Level, etc.) */}
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2 text-gray-700">Job Type</h3>
                  <div className="space-y-2 text-gray-600">
                    <label className="flex items-center cursor-pointer hover:text-green-700">
                      <input
                        type="checkbox"
                        className="mr-2 accent-green-700 cursor-pointer"
                      />
                      Full-time
                    </label>
                    <label className="flex items-center cursor-pointer hover:text-green-700">
                      <input
                        type="checkbox"
                        className="mr-2 accent-green-700 cursor-pointer"
                      />
                      Part-time
                    </label>
                    <label className="flex items-center cursor-pointer hover:text-green-700">
                      <input
                        type="checkbox"
                        className="mr-2 accent-green-700 cursor-pointer"
                      />
                      Internship
                    </label>
                  </div>
                </div>
                {/* Additional filters can be added here */}
              </div>
            </aside>

            {/* Job Listings Area (80% Width) */}
            <section className="md:w-4/5">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center justify-between">
                <span>Available Jobs (0)</span>
                <span className="text-sm text-gray-500 font-normal">
                  Updated recently
                </span>
              </h2>
              <div className="text-center p-10 bg-white rounded-2xl border border-gray-200 shadow-md">
                <p className="text-lg text-gray-500">
                  Loading dream jobs...
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Jobs;
