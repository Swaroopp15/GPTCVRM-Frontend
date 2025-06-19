import React from 'react'
import { Link, Outlet } from 'react-router';


function AdminCollegeInfo() {
  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-red-700 mb-8">Committees Management</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link
          to="info"
          className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-full bg-blue-50 text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-gray-800">Update Information</h3>
              <p className="text-sm text-gray-500 mt-1">Update college information</p>
            </div>
          </div>
        </Link>
        
        <Link
          to="image"
          className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:border-green-300 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-full bg-green-50 text-green-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-gray-800">Update Images</h3>
              <p className="text-sm text-gray-500 mt-1">Update college images</p>
            </div>
          </div>
        </Link>
    
      </div>
      
      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
        <Outlet />
      </div>
    </div>
  )
}

export default AdminCollegeInfo