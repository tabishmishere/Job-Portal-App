import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Testimonial from "./components/Testimonial";

// Recruiter Pages
import Dashboard from "./admin/RecruiterDashboard";
import JobManagement from "./admin/JobManagement";
import AddJob from "./admin/AddJob";
import JobApplicants from "./admin/JobApplicants";
import Profile from "./admin/Profile";
import RecruiterLayout from "./layout/RecruiterLayout";

// User Pages
import Jobs from "./user/Jobs";

// Auth Pages
import Login from "./pages/Login";
import Signup from "./pages/SignUp";

const AppContent = () => {
  const location = useLocation();

  // Hide Navbar on Dashboard routes
  const isDashboardRoute = location.pathname.startsWith("/dashboard");
  const showLandingExtras = location.pathname === "/";

  return (
    <>
      {!isDashboardRoute && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Header />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Recruiter (Dashboard) Routes */}
        <Route path="/dashboard" element={<RecruiterLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/job-management" element={<JobManagement />} />
          <Route
            path="/dashboard/applicants"
            element={<JobApplicants />}
          />
          <Route path="/dashboard/add-job" element={<AddJob />} />
          <Route path="/dashboard/profile" element={<Profile />} />
        </Route>

        {/* User Routes */}
        <Route path="/user/jobs" element={<Jobs />} />
      </Routes>

      {/* Only show testimonial & footer on landing page */}
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
