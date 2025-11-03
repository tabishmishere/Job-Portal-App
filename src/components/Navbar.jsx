import React from "react";
import { Link } from "react-router-dom";
import Login from "../pages/Login";
import { HashLink } from 'react-router-hash-link'

const Navbar = () => {
  return (
    <nav className="p-4">
      <div className="flex justify-around items-center fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/70 p-4 transition duration-300">
        <div className="text-black text-3xl font-bold flex items-center space-x-1">
          <Link  to='/'>Jobi</Link>
          <span className="text-green-500">.</span>
        </div>

        <div className="hidden md:flex space-x-8">
          <HashLink
          smooth
            to="/#hometop"
            className="text-gray-700 hover:text-green-600 transition duration-300"
          >
            Home
          </HashLink>
          <HashLink
  smooth
  to="/#how-our-process-work"
  className="text-gray-700 hover:text-green-600 transition duration-300"
>
  How It Works
</HashLink>
          <HashLink
          smooth
            to="/#testimoniallink"
            className="text-gray-700 hover:text-green-600 transition duration-300"
          >
            Reviews
          </HashLink>
          <Link
            to="/login"
            className="text-gray-700 hover:text-green-600 transition duration-300"
          >
            Dashboard
          </Link>
        </div>

        <div className="flex space-x-4">
          <Link
            to="/sign-up"
            className="bg-green-500 cursor-pointer font-semibold text-white py-2 px-5 rounded-full hover:bg-green-600 transition duration-300"
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className="border border-gray-300 cursor-pointer text-gray-700 py-2 px-5 rounded-full hover:border-green-500 hover:text-green-600 transition duration-300"
          >Login</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
