import React, { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");



  const handleLogin = async (e) => {
  e.preventDefault();
  console.log("Login button clicked ");

  try {
    const res = await axios.post("http://127.0.0.1:5000/api/login", {
      email,
      password,
    });

    console.log("Response:", res.data);

    const { token, user } = res.data;

    if (token && user) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Navigate based on user role
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
    setError(err.response?.data?.message || "Something went wrong!");
  }
};


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-3xl font-bold text-center mb-4">Login</h2>
        <p className="text-gray-600 text-center mb-6">
          Please login here to continue
        </p>

        <form onSubmit={handleLogin}>
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

          {error && (
            <p className="text-red-500 text-sm text-center mb-4">{error}</p>
          )}

          <div className="text-right mb-4">
            <button
              type="button"
              className="text-green-600 font-bold mb-5 leading-1 ml-1 cursor-pointer"
            >
              Forgot Password?
            </button>
          </div>

          <div className="mb-4 text-center">
            <button
              type="submit"
              className="w-full cursor-pointer font-bold bg-green-500 text-white py-3 rounded-full hover:bg-green-600 focus:outline-none"
            >
              Login
            </button>
          </div>

          <div className="text-center text-sm">
            <p className="text-gray-600">
              Don’t have an account?{" "}
              <Link to="/sign-up" className="text-green-500 hover:underline">
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
