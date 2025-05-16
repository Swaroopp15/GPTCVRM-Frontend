import React, { useContext } from 'react';
import { Link } from 'react-router';
import { Context } from '../../../Context/Context';
import NotFoundIllustration from '../hero/NotFoundIllustration';

function NotFoundPage() {
  const { college } = useContext(Context);

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row items-center justify-center px-4 py-12 bg-white space-y-16 lg:space-y-0 lg:space-x-8 overflow-hidden">
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center text-center px-4 md:px-8">
        <p className="text-6xl sm:text-7xl md:text-8xl font-bold tracking-wider text-red-600">404</p>
        <p className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide text-gray-800 mt-2">
          Page Not Found
        </p>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 mt-6 mb-10 px-2 sm:px-8">
          Sorry, the page you are looking for could not be found.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
          <Link
            to="/"
            className="flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition duration-150"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            <span>Return Home</span>
          </Link>
          <Link
            to="/contact"
            className="flex items-center justify-center space-x-2 border border-gray-300 text-gray-700 hover:bg-gray-100 px-4 py-2 rounded transition duration-150"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M2.94 6.412A2 2 0 002 8.108V16a2 2 0 002 2h12a2 2 0 002-2V8.108a2 2 0 00-.94-1.696l-6-3.75a2 2 0 00-2.12 0l-6 3.75zm2.615 2.423a1 1 0 10-1.11 1.664l5 3.333a1 1 0 001.11 0l5-3.333a1 1 0 00-1.11-1.664L10 11.798 5.555 8.835z"
                clipRule="evenodd"
              />
            </svg>
            <span>Contact Support</span>
          </Link>
        </div>

        <footer className="mt-10 text-xs text-gray-500 text-center">
          {college?.college_name ?? 'College of Technology & Engineering'} • {new Date().getFullYear()}
        </footer>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center px-4">
        <NotFoundIllustration />
      </div>
    </div>
  );
}

export default NotFoundPage;
