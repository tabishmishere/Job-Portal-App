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

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8">
        My Applied Jobs
      </h1>

      {applications.length === 0 ? (
        <p className="text-gray-600 text-lg text-center">
          You haven’t applied to any jobs yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {applications.map((app) => (
            <div
              key={app._id}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-200"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {app.job?.title || "Job Title"}
              </h2>
              <p className="text-gray-600 mb-1">
                Company: {app.job?.company?.name || "N/A"}
              </p>
              <p className="text-gray-600 mb-1">
                Status: <span className="capitalize">{app.status}</span>
              </p>
              <p className="text-gray-500 text-sm">
                Applied on: {new Date(app.createdAt).toLocaleDateString()}
              </p>

              <button
              onClick={() => navigate(`/jobs/${app.job?._id}`)}
                className="mt-4 text-green-600 hover:underline"
              >
                View Job Details →
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppliedJobs;
