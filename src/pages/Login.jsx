import React, { useState, useEffect } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  // Local state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect logged-in users automatically
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    if (token && user) {
      if (user.role === "admin") navigate("/admin/dashboard");
      else if (user.role === "recruiter") navigate("/recruiter/dashboard");
      else navigate("/user/jobs");
    }
  }, [navigate]);

  // Login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("http://127.0.0.1:5000/api/login", {
        email,
        password,
      });

      const { token, user } = res.data;
      console.log("Login response:", res.data);

      if (token && user) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        // Navigate based on role
        if (user.role === "admin") {
          navigate("/admin/dashboard");
        } else if (user.role === "recruiter") {
          navigate("/recruiter/dashboard");
        } else {
          navigate("/user/jobs");
        }
      } else {
        setError("Invalid response from server");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Invalid credentials or server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">Login</h2>
        <p className="text-gray-600 text-center mb-6">
          Please log in to access your account
        </p>

        <form onSubmit={handleLogin}>
          {/* Email Input */}
          <div className="mb-4 flex items-center border-2 border-gray-300 rounded-full focus-within:ring-2 focus-within:ring-green-500">
            <FaEnvelope className="text-gray-400 ml-3" />
            <input
              className="w-full p-3 rounded-full border-0 focus:outline-none"
              type="email"
              placeholder="Email ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-6 flex items-center border-2 border-gray-300 rounded-full focus-within:ring-2 focus-within:ring-green-500">
            <FaLock className="text-gray-400 ml-3" />
            <input
              className="w-full p-3 rounded-full border-0 focus:outline-none"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-red-500 text-sm text-center mb-4">{error}</p>
          )}

          {/* Forgot Password */}
          <div className="text-right mb-4">
            <button
              type="button"
              onClick={() => alert("Forgot password feature coming soon!")}
              className="text-green-600 font-semibold hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}
          <div className="mb-4 text-center">
            <button
              type="submit"
              disabled={loading}
              className={`w-full font-bold bg-green-500 text-white py-3 rounded-full hover:bg-green-600 transition ${
                loading ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>

          {/* Sign-up Link */}
          <div className="text-center text-sm">
            <p className="text-gray-600">
              Don’t have an account?{" "}
              <Link
                to="/sign-up"
                className="text-green-500 font-semibold hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
