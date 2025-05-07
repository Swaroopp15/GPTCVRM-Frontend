import React, { useEffect, useState } from 'react'
import fetchDepartments from '../../../../functions/fetchDepartments';
import updateDepartment from '../../../../functions/updateDepartment';

function UpdateDepartment() {
  const [departments, setDepartments] = useState([]);
  const [department_name, setDepartmentName] = useState('');
  const [depo_code, setDepoCode] = useState('');
  const [vision, setVision] = useState('');
  const [mission, setMission] = useState('');

  const loadData = async () => {
    const data = await fetchDepartments();
    setDepartments(data);
  }
  useEffect(() => {
    loadData();
  })
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const data = {department_name, vision, mission}
      await updateDepartment(depo_code, data);
    } catch (error) {
      alert("Error updating department: ", error);
    }
  }
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden p-6 sm:p-8">
    <div className="mb-6">
      <h3 className="text-2xl font-bold text-gray-800">Update Department</h3>
    </div>
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="mb-4">
        <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-2">
          Select Department
        </label>
        <select
          id="department"
          name="department"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
          required
          onChange={(e) => {setDepoCode(e.target.value) }}
        >
          <option value="" disabled selected>Select a department</option>
          {departments.map((department) => (
            <option key={department.id} value={department.depo_code}>
              {department.department_name} ({department.depo_code})
            </option>
          ))}
        </select>
      </div>
        <h1 className='border-t-2 pt-5 border-black font-semibold text-xl'>Details to update : </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="department_name" className="block text-sm font-medium text-gray-700 mb-2">
            Department Name
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="text"
            id="department_name"
            name="department_name"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            placeholder="Computer Science"
            onInput={(e) => setDepartmentName(e.target.value)}
          />
        </div>

      </div>

      <div>
        <label htmlFor="vision" className="block text-sm font-medium text-gray-700 mb-2">
          Vision Statement
        </label>
        <textarea
          id="vision"
          name="vision"
          rows="3"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
          placeholder="Department vision statement..."
          onInput={(e) => setVision(e.target.value)}
        ></textarea>
      </div>

      <div>
        <label htmlFor="mission" className="block text-sm font-medium text-gray-700 mb-2">
          Mission Statement
        </label>
        <textarea
          id="mission"
          name="mission"
          rows="3"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
          placeholder="Department mission statement..."
          onInput={(e) => setMission(e.target.value)}
        ></textarea>
      </div>

      <div className="flex justify-end space-x-3 pt-2">
        <button
          type="reset"
          className="px-5 py-2.5 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
        >
          Reset
        </button>
        <button
          type="submit"
          className="px-5 py-2.5 rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 transform hover:-translate-y-0.5"
        >
          Save Department
        </button>
      </div>
    </form>
  </div>
  )
}

export default UpdateDepartment