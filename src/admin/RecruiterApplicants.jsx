import { useEffect, useState } from "react";
import axios from "axios";

const RecruiterApplicants = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "http://localhost:5000/api/applications/recruiter",
        { headers: { Authorization: `Bearer ${token}` } }
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
    } catch (err) {
      console.error(err);
      alert("Failed to update");
    }
  };

  if (loading) return <p>Loading...</p>;

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
                  <th className="p-3 text-left font-semibold">Name</th>
                  <th className="p-3 text-left font-semibold">Email</th>
                  <th className="p-3 text-left font-semibold">Education</th>
                  <th className="p-3 text-left font-semibold">Experience</th>
                  <th className="p-3 text-left font-semibold">Skills</th>
                  <th className="p-3 text-left font-semibold">CV</th>
                  <th className="p-3 text-left font-semibold">Job Title</th>
                  <th className="p-3 text-left font-semibold">Status</th>
                  <th className="p-3 text-center font-semibold">Actions</th>
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
                    <td className="p-3">{app.applicantId?.name}</td>
                    <td className="p-3">{app.applicantId?.email}</td>
                    <td className="p-3">{app.education || "N/A"}</td>
                    <td className="p-3">{app.experience || "N/A"}</td>
                    <td className="p-3">{app.skills?.join(", ") || "N/A"}</td>
                    <td className="p-3">
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
                    <td className="p-3">{app.jobId?.title}</td>
                    <td className="p-3 capitalize font-medium text-gray-700">
                      {app.status}
                    </td>
                    <td className="p-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => updateStatus(app._id, "accepted")}
                          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => updateStatus(app._id, "rejected")}
                          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                        >
                          Reject
                        </button>
                      </div>
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
