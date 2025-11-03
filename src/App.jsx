import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Header from "./components/Header.jsx";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Dashboard from "./admin/RecruiterDashboard.jsx";
import JobManagement from "./admin/JobManagement";
import UserManagement from "./admin/UserManagement";
import AddJob from "./admin/AddJob";
import ApplicationOverview from "./admin/ApplicationOverview";
import Footer from "./components/Footer";
import Testimonial from "./components/Testimonial";
import Profile from "./admin/Profile";
import Jobs from "./user/Jobs"
import AdminDashboard from "./admin/AdminDashboard.jsx";
import UserDashboard from "./admin/UserDashboard.jsx";
import UserSettings from "./admin/ProfileSetting.jsx";

const AppContent = () => {
  const location = useLocation();

  // Only show testimonial & footer on the landing page ("/")
  const showLandingExtras = location.pathname === "/";
  const hideNavbarRoutes = ["/admin/dashboard", "/recruiter/dashboard", "/user/jobs", "/user/dashboard", "/user/profilesetting"];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
       {!shouldHideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/features" element={<div>Features</div>} />
        <Route path="/about" element={<div>About</div>} />
        <Route path="/recruiter/dashboard" element={<Dashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard/>} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/job-management" element={<JobManagement />} />
        <Route path="/admin/user-management" element={<UserManagement />} />
        <Route path="/admin/all-applicants" element={<ApplicationOverview />} />
        <Route path="/admin/add-job" element={<AddJob />} />
        <Route path="/admin/profile" element={<Profile />} />
        <Route path="/user/jobs" element={<Jobs />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/user/profilesetting" element={<UserSettings />} />

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
