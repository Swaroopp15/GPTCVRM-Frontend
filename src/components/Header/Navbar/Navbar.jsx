import React, { useContext } from 'react';
import DropDown from './DropDown';
import { Context } from '../../../../Context/Context';
import objectToArray from '../../../functions/objectsToArray';
import { Link } from 'react-router';

function Navbar({ mobile = false, currentPath }) {
  const { committees, departmentNames } = useContext(Context);

  const isActive = (path) => {
    if (path === '/') return currentPath === path;
    return currentPath.startsWith(path);
  };

  return (
    <nav
      className={`${
        mobile 
          ? 'flex flex-col space-y-2 md:space-y-4 w-full' 
          : 'hidden md:flex items-center space-x-2 lg:space-x-6'
      }`}
    >
      <Link
        to="/"
        className={`transition-colors duration-200 px-2 py-1 md:px-3 md:py-2 rounded text-sm md:text-base font-medium ${
          isActive('/') 
            ? 'text-red-700 bg-red-50' 
            : 'text-gray-800 hover:text-red-700 hover:bg-red-50'
        }`}
      >
        Home
      </Link>
      
      <Link
        to="/about"
        className={`transition-colors duration-200 px-2 py-1 md:px-3 md:py-2 rounded text-sm md:text-base font-medium ${
          isActive('/about') 
            ? 'text-red-700 bg-red-50' 
            : 'text-gray-800 hover:text-red-700 hover:bg-red-50'
        }`}
      >
        About
      </Link>
      
      <DropDown
        name="Departments"
        values={objectToArray(departmentNames)}
        link="/department/"
        all="/departments"
        mobile={mobile}
        currentPath={currentPath}
      />
      
      <DropDown
        name="Committees"
        values={objectToArray(committees)}
        link="/committee/"
        all="/committees"
        mobile={mobile}
        currentPath={currentPath}
      />
      
      <Link
        to="/placements"
        className={`transition-colors duration-200 px-2 py-1 md:px-3 md:py-2 rounded text-sm md:text-base font-medium ${
          isActive('/placements') 
            ? 'text-red-700 bg-red-50' 
            : 'text-gray-800 hover:text-red-700 hover:bg-red-50'
        }`}
      >
        Placements
      </Link>
      
      <DropDown
        name="More"
        values={[
          { name: 'Login', code: 'login', path: '/login' },
          { name: 'Results', code: 'results', path: '/results' },
          { name: 'Events', code: 'events', path: '/events' },
          { name: 'Gallery', code: 'gallery', path: '/gallery' },
          { name: 'Contact', code: 'contact', path: '/contact' }
        ]}
        link="/"
        mobile={mobile}
        currentPath={currentPath}
      />

      {/* Notification icon - Desktop Only */}
      {!mobile && (
        <Link
          to="/notifications"
          className={`transition-colors duration-200 p-1 md:p-2 rounded-full ${
            isActive('/notifications') 
              ? 'text-red-700 bg-red-50' 
              : 'text-gray-800 hover:text-red-700 hover:bg-red-50'
          }`}
          aria-label="Notifications"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 md:h-6 md:w-6"
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
      )}
    </nav>
  );
}

export default Navbar;