import React from "react";
import {
  FaTachometerAlt,
  FaUsers,
  FaBriefcase,
  FaUserShield,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      name: "Dashboard",
      icon: <FaTachometerAlt className="font-bold text-2xl" />,
      path: "/admin/dashboard",
    },
    {
      name: "Manage Users",
      icon: <FaUsers className="font-bold text-2xl" />,
      path: "/admin/manage-users",
    },
    {
      name: "Manage Jobs",
      icon: <FaBriefcase className="font-bold text-2xl" />,
      path: "/admin/manage-jobs",
    },
    {
      name: "Settings",
      icon: <FaUserShield className="font-bold text-2xl" />,
      path: "/admin/settings",
    },
  ];

  return (
    <div className="h-screen flex flex-col justify-evenly">
      {/* Admin Info */}
      <div className="p-6 text-center border-b">
        <img
          src="https://via.placeholder.com/150"
          alt="Admin"
          className="w-20 h-20 mx-auto rounded-full border-4 border-[#b6ef72]"
        />
        <h3 className="mt-3 text-xl font-semibold text-gray-800">Admin Name</h3>
        <p className="text-sm text-gray-500">Administrator</p>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-5">
        <ul className="space-y-4">
          {menuItems.map((item, index) => {
            return (
              <li key={index}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-4 px-5 py-3 rounded-xl text-lg font-medium  hover:text-[#166534] ${
                    window.location.pathname === item.path
                      ? "bg-green-900 text-white shadow-md"
                      : "text-gray-700 hover:bg-[#dcfce7]"
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

      {/* Logout */}
      <div className="p-5 border-t">
        <button
          className="flex items-center gap-4 mb-10 w-full cursor-pointer px-5 py-3 rounded-xl text-gray-700 font-medium hover:text-red-600 hover:bg-red-50 transition-all"
          onClick={() => {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            navigate("/login");
          }}
        >
          <FaSignOutAlt className="text-xl" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
