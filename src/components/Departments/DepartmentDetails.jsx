import React from 'react'

function DepartmentDetails({department}) {
  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-semibold text-red-800">
        {department?.department_name}
      </h2>
      <h3 className="text-lg sm:text-xl font-semibold mt-6 text-red-800">
        Vision
      </h3>
      <p className="text-gray-700 text-sm sm:text-base">
      {department?.vision}

      </p>
      <h3 className="text-lg sm:text-xl font-semibold mt-6 text-red-800">
        Mission
      </h3>
      <p className="text-gray-700 text-sm sm:text-base">
      {department?.mission}
      </p>
      </div>
  )
}

export default DepartmentDetails