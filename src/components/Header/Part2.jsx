// Part2.js
import React, { useContext, useState } from 'react';
import { Context } from '../../../Context/Context';
import Navbar from './Navbar/Navbar';
import Logo from './Logo';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router';

const Part2 = ({ isSticky, stickyRef, stickyHeight }) => {
  const { college } = useContext(Context);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div style={{ height: isSticky ? stickyHeight : 0 }} />

      <div
        ref={stickyRef}
        className={`w-full bg-white border-b border-gray-200 transition-all duration-300 ${
          isSticky ? 'fixed top-0 left-0 right-0 shadow-md z-50' : 'relative'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-center h-16">
            {/* <div className="flex-shrink-0 hidden md:block"> 
              {isSticky && <Logo name={college.college_name} />}
            </div> */}

            <div className="hidden md:block ml-6">
              <Navbar />
            </div>

            <div className="md:hidden flex items-center space-x-3">
              <Link
                to="/notification"
                className="text-gray-700 hover:text-red-700 transition-colors"
                aria-label="Notifications"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14V10a6 6 0 10-12 0v4c0 .386-.104.762-.295 1.09L4 17h5m6 0a3 3 0 01-6 0"
                  />
                </svg>
              </Link>

              <button
                className="text-gray-700 hover:text-red-700 focus:outline-none"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-2">
              <Navbar mobile />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Part2;