import React, { useState } from "react";

const JobForm = ({ setPostedJobs, setIsModalOpen }) => {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    location: "",
    applicants: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPostedJobs((prev) => [...prev, { id: prev.length + 1, ...formData }]);
    setIsModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50  bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h3 className="text-2xl text-center font-semibold mb-4 text-gray-800">
          Post a New Job
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Job Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
          <input
            type="number"
            name="applicants"
            placeholder="Applicants"
            value={formData.applicants}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
          <div className="flex justify-center space-x-4 pt-2">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 bg-gray-300 cursor-pointer rounded-full hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-700 text-white cursor-pointer rounded-full hover:bg-green-800 transition"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobForm;
