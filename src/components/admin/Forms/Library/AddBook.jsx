import React, { useContext } from "react";
import { Context } from "../../../../../Context/Context";

const addBook = async (event) => {
  try {
    event.preventDefault();
    const form = new FormData();

    form.append("title", event.target.title.value);
    form.append("author", event.target.author.value);
    form.append("type", event.target.type.value);
    form.append("volume", event.target.volumes.value);
    
    const response = await fetch(import.meta.env.VITE_BACKEND + "library/", {
      method: "POST",
      body: form,
    });

    if (response.ok) {
      alert("Book added successfully");
    } else {
      alert("Error adding lab");
    }
  } catch (error) {
    console.log("Error at adding new Book:", error);
  }
};

function AddBook() {
  const { departmentNames } = useContext(Context);

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden p-6 sm:p-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Add New Book</h3>
        <p className="text-sm text-gray-500 mt-1">Create a new laboratory record</p>
      </div>
      
      <form onSubmit={addBook} className="space-y-6" encType="multipart/form-data">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Book Title
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              name="title"
              id="title"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
              placeholder="Enter book title"
            />
          </div>

          <div>
            <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
              Author
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              name="author"
              id="author"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
              placeholder="Enter author's name"
            />
          </div>
           <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
              Book Type
              <span className="text-red-500 ml-1">*</span>
            </label>
            <select name="type" id="type"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
              required>
              <option value="" disabled selected>
                Select book type
              </option>
              <option value="book"> Book</option>
              <option value="journal"> Journal</option>
            </select>
          </div>

          <div>
            <label htmlFor="volumes" className="block text-sm font-medium text-gray-700 mb-2">
              No of Volumes
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="number"
              min={1}
              name="volumes"
              id="volumes"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
              placeholder="Enter number of volumes"
            />
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
            Add Book
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddBook;