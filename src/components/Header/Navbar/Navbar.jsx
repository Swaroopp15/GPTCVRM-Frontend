import React, { useContext } from 'react';
import DropDown from './DropDown';
import { Context } from '../../../../Context/Context';
import objectToArray from '../../../functions/objectsToArray';
import { Link } from 'react-router';

function Navbar({ mobile = false }) {
  const { committees, departmentNames } = useContext(Context);

  return (
    <nav
      className={`${
        mobile ? 'flex flex-col space-y-4 w-full' : 'hidden md:flex md:flex-row md:gap-6 md:items-center'
      } text-gray-700`}
    >
      <Link
        to="/"
        className="hover:text-red-700 transition-colors px-2 py-1 rounded"
      >
        Home
      </Link>
      <Link
        to="/about"
        className="hover:text-red-700 transition-colors px-2 py-1 rounded"
      >
        About
      </Link>
      <DropDown
        name="departments"
        values={objectToArray(departmentNames)}
        link="/department/"
        mobile={mobile}
      />
      <DropDown
        name="committees"
        values={objectToArray(committees)}
        link="/committee/"
        mobile={mobile}
      />
      <Link
        to="/placements"
        className="hover:text-red-700 transition-colors px-2 py-1 rounded"
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
      />

      {/* Notification icon is hidden on mobile, visible on larger screens */}
      {!mobile && (
        <Link
          to="/notifications"
          className="hover:text-red-700 transition-colors ml-2"
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
