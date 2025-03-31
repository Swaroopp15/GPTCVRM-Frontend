import React from 'react'
import { Link, Outlet } from 'react-router'

function AdminCommittees() {
  return (
    <div className="bg-gray-100 font-sans flex items-center justify-center">
    <div className="p-8">
        <h1 className='text-center text-red-700 text-3xl'>Committees Operations</h1>
      <div className=" mx-auto">
        <div className="mb-4 flex space-x-4 p-2 bg-white rounded-lg shadow-md">
          <Link
            to={"add"}
            className="flex-1 py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-blue transition-all duration-300"
          >
            Add Committees
          </Link>
          <Link
            to={"add-member"}
            className="flex-1 py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-blue transition-all duration-300"
          >
            Add Committees Member
          </Link>
          <Link
            to={"delete"}
            className="flex-1 py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-blue transition-all duration-300"
          >
            Delete Committees
          </Link>
          <Link
            to={`update`}
            className="flex-1 py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-blue transition-all duration-300"
          >
            Update Committees
          </Link>
        </div>
          <Outlet />
      </div>
    </div>
  </div>
  )
}

export default AdminCommittees