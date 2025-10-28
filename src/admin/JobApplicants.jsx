import React, { useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';

const JobApplicants = () => {
  const [postedJobs, setPostedJobs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex-1 p-4 sm:p-8 bg-[rgba(211,239,224,0.3)] rounded-xl shadow-lg min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-green-900">
          Job Applicants
        </h2>
      </div>

      <div className="bg-white rounded-xl shadow-lg">
        {/* Table View for larger screens */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full table-auto text-sm">
            <thead>
              <tr>
                <th className="py-4 px-6 text-left font-medium text-gray-900">Id</th>
                <th className="py-4 px-6 text-left font-medium text-gray-900">Job Title</th>
                <th className="py-4 px-6 text-left font-medium text-gray-900">Date</th>
                <th className="py-4 px-6 text-left font-medium text-gray-900">Location</th>
                <th className="py-4 px-6 text-left font-medium text-gray-900">No of Jobs</th>
                <th className="py-4 px-6 text-left font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {postedJobs.length > 0 ? (
                postedJobs.map((job) => (
                  <tr key={job.id} className="border-t hover:bg-gray-100 transition-all">
                    <td className="py-4 px-6 text-gray-800">{job.title}</td>
                    <td className="py-4 px-6 text-gray-600">{job.date}</td>
                    <td className="py-4 px-6 text-gray-600">{job.location}</td>
                    <td className="py-4 px-6 text-gray-600">{job.applicants}</td>
                    <td className="py-4 px-6">
                      <div className="flex space-x-4">
                        <button className="text-gray-600 hover:text-red-600 transition-all">
                          <MdDelete className="text-xl" />
                        </button>
                        <button className="text-gray-600 hover:text-green-600 transition-all">
                          <FaEdit className="text-xl" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center text-gray-500">
                    No jobs posted yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="block md:hidden p-4 space-y-4">
          {postedJobs.map((job) => (
            <div key={job.id} className="bg-gray-50 rounded-lg p-4 shadow border border-gray-200">
              <div className="mb-2">
                <p className="text-sm text-gray-500">Job Title</p>
                <p className="text-base font-semibold text-gray-800">{job.title}</p>
              </div>
              <div className="mb-2">
                <p className="text-sm text-gray-500">Date</p>
                <p className="text-base text-gray-700">{job.date}</p>
              </div>
              <div className="mb-2">
                <p className="text-sm text-gray-500">Location</p>
                <p className="text-base text-gray-700">{job.location}</p>
              </div>
              <div className="mb-2">
                <p className="text-sm text-gray-500">Applicants</p>
                <p className="text-base text-gray-700">{job.applicants}</p>
              </div>
              <div className="flex space-x-4 pt-2">
                <button className="text-gray-600 hover:text-red-600 transition-all">
                  <MdDelete className="text-xl" />
                </button>
                <button className="text-gray-600 hover:text-green-600 transition-all">
                  <FaEdit className="text-xl" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for posting job */}
      {isModalOpen && (
        <JobForm setPostedJobs={setPostedJobs} setIsModalOpen={setIsModalOpen} />
      )}
    </div>
  );
};

export default JobApplicants;
