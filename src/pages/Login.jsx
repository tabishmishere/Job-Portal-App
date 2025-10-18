import React from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-3xl font-bold text-center mb-4">Login</h2>
        <p className="text-gray-600 text-center mb-6">
          Please login here to continue
        </p>

        <form>
          <div className="mb-4 flex items-center border-2 border-gray-300 rounded-full focus-within:ring-2 focus-within:ring-green-500">
            <FaEnvelope className="text-gray-400 ml-3" />
            <input
              className="w-full p-3 rounded-full border-0 focus:outline-none"
              type="email"
              placeholder="Email ID"
            />
          </div>

          <div className="mb-6 flex items-center border-2 border-gray-300 rounded-full focus-within:ring-2 focus-within:ring-green-500">
            <FaLock className="text-gray-400 ml-3" />
            <input
              className="w-full p-3 rounded-full border-0 focus:outline-none"
              type="password"
              placeholder="Password"
            />
          </div>
          <button className="text-green-600 font-bold mb-5 leading-1 ml-1 cursor-pointer">
            Fogot Password ?
          </button>
          <div className="mb-4 text-center">
            <button className="w-full cursor-pointer font-bold bg-green-500 text-white py-3 rounded-full hover:bg-green-600 focus:outline-none">
              Login
            </button>
          </div>

          <div className="text-center text-sm">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-green-500 hover:underline">
                Click here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
