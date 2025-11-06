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
    <div className="p-6 min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-center">Applicants</h2>
      {applications.length === 0 ? (
        <p>No applications yet.</p>
      ) : (
        <table className="w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Education</th>
              <th className="p-3">Experience</th>
              <th className="p-3">Skills</th>
              <th className="p-3">CV</th>
              <th className="p-3">Job Title</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app._id} className="border-b hover:bg-gray-50">
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
                      className="text-blue-500 underline"
                    >
                      View CV
                    </a>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td className="p-3">{app.jobId?.title}</td>
                <td className="p-3">{app.status}</td>
                <td className="p-3">
                  <div className="flex gap-2">
                    <button onClick={() => updateStatus(app._id, "accepted")} className="bg-green-500 text-white px-5 py-2 rounded cursor-pointer hover:bg-green-600">
                      Accept
                    </button>
                    <button onClick={() => updateStatus(app._id, "rejected")} className="bg-red-500 text-white px-5 py-2 rounded cursor-pointer hover:bg-red-600">
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RecruiterApplicants;
