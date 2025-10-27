import React, { useState } from "react";
import OurProcess from "./OurProcess";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Header = () => {
  const [popularJobs, setPopularJobs] = useState([
    "Design",
    "Programming",
    "Business",
    "UI/UX",
    "Video Editing",
  ]);

  return (
    <>
      <header className="selection:bg-green-500 selection:text-white bg-gradient-to-r from-green-100 to-white py-16 px-6 min-h-screen flex items-center justify-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center justify-center text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-black leading-tight mb-6">
            Find & Hire <br />
            <span className="text-green-600">Experts for any Job</span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-10 max-w-2xl">
            Find the job that matches your skills and passion. Connect with
            companies worldwide and make your next big move.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-10 w-full sm:w-auto justify-center">
            <Link
      to="/sign-up"
      className="bg-green-600 flex items-center justify-center gap-3 cursor-pointer text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-green-700 transition duration-200"
    >
      Get started{" "}
      <span>
        <FaArrowRightLong />
      </span>
    </Link>
            <button className="border border-green-600 cursor-pointer text-green-600 px-6 py-3 rounded-full text-lg font-semibold hover:bg-green-600 hover:text-white transition duration-200">
              Try demo
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
            <span className="text-sm sm:text-base text-gray-800 font-medium">
              Popular:
            </span>
            <div className="flex flex-wrap justify-center gap-x-3 text-sm sm:text-base text-gray-600">
              {popularJobs.map((job, index) => (
                <p
                  key={index}
                  className="hover:text-green-600 cursor-pointer transition"
                >
                  {job}
                </p>
              ))}
            </div>
          </div>
        </div>
      </header>
      <OurProcess />
    </>
  );
};

export default Header;
