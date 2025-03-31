import React from 'react'
import { Link, Outlet } from 'react-router'

function Faculty() {
  return (
    <div className="bg-gray-100 font-sans flex items-center justify-center">
        <div className="p-8">
            <h1 className='text-center text-red-700 text-3xl'>Faculty Operations</h1>
          <div className=" mx-auto">
            <div className="mb-4 flex space-x-4 p-2 bg-white rounded-lg shadow-md">
              <Link
                to={"addfaculty"}
                className="flex-1 py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-blue transition-all duration-300"
              >
                Add Faculty
              </Link>
              <Link
                to={"deleteFaculty"}
                className="flex-1 py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-blue transition-all duration-300"
              >
                Delete Faculty
              </Link>
              <Link
                to={`updateFaculty`}
                className="flex-1 py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-blue transition-all duration-300"
              >
                Update Faculty
              </Link>
            </div>
              <Outlet />
          </div>
        </div>
      </div>
  )
}

export default Faculty