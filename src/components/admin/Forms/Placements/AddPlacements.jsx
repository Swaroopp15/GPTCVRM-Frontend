import React, { useContext } from "react";
import { Context } from "../../../../../Context/Context";

const addPlacements = async (event) => {
  try {
    event.preventDefault();
    const data = {
      pin: event.target.pin.value,
      name: event.target.name.value,
      company: event.target.company.value,
      role: event.target.role.value,
      package: event.target.package.value,
      depo_code: event.target.depo_code.value,
      year: event.target.year.value
    };
    
    const response = await fetch(import.meta.env.VITE_BACKEND + "placements", {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    
    if (response.ok) {
      alert("Placement added successfully");
      event.target.reset(); // Reset form on success
    } else {
      alert("Failed to add placement");
    }
  } catch (error) {
    console.log("Error at adding new placement:", error);
    alert("An error occurred while adding placement");
  }
};

function AddPlacements() {
  const { departmentNames } = useContext(Context);
  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden p-6 sm:p-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Add Placement Record</h3>
        <p className="text-sm text-gray-500 mt-1">Create new student placement entry</p>
      </div>
      
      <form onSubmit={addPlacements} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="depo_code" className="block text-sm font-medium text-gray-700 mb-2">
              Department
              <span className="text-red-500 ml-1">*</span>
            </label>
            <select
              name="depo_code"
              id="depo_code"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            >
              <option value="">Select Department</option>
              {departmentNames.length > 0 ? (
                departmentNames.map((item) => (
                  <option key={item.depo_code} value={item.depo_code}>
                    {item.department_name}
                  </option>
                ))
              ) : (
                <option value="" disabled>No Departments Available</option>
              )}
            </select>
          </div>

          <div>
            <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-2">
              Year
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="number"
              min="2017"
              max={currentYear}
              defaultValue={currentYear}
              name="year"
              id="year"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            />
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Student Name
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              placeholder="Enter student name"
            />
          </div>

          <div>
            <label htmlFor="pin" className="block text-sm font-medium text-gray-700 mb-2">
              PIN
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              name="pin"
              id="pin"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              placeholder="Enter student PIN"
            />
          </div>

          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
              Company
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              name="company"
              id="company"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              placeholder="Enter company name"
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
              Role
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              name="role"
              id="role"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              placeholder="Enter job role"
            />
          </div>

          <div>
            <label htmlFor="package" className="block text-sm font-medium text-gray-700 mb-2">
              Package (LPA)
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              name="package"
              id="package"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              placeholder="Enter package in LPA"
            />
          </div>
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
            Add Placement Record
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddPlacements;