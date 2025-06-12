import React from 'react';

const addCommittee = async (event) => {
  event.preventDefault();
  try {
    const form = new FormData();
    form.append("name", event.target.name.value);
    form.append("about", event.target.about.value);

    const data = Object.fromEntries(form.entries());
    const response = await fetch(import.meta.env.VITE_BACKEND + "committee/add", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log(result);
    
    if (response.ok) {
      alert("Committee added successfully");
    } else {
      alert("Error adding Committee");
    }
  } catch (error) {
    console.log("error at adding Committee ", error);
  }
};

function AddCommittee() {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden p-6 sm:p-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Add New Committee</h3>
        <p className="text-sm text-gray-500 mt-1">Create a new organizational committee</p>
      </div>
      
      <form onSubmit={addCommittee} className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Committee Name
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
              placeholder="Academic Committee"
            />
          </div>

          <div>
            <label htmlFor="about" className="block text-sm font-medium text-gray-700 mb-2">
              Committee Description
              <span className="text-red-500 ml-1">*</span>
            </label>
            <textarea
              id="about"
              name="about"
              rows="4"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
              placeholder="Describe the committee's purpose and responsibilities..."
            ></textarea>
          </div>
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
            Save Committee
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddCommittee;