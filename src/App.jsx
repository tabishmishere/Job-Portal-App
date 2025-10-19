import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Dashboard from "./admin/AdminDashboard";

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="/features" element={<div>Features</div>} />
          <Route path="/about" element={<div>About</div>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
