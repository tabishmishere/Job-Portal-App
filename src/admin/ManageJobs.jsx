import React, { useEffect, useState } from "react";
import { fetchAllJobsAdmin, deleteJob } from "../api/adminApi.js";

const ManageJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadJobs = async () => {
    try {
      setLoading(true);
      const res = await fetchAllJobsAdmin();
      setJobs(res.jobs || []);
    } catch (err) {
      console.error("loadJobs:", err);
      alert(err.response?.data?.message || "Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadJobs(); }, []);

  const handleDelete = async (job) => {
    if (!confirm(`Delete job "${job.title}"?`)) return;
    try {
      await deleteJob(job._id);
      setJobs((prev) => prev.filter(j => j._id !== job._id));
    } catch (err) {
      console.error("deleteJob:", err);
      alert(err.response?.data?.message || "Failed to delete job");
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-green-900">Manage Jobs</h1>
        <div className="text-sm text-gray-600">{jobs.length} jobs</div>
      </div>

      {loading ? (
        <div className="p-8 text-center">Loading jobs...</div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left">
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Company</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Salary</th>
                <th className="px-4 py-3">Recruiter</th>
                <th className="px-4 py-3">Posted</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.length === 0 && (
                <tr><td colSpan={7} className="p-6 text-center text-gray-500">No jobs found.</td></tr>
              )}
              {jobs.map((job) => (
                <tr key={job._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3 font-semibold">{job.title}</td>
                  <td className="px-4 py-3">{job.company?.name || "-"}</td>
                  <td className="px-4 py-3">{job.location || "-"}</td>
                  <td className="px-4 py-3">{job.salaryRange || "Negotiable"}</td>
                  <td className="px-4 py-3">{job.recruiterId ? `${job.recruiterId.name} (${job.recruiterId.email})` : "—"}</td>
                  <td className="px-4 py-3">{new Date(job.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => handleDelete(job)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                        Delete
                      </button>
                      {/* optionally add view/edit job actions */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
};

export default ManageJobs;
