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
      className={`${mobile
        ? 'flex flex-col space-y-2 w-full py-4'
        : 'hidden md:flex items-center space-x-1 lg:space-x-2'
        }`}
    >
      <Link
        to="/"
        className={`transition-all duration-300 px-3 py-2 rounded-lg text-sm md:text-[15px] font-medium ${isActive('/')
          ? 'text-white bg-gradient-to-r from-red-600 to-red-500 shadow-md'
          : 'text-gray-700 hover:text-red-600 hover:bg-red-50'
          }`}
      >
        Home
      </Link>

      <Link
        to="/about"
        className={`transition-all duration-300 px-3 py-2 rounded-lg text-sm md:text-[15px] font-medium ${isActive('/about')
          ? 'text-white bg-gradient-to-r from-red-600 to-red-500 shadow-md'
          : 'text-gray-700 hover:text-red-600 hover:bg-red-50'
          }`}
      >
        About
      </Link>
<DropDown
  name="Acadamics"
  values={[
    { name: 'Results', code: 'results', path: '/results' },
    { name: 'Admissions', code: 'academics', path: '/academics' },
    { name: 'Admission Process', code: 'admissionprocess', path: '/admissionprocess' },
    { name: 'Students', code: 'students', path: '/ww' },
  ]}
  link="/"
  mobile={mobile}
  currentPath={currentPath}
  isActive={
    isActive('/academics') ||
    isActive('/results') ||
    isActive('/students') ||
    isActive('/admissionprocess')
  }
/>

      <DropDown
        name="Departments"
        values={objectToArray(departmentNames)}
        link="/department/"
        all="/departments"
        mobile={mobile}
        currentPath={currentPath}
        isActive={isActive('/department') || isActive('/departments')}
      />

      <DropDown
        name="Committees"
        values={objectToArray(committees)}
        link="/committee/"
        all="/committees"
        mobile={mobile}
        currentPath={currentPath}
        isActive={isActive('/committee') || isActive('/committees')}
      />

      <Link
        to="/placements"
        className={`transition-all duration-300 px-3 py-2 rounded-lg text-sm md:text-[15px] font-medium ${isActive('/placements')
          ? 'text-white bg-gradient-to-r from-red-600 to-red-500 shadow-md'
          : 'text-gray-700 hover:text-red-600 hover:bg-red-50'
          }`}
      >
        Placements
      </Link>


      <Link
        to="/library"
        className={`transition-all duration-300 px-3 py-2 rounded-lg text-sm md:text-[15px] font-medium ${isActive('/library')
          ? 'text-white bg-gradient-to-r from-red-600 to-red-500 shadow-md'
          : 'text-gray-700 hover:text-red-600 hover:bg-red-50'
          }`}
      >
        Library
      </Link>

      <DropDown
        name="More"
        values={[
          { name: 'Login', code: 'login', path: '/login' },
          { name: 'Events', code: 'events', path: '/events' },
          { name: 'Facilities', code: 'facilities', path: '/facility' },
          { name: 'Gallery', code: 'gallery', path: '/gallery' },
          { name: 'Contact', code: 'contact', path: '/contact' },
        ]}
        link="/"
        mobile={mobile}
        currentPath={currentPath}
        isActive={
          isActive('/login') ||
          isActive('/events') ||
          isActive('/facility') ||
          isActive('/gallery') ||
          isActive('/contact')
        }
      />

      {!mobile && (
        <Link
          to="/notifications"
          className={`transition-all duration-300 p-2 rounded-full relative ${isActive('/notifications')
            ? 'text-white bg-gradient-to-r from-red-600 to-red-500 shadow-md'
            : 'text-gray-700 hover:text-red-600 hover:bg-red-50'
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
          {/* <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span> */}
        </Link>
      )}
    </nav>
  );
}

export default Navbar;