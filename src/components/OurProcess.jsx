import React from "react";
import { MdAccountCircle, MdOutlineWork } from "react-icons/md";
import { FaUserCog } from "react-icons/fa";
import CurvedDottedArrow from "./CurvedDottedArrow";

const OurProcess = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-3xl sm:text-4xl lg:text-6xl text-center font-bold text-black mt-12 leading-snug mb-12 selection:bg-green-500 selection:text-white">
        How our <span className="text-green-500 italic">process</span> works?
      </h2>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 px-4 lg:px-16 mb-12">
        {/* Step 1 */}
        <div className="flex flex-col items-center bg-white rounded-lg p-8 text-center max-w-sm">
          <MdAccountCircle className="text-4xl text-green-500 lg:text-6xl mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Create Account</h3>
          <p className="text-gray-600 text-base leading-relaxed">
            Create an account to get started. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>

        <div className="hidden lg:block">
          <CurvedDottedArrow />
        </div>

        {/* Step 2 */}
        <div className="flex flex-col items-center bg-white rounded-lg p-8 text-center max-w-sm">
          <FaUserCog className="text-4xl text-green-500 lg:text-6xl mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Complete Your Profile</h3>
          <p className="text-gray-600 text-base leading-relaxed">
            Fill in your details to complete your profile. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem?
          </p>
        </div>

        {/* Arrow 2 */}
        <div className="hidden lg:block">
          <CurvedDottedArrow />
        </div>

        {/* Step 3 */}
        <div className="flex flex-col items-center bg-white rounded-lg p-8 text-center max-w-sm">
          <MdOutlineWork className="text-4xl text-green-500 lg:text-6xl mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Apply for Jobs</h3>
          <p className="text-gray-600 text-base leading-relaxed">
            Start applying for jobs right away. Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque!
          </p>
        </div>
      </div>
    </div>
  );
};

export default OurProcess;
