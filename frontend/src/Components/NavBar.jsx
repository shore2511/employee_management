import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../Image/Pocket Planner.jpg";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation(); // Hook to get the current path

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Function to check if a link is active
  const isActive = (path) => {
    return location.pathname === path ? "text-orange-500" : "text-blue-900";
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-gray-200 py-2.5 z-20">
      <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
        <a href="/" className="flex items-center">
          <img
            src={logo}
            className="lg:h-20 mr-3 md:h-16 h-9"
            alt="Super60 Logo"
          />
          <h1 className="text-red-500 text-lg font-bold">
            Employee Management System
          </h1>
        </a>
        <div className="flex items-center lg:order-2">
          <button
            onClick={toggleMobileMenu}
            className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="mobile-menu-2"
            aria-expanded={isMobileMenuOpen ? "true" : "false"}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className={`w-6 h-6 ${isMobileMenuOpen ? "hidden" : ""}`}
              fill="navy"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
            <svg
              className={`w-6 h-6 ${isMobileMenuOpen ? "" : "hidden"}`}
              fill="navy"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div
          className={`items-center justify-between w-full lg:flex lg:w-auto lg:order-1 ${
            isMobileMenuOpen ? "block" : "hidden"
          }`}
          id="mobile-menu-2"
        >
          <ul className="flex flex-col mt-4 lg:text-2xl font-medium lg:flex-row lg:space-x-8 lg:mt-0">
            <li>
              <Link
                to="/"
                className={`block py-2 pl-3 pr-4 border-b rounded border-gray-100 hover:bg-orange-500 lg:hover:bg-transparent lg:border-0 lg:hover:text-orange-500 lg:p-0 ${isActive(
                  "/"
                )}`}
              >
                Deskboard
              </Link>
            </li>
            <li>
              <Link
                to="/insert"
                className={`block py-2 pl-3 pr-4 border-b rounded border-gray-100 hover:bg-orange-500 lg:hover:bg-transparent lg:border-0 lg:hover:text-orange-500 lg:p-0 ${isActive(
                  "/insert"
                )}`}
              >
                Insert
              </Link>
            </li>
            <li>
              <Link
                to="/read"
                className={`block py-2 pl-3 pr-4 border-b rounded border-gray-100 hover:bg-orange-500 lg:hover:bg-transparent lg:border-0 lg:hover:text-orange-500 lg:p-0 ${isActive(
                  "/read"
                )}`}
              >
                Read
              </Link>
            </li>
            <li>
              <Link
                to="/find"
                className={`block py-2 pl-3 pr-4 border-b rounded border-gray-100 hover:bg-orange-500 lg:hover:bg-transparent lg:border-0 lg:hover:text-orange-500 lg:p-0 ${isActive(
                  "/find"
                )}`}
              >
                Find
              </Link>
            </li>
            <li>
              <Link
                to="/delete"
                className={`block py-2 pl-3 pr-4 border-b rounded border-gray-100 hover:bg-orange-500 lg:hover:bg-transparent lg:border-0 lg:hover:text-orange-500 lg:p-0 ${isActive(
                  "/delete"
                )}`}
              >
                Delete
              </Link>
            </li>
            <li>
              <Link
                to="/update"
                className={`block py-2 pl-3 pr-4 border-b rounded border-gray-100 hover:bg-orange-500 lg:hover:bg-transparent lg:border-0 lg:hover:text-orange-500 lg:p-0 ${isActive(
                  "/update"
                )}`}
              >
                Update
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
