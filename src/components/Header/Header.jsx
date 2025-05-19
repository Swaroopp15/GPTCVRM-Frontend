import React, { useContext, useState } from 'react';
import Logo from './logo';
import Navbar from './Navbar/Navbar';
import { Context } from '../../../Context/Context';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link, useLocation } from 'react-router';

function Header() {
  const { college } = useContext(Context);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="w-full bg-white min-h-16 md:h-20 px-3 sm:px-4 lg:px-8 flex items-center fixed top-0 z-50 shadow-sm">
      {/* College Logo and Name - Left Side */}
      <div className="flex-shrink-0 flex-1 min-w-0">
        <Logo name={college.college_name} />
      </div>

      {/* Right Side - Notification and Menu */}
      <div className="flex items-center space-x-3 sm:space-x-4 ml-2">
        {/* Notification Icon - Mobile Only */}
        <Link 
          to="/notification" 
          className="md:hidden transition-colors duration-200 hover:text-red-700 flex-shrink-0"
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
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center">
          <Navbar currentPath={location.pathname} />
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700 focus:outline-none transition-transform duration-200 hover:scale-110 flex-shrink-0"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <FaTimes size={20} className="text-red-700" />
          ) : (
            <FaBars size={20} />
          )}
        </button>
      </div>
      
      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white shadow-lg md:hidden p-4 border-t border-gray-100 animate-fadeIn">
          <Navbar mobile currentPath={location.pathname} />
        </div>
      )}
    </header>
  );
}

export default Header;