import React, { useContext } from 'react';
import DropDown from './DropDown';
import { Context } from '../../../../Context/Context';
import objectToArray from '../../../functions/objectsToArray';
import { Link, useLocation } from 'react-router';

function Navbar({ mobile = false }) {
  const { committees, departmentNames } = useContext(Context);
  const location = useLocation();
  const currentPath = location.pathname;

  // Helper function to check if a route is active
  const isActive = (path, exact = false) => {
    if (exact) return currentPath === path;
    return currentPath.startsWith(path);
  };

  return (
    <nav
      className={`${mobile ? 'flex flex-col space-y-4 w-full' : 'hidden md:flex md:flex-row md:gap-6 md:items-center'
        } text-gray-700`}
    >
      <Link
        to="/"
        className={`${isActive('/', true) ? 'text-red-700 border-b-4 border-red-800' : 'hover:text-red-700 hover:border-b-4 hover:border-red-800'} transition-all px-2 py-1 rounded`}
      >
        Home
      </Link>
      <Link
        to="/about"
        className={`${isActive('/about') ? 'text-red-700 border-b-4 border-red-800' : 'hover:text-red-700 hover:border-b-4 hover:border-red-800'} transition-all px-2 py-1 rounded`}
      >
        About
      </Link>
      <DropDown
        name="departments"
        values={objectToArray(departmentNames)}
        link="/department/"
        all="/departments"
        mobile={mobile}
        isActive={isActive('/department') || isActive('/departments')}
      />
      <DropDown
        name="committees"
        values={objectToArray(committees)}
        link="/committee/"
        all="/committees"
        mobile={mobile}
        isActive={isActive('/committee') || isActive('/committees')}
      />
      <Link
        to="/placements"
        className={`${isActive('/placements') ? 'text-red-700 border-b-4 border-red-800' : 'hover:text-red-700 hover:border-b-4 hover:border-red-800'} transition-all px-2 py-1 rounded`}
      >
        Placements
      </Link>
      <DropDown
        name="others"
        values={[
          { name: 'Login', code: 'login' },
          { name: 'Results', code: 'results' },
          { name: 'Events', code: 'events' },
          { name: 'Gallery', code: 'gallery' },
          { name: 'Contact', code: 'contact' }
        ]}
        link="/"
        mobile={mobile}
        isActive={
          isActive('/login') ||
          isActive('/results') ||
          isActive('/events') ||
          isActive('/gallery') ||
          isActive('/contact')
        }
      />

      {/* Notification icon is hidden on mobile, visible on larger screens */}
      {!mobile && (
        <Link
          to="/notifications"
          className={`${isActive('/notifications') ? 'text-red-700' : 'hover:text-red-700'} transition-colors ml-2`}
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
      )}
    </nav>
  );
}

export default Navbar;