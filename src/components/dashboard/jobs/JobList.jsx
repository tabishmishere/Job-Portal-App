import axios from "axios";
import React, { useEffect, useState } from "react";

const JobList = () => {
  const [data, setData] = useState([]);

  const fetchJobsList = async () => {
    try {
      const response = await axios.get("https://jsonfakery.com/jobs");
      setData(response.data);
      console.log(response);
    } catch (error) {
      console.error("Error fetching jobs data", error);
    }
  };

  useEffect(() => {
    fetchJobsList();
  }, []);

  return (
    <div className="container mx-auto p-4 pt-20">
      <h2 className="text-center text-4xl font-semibold mb-6">
        Available Jobs
      </h2>
      {data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.slice(0, 32).map((job) => (
            <div
              key={job.id}
              className="p-6 border border-gray-200 rounded-lg shadow-lg bg-white hover:bg-gray-50 transition-all duration-300"
            >
              <h3 className="text-2xl font-semibold text-green-500">
                {job.job_category}
              </h3>
              <p className="text-gray-700 mt-2">{job.employment_type}</p>
              <p className="mt-3 text-sm text-gray-500">
                Location: {job.location}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Category: {job.qualifications}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-4">No jobs available.</p>
      )}
    </div>
  );
};

export default JobList;
