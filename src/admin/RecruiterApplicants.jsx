import { useEffect, useState } from "react";
import axios from "axios";

const RecruiterApplicants = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null);

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "http://localhost:5000/api/applications/recruiter",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setApplications(res.data.applications);
    } catch (err) {
      console.error(err);
      alert("Failed to load applicants");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/applications/${id}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchApplications();
      setOpenDropdown(null);
    } catch (err) {
      console.error(err);
      alert("Failed to update");
    }
  };

  if (loading) return <p className="text-center py-16 text-lg">Loading...</p>;

  return (
    <div className="min-h-screen bg-[rgba(211,239,224,0.3)] p-6">
      <div className="max-w-7xl mx-auto rounded-lg p-6">
        <h2 className="text-3xl font-semibold mb-6 text-center text-green-800">
          Job Applicants
        </h2>

        {applications.length === 0 ? (
          <p className="text-center text-gray-600">No applications yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse rounded-lg overflow-hidden">
              <thead className="bg-green-100 text-gray-800">
                <tr>
                  <th className="p-4 text-left font-semibold">Name</th>
                  <th className="p-4 text-left font-semibold">Email</th>
                  <th className="p-4 text-left font-semibold">Education</th>
                  <th className="p-4 text-left font-semibold">Experience</th>
                  <th className="p-4 text-left font-semibold">Skills</th>
                  <th className="p-4 text-left font-semibold">CV</th>
                  <th className="p-4 text-left font-semibold">Job Title</th>
                  <th className="p-4 text-left font-semibold">Status</th>
                  <th className="p-4 text-center font-semibold">Actions</th>
                </tr>
              </thead>

              <tbody>
                {applications.map((app, index) => (
                  <tr
                    key={app._id}
                    className={`border-b ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-gray-100 transition`}
                  >
                    <td className="p-4">{app.applicantId?.name}</td>
                    <td className="p-4">{app.applicantId?.email}</td>
                    <td className="p-4">{app.education || "N/A"}</td>
                    <td className="p-4">{app.experience || "N/A"}</td>
                    <td className="p-4">{app.skills?.join(", ") || "N/A"}</td>

                    <td className="p-4">
                      {app.cv ? (
                        <a
                          href={`http://localhost:5000${app.cv}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline hover:text-blue-800"
                        >
                          View CV
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </td>

                    <td className="p-4">{app.jobId?.title}</td>

                    <td className="p-4 capitalize font-medium text-gray-700">
                      {app.status}
                    </td>

                    {/* Dropdown Actions */}
                    <td className="p-4 text-center relative">
                      {/* Status Button */}
                      <button
                        onClick={() =>
                          setOpenDropdown(openDropdown === index ? null : index)
                        }
                        className="px-4 py-2 flex items-center justify-between gap-2 w-32 mx-auto bg-white border border-green-500"
                      >
                        <span
                          className={`capitalize ${
                            app.status === "accepted"
                              ? "text-green-600"
                              : app.status === "rejected"
                              ? "text-red-600"
                              : "text-gray-700"
                          }`}
                        >
                          {app.status}
                        </span>

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="currentColor"
                          className="w-4 h-4 text-gray-600"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>

                      {/* Dropdown */}
                      {openDropdown === index && (
                        <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-20 py-1">
                          <button
                            onClick={() => updateStatus(app._id, "accepted")}
                            className="w-full text-left px-4 py-2 text-sm hover:bg-green-50 text-green-700 transition"
                          >
                            Accept
                          </button>

                          <button
                            onClick={() => updateStatus(app._id, "rejected")}
                            className="w-full text-left px-4 py-2 text-sm hover:bg-red-50 text-red-700 transition"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecruiterApplicants;
