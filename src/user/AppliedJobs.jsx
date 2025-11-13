import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AppliedJobs = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchApplications = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/applications/user/${user.id || user._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setApplications(res.data.applications || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load applied jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [user, navigate, token]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <p className="text-lg text-gray-600 animate-pulse">Loading your jobs...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <p className="text-red-600 text-lg font-medium">{error}</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-12">
          My <span className="text-green-600">Applied Jobs</span>
        </h1>

        {applications.length === 0 ? (
          <div className="text-center bg-white shadow-lg rounded-2xl p-10 max-w-md mx-auto">
            <p className="text-gray-600 text-lg">
              You haven’t applied to any jobs yet.
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Explore jobs and start applying to kickstart your career!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {applications.map((app) => (
              <div
                key={app._id}
                className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col justify-between"
              >
                {/* Top Section */}
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <h2 className="text-xl font-semibold text-gray-800 leading-snug line-clamp-2 pr-2">
                      {app.job?.title || "Untitled Job"}
                    </h2>
                    <span className="bg-green-50 text-green-700 text-xs px-3 py-1 rounded-full capitalize whitespace-nowrap">
                      {app.status || "Pending"}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-2 text-gray-600 mb-4">
                    <p className="text-sm">
                      <span className="font-bold text-gray-700">Company:</span>{" "}
                      <span className="text-gray-800">{app.job?.company?.name || "N/A"}</span>
                    </p>
                    <p className="text-sm">
                      <span className="font-bold text-gray-700">Applied on:</span>{" "}
                      {new Date(app.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Bottom Button */}
                <div className="mt-auto pt-4 border-t border-gray-100">
                  <button
                    onClick={() => navigate(`/jobs/${app.job?._id}`)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 px-4 rounded-lg cursor-pointer transition-all duration-200 text-center shadow-sm hover:shadow-md"
                  >
                    View Job Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AppliedJobs;
