import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaUser, FaBriefcase, FaSignOutAlt } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import { IoPersonSharp } from "react-icons/io5";
import { PiPersonSimpleRunBold } from "react-icons/pi";

const RecruiterSidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", icon: <FaUser className="font-bold text-2xl" />, path: "/recruiter/dashboard" },
    { name: "My Profile", icon: <IoPersonSharp className="font-bold text-2xl" />, path: "/recruiter/profile" },
    { name: "Add Job", icon: <FaCirclePlus className="font-bold text-2xl" />, path: "/recruiter/add-job" },
    {
      name: "Manage Jobs",
      icon: <FaBriefcase className="font-bold text-2xl" />,
      path: "/recruiter/job-management",
    },
    {
      name: "Applicants",
      icon: <PiPersonSimpleRunBold className="font-bold text-2xl" />,
      path: "/recruiter/job-applicants",
    },
  ];

  return (
    <div className=" h-screen flex flex-col justify-evenly">
      {/* User Info */}
      <div className="p-6 text-center border-b">
        <img
          src="https://media.licdn.com/dms/image/v2/D4D35AQE6TxKWU9n4Ug/profile-framedphoto-shrink_400_400/B4DZoaSfWcGkAc-/0/1761377646288?e=1762250400&v=beta&t=8BypDEAGYsgIv1e-xje2btNduKo3BgT48fuzdvh3fD0"
          alt="User"
          className="w-20 h-20 mx-auto rounded-full border-4 border-[#b6ef72]"
        />
        <h3 className="mt-3 text-xl font-semibold text-gray-800">
          Komal Qureshi
        </h3>
        <p className="text-sm text-gray-500">Senior Recruiter</p>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-5">
        <ul className="space-y-4">
          {menuItems.map((item, index) => {
            const active = location.pathname === item.path;
            return (
              <li key={index}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-4 px-5 py-3 rounded-xl text-lg font-medium transition-all duration-200 ${
                    active
                      ? "bg-green-900 text-white shadow-md"
                      : "text-gray-700 hover:bg-[#dcfce7] hover:text-[#166534]"
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Profile Progress and Logout */}
      <div className="p-5 border-t">
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-1">Profile Complete</p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-[rgb(74,222,128)] h-2 rounded-full"
              style={{ width: "100%" }}
            ></div>
          </div>
          <span className="text-xs text-gray-500 mt-1 inline-block">100%</span>
        </div>

        <button className="flex items-center gap-4 mb-10 w-full cursor-pointer px-5 py-3 rounded-xl text-gray-700 font-medium hover:text-red-600 hover:bg-red-50 transition-all">
          <FaSignOutAlt className="text-xl" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default RecruiterSidebar;
