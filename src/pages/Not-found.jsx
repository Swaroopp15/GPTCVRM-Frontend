import React, { useContext } from 'react';
import { Link } from 'react-router';
import { Context } from '../../Context/Context';

function NotFoundPage() {
  const { college } = useContext(Context);

  return (
    <div
      className="fixed inset-0 bg-cover bg-center flex items-center justify-center p-4"
      style={{ backgroundImage: `url(${college?.college_image})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>

      <div className="relative z-10 bg-white/90 rounded-xl shadow-lg border border-gray-200 p-8 md:p-10 max-w-md w-full text-center backdrop-blur-sm">
        <div className="mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-20 w-20 mx-auto text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-3">404 - Page Not Found</h1>
        <p className="text-gray-700 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="flex flex-col space-y-3">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z"
                clipRule="evenodd"
              />
            </svg>
            Return Home
          </Link>

          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-100 font-medium rounded-lg transition duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M2.94 6.412A2 2 0 002 8.108V16a2 2 0 002 2h12a2 2 0 002-2V8.108a2 2 0 00-.94-1.696l-6-3.75a2 2 0 00-2.12 0l-6 3.75zm2.615 2.423a1 1 0 10-1.11 1.664l5 3.333a1 1 0 001.11 0l5-3.333a1 1 0 00-1.11-1.664L10 11.798 5.555 8.835z"
                clipRule="evenodd"
              />
            </svg>
            Contact Support
          </Link>
        </div>

        <footer className="mt-6 pt-4 border-t border-gray-300 text-xs text-gray-500">
          {college?.college_name ?? 'College of Technology & Engineering'} • {new Date().getFullYear()}
        </footer>
      </div>
    </div>
  );
}

export default NotFoundPage;
