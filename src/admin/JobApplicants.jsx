import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const JobApplicants = () => {
  const [postedJobs, setPostedJobs] = useState([
    {
      id: 1,
      userName: "Azan Atif",
      title: "DevOps",
      location: "Lahore",
      applicants: 25,
      status: "Accepted",
      resume: "https://example.com/resume1.pdf",
    },
    {
      id: 2,
      userName: "Arsal Majid",
      title: "MERN Stack Developer",
      location: "Lahore",
      applicants: 18,
      status: "Rejected",
      resume: "https://example.com/resume1.pdf",
    },
    {
      id: 3,
      userName: "Muhammad Asad",
      title: "QA Engineer",
      location: "Islamabad",
      applicants: 30,
      status: "Accepted",
      resume: "https://example.com/resume1.pdf",
    },
    {
      id: 4,
      userName: "Ahmad Majid",
      title: "Frontend Developer",
      location: "Karachi",
      applicants: 12,
      status: "Rejected",
      resume: "https://example.com/resume1.pdf",
    },
    {
      id: 5,
      userName: "Muhammad Asad",
      title: "Backend Developer",
      location: "Lahore",
      applicants: 7,
      status: "Accepted",
      resume: "https://example.com/resume1.pdf",
    },
  ]);

  const handleStatusChange = (id, status) => {
    setPostedJobs((prevJobs) =>
      prevJobs.map((job) => (job.id === id ? { ...job, status: status } : job))
    );
  };

  return (
    <div className="flex-1 p-4 sm:p-8 bg-[rgba(211,239,224,0.3)] rounded-xl shadow-lg min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-green-900">
          Job Applicants
        </h2>
      </div>

      <div className="bg-white rounded-xl shadow-lg">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full table-auto text-sm">
            <thead>
              <tr>
                <th className="py-4 px-6 text-left font-medium text-gray-900">
                  ID
                </th>
                <th className="py-4 px-6 text-left font-medium text-gray-900">
                  User Name
                </th>
                <th className="py-4 px-6 text-left font-medium text-gray-900">
                  Job Title
                </th>
                <th className="py-4 px-6 text-left font-medium text-gray-900">
                  Location
                </th>
                <th className="py-4 px-6 text-left font-medium text-gray-900">
                  No of Jobs
                </th>
                <th className="py-4 px-6 text-left font-medium text-gray-900">
                  Resume
                </th>
                <th className="py-4 px-6 text-left font-medium text-gray-900">
                  Status
                </th>
                <th className="py-4 px-6 text-left font-medium text-gray-900">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {postedJobs.length > 0 ? (
                postedJobs.map((job) => (
                  <tr
                    key={job.id}
                    className="border-t hover:bg-gray-100 transition-all"
                  >
                    <td className="py-4 px-6 text-gray-800">{job.id}</td>
                    <td className="py-4 px-6 text-gray-800">{job.userName}</td>
                    <td className="py-4 px-6 text-gray-800">{job.title}</td>
                    <td className="py-4 px-6 text-gray-600">{job.location}</td>
                    <td className="py-4 px-6 text-gray-600">
                      {job.applicants}
                    </td>
                    <td className="py-4 px-6">
                      {job.resume ? (
                        <a
                          href={job.resume}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-600 hover:underline"
                        >
                          View Resume
                        </a>
                      ) : (
                        <span className="text-gray-500">No Resume</span>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`font-semibold ${
                          job.status === "Accepted"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {job.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <select
                        value={job.status}
                        onChange={(e) =>
                          handleStatusChange(job.id, e.target.value)
                        }
                        className="bg-white text-sm text-gray-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300"
                      >
                        <option value="Accepted">Accept</option>
                        <option value="Rejected">Reject</option>
                      </select>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-6 text-gray-500">
                    No job applicants yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="block md:hidden p-4 space-y-4">
          {postedJobs.length > 0 ? (
            postedJobs.map((job) => (
              <div
                key={job.id}
                className="bg-gray-50 rounded-lg p-4 shadow border border-gray-200"
              >
                <div className="mb-2">
                  <p className="text-sm text-gray-500">User Name</p>
                  <p className="text-base font-semibold text-gray-800">
                    {job.userName}
                  </p>
                </div>
                <div className="mb-2">
                  <p className="text-sm text-gray-500">Job Title</p>
                  <p className="text-base text-gray-700">{job.title}</p>
                </div>
                <div className="mb-2">
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="text-base text-gray-700">{job.location}</p>
                </div>
                <div className="mb-2">
                  <p className="text-sm text-gray-500">Applicants</p>
                  <p className="text-base text-gray-700">{job.applicants}</p>
                </div>
                <div className="mb-2">
                  <p className="text-sm text-gray-500">Resume</p>
                  {job.resume ? (
                    <a
                      href={job.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:underline"
                    >
                      View Resume
                    </a>
                  ) : (
                    <span className="text-gray-500">No Resume</span>
                  )}
                </div>
                <div className="mb-2">
                  <p className="text-sm text-gray-500">Status</p>
                  <span
                    className={`font-semibold ${
                      job.status === "Accepted"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {job.status}
                  </span>
                </div>
                <div className="flex space-x-4 pt-2">
                  <select
                    value={job.status}
                    onChange={(e) => handleStatusChange(job.id, e.target.value)}
                    className="bg-white text-sm text-gray-700 border border-gray-300 rounded-md shadow-sm"
                  >
                    <option value="Accepted">Accept</option>
                    <option value="Rejected">Reject</option>
                  </select>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500">
              No job applicants yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobApplicants;
