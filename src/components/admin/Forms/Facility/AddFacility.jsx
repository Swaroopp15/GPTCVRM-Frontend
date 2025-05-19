import React from 'react';

const addFacility = async (event) => {
  event.preventDefault();
  try {
    const form = new FormData();
    form.append("name", event.target.facility_name.value);
    form.append("about", event.target.about.value);
    if (event.target.image.files.length > 0) {
      form.append("images", event.target.image.files[0]);
    } else {
      alert("No image selected!");
      return;
    }

    const response = await fetch(import.meta.env.VITE_BACKEND + "facility/", {
      method: 'POST',
      body: form
    });

    const result = await response.json();
    console.log(result);

    if (response.ok) {
      alert("Facility added successfully");
    } else {
      alert("Error adding Facility");
    }
  } catch (error) {
    console.log("error at adding Facility ", error);
  }
};
function AddFacility() {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden p-6 sm:p-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Add New Facility</h3>
        <p className="text-sm text-gray-500 mt-1">Create a new academic department</p>
      </div>
      <form onSubmit={addFacility} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          <div>
            <label htmlFor="facility_name" className="block text-sm font-medium text-gray-700 mb-2">
              Facility Name
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              id="facility_name"
              name="facility_name"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              placeholder="Computer Science"
            />
        </div>

          </div>

        <div>
          <label htmlFor="about" className="block text-sm font-medium text-gray-700 mb-2">
            Facility About Text
          </label>
          <textarea
            id="about"
            name="about"
            rows="3"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            placeholder="Facility about statement..."
          ></textarea>
        </div>
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
            Facility Image
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
            className="px-5 py-2.5 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
          >
            Reset
          </button>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 transform hover:-translate-y-0.5"
          >
            Save Facility
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddFacility;