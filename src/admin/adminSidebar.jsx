import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUsers, FaBriefcase, FaTachometerAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { fetchAdminProfile } from "../api/adminApi.js";
import { API_URL } from "../api/index.js";

const AdminSidebar = ({ onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await fetchAdminProfile();
        setAdmin(res.admin);
      } catch (err) {
        console.error("Failed to load admin profile:", err);
      }
    };
    loadProfile();
  }, []);

  const menu = [
    { label: "Dashboard", path: "/admin/dashboard", icon: <FaTachometerAlt className="text-xl" /> },
    { label: "Manage Users", path: "/admin/manage-users", icon: <FaUsers className="text-xl" /> },
    { label: "Manage Jobs", path: "/admin/manage-jobs", icon: <FaBriefcase className="text-xl" /> },
    { label: "My Profile", path: "/admin/profile", icon: <FaUser className="text-xl" /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    if (onLogout) onLogout();
    navigate("/login");
  };

  return (
    <div className="flex flex-col h-screen justify-between bg-white shadow-lg">
      {/* Admin Info */}
      <div className="p-6 text-center border-b">
        <img
          src={
            admin?.profile?.avatar
              ? `${API_URL}${admin.profile.avatar}`
              : "https://cdn-icons-png.flaticon.com/512/2202/2202112.png"
          }
          alt="Admin"
          className="w-20 h-20 mx-auto rounded-full border-4 border-[#b6ef72]"
        />
        <h3 className="mt-3 text-xl font-semibold text-gray-800">
          {admin?.name || "Admin"}
        </h3>
        <p className="text-sm text-gray-500">System Administrator</p>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-5">
        <ul className="space-y-4">
          {menu.map((item) => {
            const active = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-4 px-5 py-3 rounded-xl text-lg font-medium transition-all duration-200 ${
                    active
                      ? "bg-green-900 text-white shadow-md"
                      : "text-gray-700 hover:bg-[#dcfce7] hover:text-[#166534]"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-5 border-t">
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-1">System Status</p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-[rgb(74,222,128)] h-2 rounded-full"
              style={{ width: "100%" }}
            ></div>
          </div>
          <span className="text-xs text-gray-500 mt-1 inline-block">Active</span>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-4 w-full cursor-pointer px-5 py-3 rounded-xl text-gray-700 font-medium hover:text-red-600 hover:bg-red-50 transition-all"
        >
          <FaSignOutAlt className="text-xl" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
