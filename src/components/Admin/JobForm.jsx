import React, { useState } from "react";
import { updateJob } from "../../api/JobApi.jsx";

const JobForm = ({ job, onClose, onJobUpdated }) => {
  const [formData, setFormData] = useState({
    title: job.title || "",
    company:
      typeof job.company === "object" ? job.company?.name || "" : job.company || "",
    location: job.location || "",
    datePosted: job.datePosted
      ? new Date(job.datePosted).toISOString().split("T")[0]
      : new Date(job.createdAt).toISOString().split("T")[0],
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedData = {
        title: formData.title,
        company: formData.company,
        location: formData.location,
        datePosted: formData.datePosted,
      };

      const { data } = await updateJob(job._id, updatedData);
      onJobUpdated(data.job);
      onClose();
    } catch (error) {
      console.error("Error updating job:", error);
      alert("Failed to update job");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-center">Edit Job</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          {["title", "company", "location"].map((field) => (
            <div key={field}>
              <label className="block font-medium capitalize">{field}</label>
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
              />
            </div>
          ))}

          <div>
            <label className="block font-medium">Date Posted</label>
            <input
              type="date"
              name="datePosted"
              value={formData.datePosted}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            />
          </div>

          <div className="flex justify-end space-x-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobForm;
