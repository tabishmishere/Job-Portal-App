import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUser, FaBriefcase, FaSignOutAlt } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import { IoPersonSharp } from "react-icons/io5";
import { PiPersonSimpleRunBold } from "react-icons/pi";

const RecruiterSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    {
      name: "Dashboard",
      icon: <FaUser className="font-bold text-2xl" />,
      path: "/recruiter/dashboard",
    },
    {
      name: "My Profile",
      icon: <IoPersonSharp className="font-bold text-2xl" />,
      path: "/recruiter/profile",
    },
    {
      name: "Add Job",
      icon: <FaCirclePlus className="font-bold text-2xl" />,
      path: "/recruiter/add-job",
    },
    {
      name: "Manage Jobs",
      icon: <FaBriefcase className="font-bold text-2xl" />,
      path: "/recruiter/job-management",
    },
    {
      name: "Applicants",
      icon: <PiPersonSimpleRunBold className="font-bold text-2xl" />,
      path: "/recruiter/applicants",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="flex flex-col h-screen justify-between bg-white">
      {/* User Info */}
      <div className="p-8 text-center">
        <img
          src="https://media.licdn.com/dms/image/v2/D4D35AQE6TxKWU9n4Ug/profile-framedphoto-shrink_400_400/B4DZoaSfWcGkAc-/0/1761377646288?e=1762250400&v=beta&t=8BypDEAGYsgIv1e-xje2btNduKo3BgT48fuzdvh3fD0"
          alt="User"
          className="w-20 h-20 mx-auto rounded-full border-4 border-[#b6ef72] shadow-md"
        />
        <h3 className="mt-4 text-xl font-semibold text-gray-800">
          Komal Qureshi
        </h3>
        <p className="text-sm text-gray-500">Senior Recruiter</p>

        {/* Stylish Divider */}
        <hr className="mt-6 border-t-2 w-4/5 mx-auto" />
      </div>

      {/* Menu */}
      <nav className="flex-1 px-6 space-y-3">
        <ul className="space-y-3">
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

      {/* Footer */}
      <div className="p-6">
        <hr className="mb-5 border-t-2 w-4/5 mx-auto" />

        <div className="mb-5">
          <p className="text-sm text-gray-600 mb-2">Profile Completion</p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full"
              style={{ width: "100%" }}
            ></div>
          </div>
          <span className="text-xs text-gray-500 mt-1 inline-block">100%</span>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full cursor-pointer px-5 py-3 rounded-xl text-gray-700 font-medium hover:text-red-600 hover:bg-red-50 transition-all"
        >
          <FaSignOutAlt className="text-xl" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default RecruiterSidebar;
