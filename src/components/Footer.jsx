import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="selection:bg-green-500 selection:text-white mt-[50px]">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <hr className="border-gray-700 mb-6" />
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="text-center lg:text-left text-sm">
            <p>© {new Date().getFullYear()} | All rights reserved.</p>
          </div>
          <div className="flex gap-6 justify-center lg:justify-end text-3xl text-green-500">
            <a href="#" className="hover:text-green-700 transition-colors">
              <FaFacebook />
            </a>
            <a href="#" className="hover:text-green-700 transition-colors">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-green-700 transition-colors">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-green-700 transition-colors">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
