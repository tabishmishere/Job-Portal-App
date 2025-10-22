import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaUser, FaBriefcase, FaSignOutAlt } from "react-icons/fa";
import { BiUserCircle, BiTrash } from "react-icons/bi";

const RecruiterSidebar = () => {
  const location = useLocation();

  // Menu items list
  const menuItems = [
    { name: "Dashboard", icon: <FaUser />, path: "/dashboard" },
    { name: "My Profile", icon: <BiUserCircle />, path: "/profile" },
    { name: "My Jobs", icon: <FaBriefcase />, path: "/jobs" },
    { name: "Submit Job", icon: <FaBriefcase />, path: "/submit-job" },
    { name: "Save Candidate", icon: <FaUser />, path: "/save-candidate" },
    { name: "Delete Account", icon: <BiTrash />, path: "/delete-account", danger: true },
  ];

  return (
    <div className="h-screen bg-white border-r border-gray-200 flex flex-col justify-between">
      {/* User Info */}
      <div className="p-6 text-center border-b">
        <img
          src="https://media.licdn.com/dms/image/v2/D4D35AQGVkKY68QYoYg/profile-framedphoto-shrink_800_800/B4DZoGJisUKQAg-/0/1761039756368?e=1761760800&v=beta&t=W5zw5qxW7qlAg5XfxPH24Cu94hl7XpNPco7OwQUh8IA"
          alt="User"
          className="w-16 h-16 mx-auto rounded-full border-4 border-green-200"
        />
        <h3 className="mt-3 text-lg font-semibold text-gray-800">Komal Qureshi</h3>
        <p className="text-sm text-gray-500">Senior Recruiter</p>
      </div>

      {/* Middle: Menu */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={index}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium 
                    ${
                      isActive
                        ? "bg-green-900 text-white"
                        : item.danger
                        ? "text-red-500 hover:bg-red-100"
                        : "text-gray-700 hover:bg-green-100 hover:text-green-700"
                    }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom: Profile Progress + Logout */}
      <div className="p-4 border-t">
        <div className="mb-4">
          <p className="text-sm text-gray-600">Profile Complete</p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
            <div className="bg-green-500 h-2 rounded-full" style={{ width: "67%" }}></div>
          </div>
          <span className="text-xs text-gray-500">67%</span>
        </div>

        <button className="flex items-center gap-2 w-full px-4 py-2 rounded-lg text-gray-700 hover:text-red-600 hover:bg-red-50">
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default RecruiterSidebar;
