import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Header from "./components/Header.jsx";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Footer from "./components/Footer";
import Testimonial from "./components/Testimonial";
import Jobs from "./user/Jobs";
import AdminDashboard from "./admin/AdminDashboard.jsx";
import UserDashboard from "./admin/UserDashboard.jsx";
import UserSettings from "./admin/ProfileSetting.jsx";

// Recruiter Pages
import RecruiterLayout from "./layout/RecruiterLayout.jsx";
import RecruiterDashboard from "./admin/RecruiterDashboard.jsx";
import Profile from "./admin/Profile";
import AddJob from "./admin/AddJob";
import JobManagement from "./admin/JobManagement.jsx";
import JobApplicants from "./admin/JobApplicants.jsx";

const AppContent = () => {
  const location = useLocation();

  // Hide navbar on these routes
  const hideNavbarRoutes = [
    "/admin/dashboard",
    "/recruiter/dashboard",
    "/user/jobs",
    "/user/dashboard",
    "/user/profilesetting",
  ];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  // Show footer/testimonial only on home page
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
        <Route path="/user/jobs" element={<Jobs />} />

        {/* User Routes */}
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/user/profilesetting" element={<UserSettings />} />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        {/* Recruiter Layout with Nested Routes */}
        <Route path="/recruiter" element={<RecruiterLayout />}>
          <Route path="dashboard" element={<RecruiterDashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="add-job" element={<AddJob />} />
          <Route path="job-management" element={<JobManagement />} />
          <Route path="job-applicants" element={<JobApplicants />} />
        </Route>
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
