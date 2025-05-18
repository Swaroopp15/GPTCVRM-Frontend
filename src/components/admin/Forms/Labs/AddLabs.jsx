import React, { useContext } from "react";
import { Context } from "../../../../../Context/Context";

const addLab = async (event) => {
  try {
    event.preventDefault();
    const form = new FormData();

    form.append("lab_name", event.target.lab_name.value);
    form.append("description", event.target.description.value);
    form.append("depo_code", event.target.depo_code.value);
    form.append("capacity", event.target.capacity.value);
    form.append("equipment", event.target.equipment.value);
    form.append("specifications", event.target.specifications.value);
    form.append("budget", event.target.budget.value)
    form.append("conducted_labs", event.target.conducted_labs.value)
    form.append("category", "labs");
    form.append("subfolder", event.target.lab_name.value);
    
    const files = event.target.lab_images.files;
    for (let i = 0; i < files.length; i++) {
      form.append("lab_images", files[i]);
    }

    const response = await fetch(import.meta.env.VITE_BACKEND + "labs/add", {
      method: "POST",
      body: form,
    });

    if (response.ok) {
      alert("Lab added successfully");
    } else {
      alert("Error adding lab");
    }
  } catch (error) {
    console.log("Error at adding new Lab:", error);
  }
};

function AddLabs() {
  const { departmentNames } = useContext(Context);

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden p-6 sm:p-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Add New Lab</h3>
        <p className="text-sm text-gray-500 mt-1">Create a new laboratory record</p>
      </div>
      
      <form onSubmit={addLab} className="space-y-6" encType="multipart/form-data">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-3">
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
            <label htmlFor="lab_name" className="block text-sm font-medium text-gray-700 mb-2">
              Lab Name
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              name="lab_name"
              id="lab_name"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              placeholder="Enter lab name"
            />
          </div>

          <div>
            <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 mb-2">
              Capacity
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="number"
              min="0"
              name="capacity"
              id="capacity"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              placeholder="Enter capacity"
            />
          </div>
          <div>
            <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
              Budget
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="number"
              min="0"
              name="budget"
              id="budget"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              placeholder="Enter capacity"
            />
          </div>
          <div className="md:col-span-3">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              rows="3"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              placeholder="Enter lab description"
            ></textarea>
          </div>

          <div className="md:col-span-3">
            <label htmlFor="equipment" className="block text-sm font-medium text-gray-700 mb-2">
              Equipment
            </label>
            <textarea
              name="equipment"
              id="equipment"
              rows="3"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              placeholder="List equipment (comma separated)"
            ></textarea>
          </div>
          <div className="md:col-span-3">
            <label htmlFor="specifications" className="block text-sm font-medium text-gray-700 mb-2">
              Specifications
            </label>
            <textarea
              name="specifications"
              id="specifications"
              rows="3"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              placeholder="List Specifications (comma separated)"
            ></textarea>
          </div><div className="md:col-span-3">
            <label htmlFor="conducted_labs" className="block text-sm font-medium text-gray-700 mb-2">
              Labs Conducted (Subjects)
            </label>
            <textarea
              name="conducted_labs"
              id="conducted_labs"
              rows="3"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              placeholder="List Labs Conducted (Subjects) (comma separated)"
            ></textarea>
          </div>

          <div className="md:col-span-2">
            <label htmlFor="lab_images" className="block text-sm font-medium text-gray-700 mb-2">
              Lab Images
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              name="lab_images"
              id="lab_images"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
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
            Add Lab
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddLabs;