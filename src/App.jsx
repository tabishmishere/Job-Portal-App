import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Dashboard from "./admin/RecruiterDashboard";
import JobManagement from "./admin/JobManagement";
import UserManagement from "./admin/UserManagement";
import ApplicationOverview from "./admin/ApplicationOverview";
import Footer from "./components/Footer";
import Testimonial from "./components/Testimonial";

const AppContent = () => {
  const location = useLocation();

  // Only show testimonial & footer on the landing page ("/")
  const showLandingExtras = location.pathname === "/";

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/features" element={<div>Features</div>} />
        <Route path="/about" element={<div>About</div>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/job-management" element={<JobManagement />} />
        <Route path="/admin/user-management" element={<UserManagement />} />
        <Route path="/admin/all-applicants" element={<ApplicationOverview />} />
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
