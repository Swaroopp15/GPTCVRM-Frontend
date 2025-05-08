import React, { useContext } from 'react';
import { Context } from '../../../../../Context/Context';

const addAdmission = async (event) => {
  event.preventDefault();
  try {
    const data = {
      year: event.target.year.value,
      depo_code: event.target.depo_code.value,
      allocated: event.target.allocated.value,
      intake: event.target.intake.value
    };
    const response = await fetch(import.meta.env.VITE_BACKEND + 'admissions', { 
      method: 'POST', 
      headers: { 
        'Content-Type': 'application/json' 
      }, 
      body: JSON.stringify(data) 
    });
    
    if (response.ok) {
      alert("New Admission created Successfully");
    } else {
      alert("Error creating Admission");
    }
  } catch (error) {
    console.log("Error at adding new admission", error);
  }
};

function AddAdmission() {
  const { departmentNames } = useContext(Context);
  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden p-6 sm:p-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Add Admissions</h3>
        <p className="text-sm text-gray-500 mt-1">Create new admission records</p>
      </div>
      
      <form onSubmit={addAdmission} className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
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
            <label htmlFor="allocated" className="block text-sm font-medium text-gray-700 mb-2">
              Allocated Seats
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input 
              type="number" 
              min="1"
              defaultValue={66}
              name="allocated" 
              id="allocated"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            />
          </div>

          <div>
            <label htmlFor="intake" className="block text-sm font-medium text-gray-700 mb-2">
              Intake Capacity
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input 
              type="number" 
              min="1"
              name="intake" 
              id="intake"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
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
            Save Admission
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddAdmission;