import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Testimonial from "./components/Testimonial";
import RecruiterApplicants from "./admin/RecruiterApplicants";

import Login from "./pages/Login";
import Signup from "./pages/SignUp";

import Dashboard from "./admin/RecruiterDashboard";
import JobManagement from "./admin/JobManagement";
import AddJob from "./admin/AddJob";
import ApplicationOverview from "./admin/ApplicationOverview";
import Profile from "./admin/Profile";

import Jobs from "./user/Jobs";
import AdminDashboard from "./admin/AdminDashboard";
import UserDashboard from "./admin/UserDashboard";
import UserSettings from "./admin/ProfileSetting";

import RecruiterLayout from "./layout/RecruiterLayout";

const AppContent = () => {
  const location = useLocation();

  // Show testimonial & footer only on landing page
  const showLandingExtras = location.pathname === "/";

  // Routes where Navbar should be hidden
  const hideNavbarRoutes = [
    "/admin/dashboard",
    "/recruiter/dashboard",
    "/recruiter/job-management",
    "/recruiter/applicants",
    "/recruiter/add-job",
    "/recruiter/profile",
    "/user/jobs",
    "/user/dashboard",
    "/user/profilesetting",
  ];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <Routes>
        {/* Landing Pages */}
        <Route path="/" element={<Header />} />
        <Route path="/features" element={<div>Features</div>} />
        <Route path="/about" element={<div>About</div>} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Recruiter Routes with Layout */}
        <Route path="/recruiter" element={<RecruiterLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="job-management" element={<JobManagement />} />
          <Route path="applicants" element={<RecruiterApplicants />} />
          <Route path="add-job" element={<AddJob />} />
          <Route path="edit-job/:id" element={<AddJob />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        {/* User Routes */}
        <Route path="/user/jobs" element={<Jobs />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/user/profilesetting" element={<UserSettings />} />
        <Route path="/user/applied-jobs" element={<ApplicationOverview />} />
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

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
