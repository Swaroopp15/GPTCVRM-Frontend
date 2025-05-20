import React from 'react';
import DepartmentSelector from '../utilities/DepartmentSelector';

const addFaculty = async (event) => {
  event.preventDefault();
  try {
    const form = new FormData();

    form.append("faculty_name", event.target.faculty_name.value);
    form.append("email", event.target.email.value);
    form.append("faculty_role", event.target.faculty_role.value);
    form.append("depo_code", event.target.depo_code.value);
    form.append("number", event.target.number.value);
    form.append("qualification", event.target.qualification.value);
    form.append("category", "faculty");
    form.append("subfolder", event.target.email.value);

    if (event.target.image.files.length > 0) {
      form.append("image", event.target.image.files[0]);
    } else {
      alert("No image selected!");
      return;
    }

    const response = await fetch(import.meta.env.VITE_BACKEND + "faculty/", {
      method: 'POST',
      body: form,
    });

    const result = await response.json();
    if (response.ok) {
      alert("Faculty added successfully");
    } else {
      alert("Error adding faculty");
    }
  } catch (error) {
    console.log("error at adding faculty", error);
  }
};

function AddFaculty() {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden p-6 sm:p-8 max-w-2xl mx-auto my-10">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Add New Faculty</h3>
        <p className="text-sm text-gray-500 mt-1">Enter faculty details and assign them to a department</p>
      </div>
      <form onSubmit={addFaculty} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="faculty_name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name<span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              name="faculty_name"
              id="faculty_name"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email<span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="john@example.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="faculty_role" className="block text-sm font-medium text-gray-700 mb-2">
              Designation<span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              name="faculty_role"
              id="faculty_role"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Assistant Professor"
            />
          </div>

          <div>
            <label htmlFor="depo_code" className="block text-sm font-medium text-gray-700 mb-2">
              Department<span className="text-red-500 ml-1">*</span>
            </label>
            <DepartmentSelector name="depo_code" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="faculty_role" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number<span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              name="number"
              id="number"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="+91 865954331"
            />
          </div>

           <div>
            <label htmlFor="faculty_role" className="block text-sm font-medium text-gray-700 mb-2">
              Qualification<span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              name="qualification"
              id="qualification"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="M.Tech"
            />
          </div>
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
            Faculty Image
          </label>
          <input
            type="file"
            name="image"
            id="image"
            accept="image/*"
            className="w-full text-gray-700 bg-white border border-gray-300 rounded-lg py-2 px-4 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition"
          />
        </div>

        <div className="flex justify-end space-x-3 pt-2">
          <button
            type="reset"
            className="px-5 py-2.5 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
          >
            Reset
          </button>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition transform hover:-translate-y-0.5"
          >
            Save Faculty
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddFaculty;
