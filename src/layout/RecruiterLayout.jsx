import React from "react";
import RecruiterSidebar from "../admin/RecruiterSidebar";
import { Outlet } from "react-router-dom";

const RecruiterLayout = () => {
  return (
    <div className="flex min-h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 border-r border-gray-200">
        <RecruiterSidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default RecruiterLayout;
