import React from 'react'

function SemesterSelector({setSemester}) {
  return (
    <div>
              <label htmlFor="semester" className="block text-sm font-medium text-gray-700 mb-2">
                Semester
              </label>
              <select
                name="semester"
                id="semester"
                required
                onChange={ (e) => {setSemester && setSemester(e.target.value)}}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
              >
                <option value="" disabled selected>Select Semester</option>
                <option value="1">1st Sem</option>
                <option value="3">3rd Sem</option>
                <option value="4">4th Sem</option>
                <option value="5">5th Sem</option>
                <option value="6">6th - Training</option>
                <option value="completer">Completed</option>
                <option value="pending">Pending</option>
              </select>
            </div>
  )
}

export default SemesterSelector