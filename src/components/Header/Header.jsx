import React, { useContext, useState } from 'react';
import Logo from './logo';
import Navbar from './Navbar/Navbar';
import { Context } from '../../../Context/Context';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router';

function Header() {
  const { college } = useContext(Context);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className='w-full bg-white h-20 px-4 sm:px-8 md:px-16 lg:px-36 flex flex-row justify-between items-center fixed top-0 z-50'>
      <Logo name={college.college_name} />
      
      <Link 
        to="/notification" 
        className="md:hidden hover:text-red-700 transition-colors mx-4"
        aria-label="Notifications"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6" 
          fill="none" 
          viewBox="0 0 24 24"
          stroke="currentColor" 
          strokeWidth="2"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14V10a6 6 0 10-12 0v4c0 .386-.104.762-.295 1.09L4 17h5m6 0a3 3 0 01-6 0" 
          />
        </svg>
      </Link>
      
      <div className="hidden md:block">
        <Navbar />
      </div>
      
      <button 
        className="md:hidden text-gray-700 focus:outline-none"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>
      
      {mobileMenuOpen && (
        <div className="absolute top-20 left-0 right-0 bg-white shadow-lg md:hidden p-4">
          <Navbar mobile />
        </div>
      )}
    </div>
  );
}

export default Header;