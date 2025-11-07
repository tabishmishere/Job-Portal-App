import React, { useEffect, useState } from "react";
import axios from "axios";

const ApplicationOverview = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user || !token) {
          window.location.href = "/login";
          return;
        }

        const res = await axios.get(
          `http://localhost:5000/api/applications/user/${user._id || user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setAppliedJobs(res.data.applications || []);
      } catch (err) {
        console.error(err);
        setError(
          err.response?.data?.message ||
            "Failed to load applied jobs. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAppliedJobs();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 py-12 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <h1 className="text-4xl font-extrabold text-gray-900 mb-10 text-center">
          Your <span className="text-green-600">Applied Jobs</span>
        </h1>

        {/* Loading State */}
        {loading && (
          <p className="text-center text-gray-600 font-medium animate-pulse">
            Loading your applications...
          </p>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center text-red-600 bg-red-50 border border-red-200 rounded-lg py-3 px-4 font-medium max-w-lg mx-auto">
            {error}
          </div>
        )}

        {/* Empty State */}
        {!loading && appliedJobs.length === 0 && !error && (
          <div className="text-center bg-white/70 backdrop-blur-md border border-gray-200 rounded-3xl shadow-md p-10 max-w-xl mx-auto">
            <img
              src="/no-jobs.svg"
              alt="No Applications"
              className="w-40 mx-auto mb-4 opacity-90"
            />
            <h2 className="text-2xl font-semibold text-gray-700">
              No Applied Jobs Yet
            </h2>
            <p className="text-gray-500 mt-2">
              Once you apply for a job, it will appear here.
            </p>
          </div>
        )}

        {/* Job Cards Grid */}
        {!loading && appliedJobs.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {appliedJobs.map((job) => (
              <div
                key={job._id}
                className="bg-white/70 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-md p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-xl font-semibold text-gray-800 truncate">
                    {job.jobTitle}
                  </h2>
                  <span
                    className={`px-3 py-1 text-xs rounded-full font-medium ${
                      job.status === "accepted"
                        ? "bg-green-100 text-green-700"
                        : job.status === "rejected"
                        ? "bg-red-100 text-red-600"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {job.status || "Pending"}
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-2">
                  <span className="font-semibold text-gray-700">
                    Company:
                  </span>{" "}
                  {job.companyName || "N/A"}
                </p>

                <p className="text-gray-600 text-sm mb-2">
                  <span className="font-semibold text-gray-700">
                    Location:
                  </span>{" "}
                  {job.location || "Remote"}
                </p>

                <p className="text-gray-500 text-sm mt-4">
                  Applied on:{" "}
                  <span className="font-medium text-gray-700">
                    {new Date(job.appliedAt).toLocaleDateString()}
                  </span>
                </p>

                <div className="mt-6 flex justify-end">
                  <a
                    href={`/jobs/${job.jobId}`}
                    className="text-green-600 font-medium text-sm hover:underline hover:text-green-700 transition"
                  >
                    View Job →
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationOverview;
