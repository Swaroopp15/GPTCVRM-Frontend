import React from 'react'

function CommitteeDetails({committee}) {
  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-semibold text-red-800">
        {committee?.committee_name}
      </h2>
      <h3 className="text-lg sm:text-xl font-semibold mt-6 text-red-800">
        About
      </h3>
      <p className="text-gray-700 text-sm sm:text-base">
      {committee?.about}

      </p>
      </div>
  )
}

export default CommitteeDetails