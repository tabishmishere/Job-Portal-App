import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import JobDetails from "./user/JobDetails.jsx"

import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Testimonial from "./components/Testimonial";

import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import ResendVerification from "./pages/ResendVerification";

// Admin Imports
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import ManageUsers from "./admin/ManageUsers";
import ManageJobs from "./admin/ManageJobs";

// Recruiter Imports
import RecruiterLayout from "./layout/RecruiterLayout";
import RecruiterDashboard from "./admin/RecruiterDashboard";
import RecruiterApplicants from "./admin/RecruiterApplicants";
import JobManagement from "./admin/JobManagement";
import AddJob from "./admin/AddJob";
import Profile from "./admin/Profile";

// User Imports
import Jobs from "./user/Jobs";
import UserDashboard from "./admin/UserDashboard";
import UserSettings from "./admin/ProfileSetting";
import AdminProfile from "./admin/AdminProfile";
import AppliedJobs from "./user/AppliedJobs";

const AppContent = () => {
  const location = useLocation();

  const hideNavbarRoutes = [
    "/admin/dashboard",
    "/admin/manage-users",
    "/admin/manage-jobs",
    "/recruiter/dashboard",
    "/recruiter/job-management",
    "/recruiter/applicants",
    "/recruiter/add-job",
    "/recruiter/profile",
    "/user/jobs",
    "/user/dashboard",
    "/user/profilesetting",
    "/admin/profile",
    "/user/applied-jobs",
    "/jobs"

  ];

  const shouldHideNavbar = hideNavbarRoutes.some((path) =>
    location.pathname.startsWith(path)
  );

  const showLandingExtras = location.pathname === "/";

  return (
    <>
      {!shouldHideNavbar && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Header />} />
        <Route path="/features" element={<div>Features</div>} />
        <Route path="/about" element={<div>About</div>} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/resend-verification" element={<ResendVerification />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="manage-users" element={<ManageUsers />} />
          <Route path="manage-jobs" element={<ManageJobs />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
        </Route>

        {/* Recruiter Routes */}
        <Route path="/recruiter" element={<RecruiterLayout />}>
          <Route path="dashboard" element={<RecruiterDashboard />} />
          <Route path="job-management" element={<JobManagement />} />
          <Route path="applicants" element={<RecruiterApplicants />} />
          <Route path="add-job" element={<AddJob />} />
          <Route path="edit-job/:id" element={<AddJob />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* User Routes */}
        <Route path="/user/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<JobDetails />} />

        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/user/profilesetting" element={<UserSettings />} />
        <Route path="/user/applied-jobs" element={<AppliedJobs />} />

      </Routes>

      {showLandingExtras && (
        <>
          <Testimonial />
          <Footer />
        </>
      )}
    </>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
