import React from 'react';

const addDepartment = async (event) => {
  event.preventDefault();
  try {
    const form = new FormData();
    form.append("department_name", event.target.department_name.value);
    form.append("depo_code", event.target.depo_code.value);
    form.append("vision", event.target.vision.value);
    form.append("mission", event.target.mission.value);

    const data = Object.fromEntries(form.entries());
    const response = await fetch(import.meta.env.VITE_BACKEND + "departments/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log(result);

    if (response.ok) {
      alert("Department added successfully");
    } else {
      alert("Error adding Department");
    }
  } catch (error) {
    console.log("error at adding Department ", error);
  }
};
function AddDepartment() {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden p-6 sm:p-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Add New Department</h3>
        <p className="text-sm text-gray-500 mt-1">Create a new academic department</p>
      </div>
      <form onSubmit={addDepartment} className="space-y-6">
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
              placeholder="Computer Science"
            />
          </div>

          <div>
            <label htmlFor="depo_code" className="block text-sm font-medium text-gray-700 mb-2">
              Department Code
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              id="depo_code"
              name="depo_code"
              required
              maxLength="5"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
              placeholder="CS"
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
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
            placeholder="Department vision statement..."
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
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
            placeholder="Department mission statement..."
          ></textarea>
        </div>

        <div className="flex justify-end space-x-3 pt-2">
          <button
            type="reset"
            className="px-5 py-2.5 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-200"
          >
            Reset
          </button>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-200 transform hover:-translate-y-0.5"
          >
            Save Department
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddDepartment;