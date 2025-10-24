import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaUser, FaBriefcase, FaSignOutAlt } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import { BiUserCircle } from "react-icons/bi";

const RecruiterSidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", icon: <FaUser />, path: "/dashboard" },
    { name: "My Profile", icon: <BiUserCircle />, path: "/admin/profile" },
    { name: "Add Job", icon: <FaCirclePlus />, path: "/admin/add-job" },
    { name: "My Jobs", icon: <FaBriefcase />, path: "/jobs" },
  ];

  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* User Info */}
      <div className="p-6 text-center border-b">
        <img
          src="https://media.licdn.com/dms/image/v2/D4D35AQGVkKY68QYoYg/profile-framedphoto-shrink_800_800/B4DZoGJisUKQAg-/0/1761039756368?e=1761760800&v=beta&t=W5zw5qxW7qlAg5XfxPH24Cu94hl7XpNPco7OwQUh8IA"
          alt="User"
          className="w-16 h-16 mx-auto rounded-full border-4 border-[#b6ef72]"
        />
        <h3 className="mt-3 text-lg font-semibold text-gray-800">
          Komal Qureshi
        </h3>
        <p className="text-sm text-gray-500">Senior Recruiter</p>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-5">
        <ul className="space-y-3">
          {menuItems.map((item, index) => {
            const active = location.pathname === item.path;
            return (
              <li key={index}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-5 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                    active
                      ? "bg-green-900 text-white shadow-md"
                      : "text-gray-700 hover:bg-[#dcfce7] hover:text-[#166534]"
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>


      <div className="p-5 border-t">
        <div>
          <p className="text-sm text-gray-600 mb-1">Profile Complete</p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-[#4ade80] h-2 rounded-full"
              style={{ width: "70%" }}
            ></div>
          </div>
          <span className="text-xs text-gray-500 mt-1 inline-block">70%</span>
        </div>

        <button className="flex items-center gap-3 w-full cursor-pointer px-5 py-3 rounded-xl text-gray-700 font-medium hover:text-red-600 hover:bg-red-50 transition-all">
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </div>
  );
};

export default RecruiterSidebar;
