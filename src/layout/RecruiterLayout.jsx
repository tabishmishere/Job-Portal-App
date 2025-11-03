import React from "react";
import RecruiterSidebar from "../admin/RecruiterSidebar";
import { Outlet } from "react-router-dom";

const RecruiterLayout = () => {
  return (
    <div className="flex min-h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="p-5">
        <RecruiterSidebar />
      </div>

      {/* Main Content Area */}
      <div className="w-full p-6 flex-1 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default RecruiterLayout;
