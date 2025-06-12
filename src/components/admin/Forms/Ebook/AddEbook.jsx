import React, { useContext, useState } from "react";
import { Context } from "../../../../../Context/Context";

const addEbook = async (event) => {
  try {
    event.preventDefault();
    const form = new FormData();

    form.append("title", event.target.title.value);
    form.append("author", event.target.author.value);
    if(event.target?.link_type.value === "link") {
      form.append("link", event.target.link.value);
    }
    else {
      form.append("ebook", event.target.ebook.files[0]);
    }
    
    const response = await fetch(import.meta.env.VITE_BACKEND + "ebook/", {
      method: "POST",
      body: form,
    });

    if (response.ok) {
      alert("Ebook added successfully");
    } else {
      alert("Error adding lab");
    }
  } catch (error) {
    console.log("Error at adding new Ebook:", error);
  }
};

function AddEbook() {
  const { departmentNames } = useContext(Context);
const [linkType, setLinkType] = useState("");
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden p-6 sm:p-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Add New Ebook</h3>
        <p className="text-sm text-gray-500 mt-1">Create a new laboratory record</p>
      </div>
      
      <form onSubmit={addEbook} className="space-y-6" encType="multipart/form-data">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Ebook Title
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
              Ebook file link Type
              <span className="text-red-500 ml-1">*</span>
            </label>
            <select name="link_type" id="link_type" onChange={(e) => setLinkType(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200">
              <option value="" disabled selected>Select file Type</option>
              <option value="file_upload"> Upload File</option>
              <option value="link"> Link</option>
            </select>
          </div>
        </div>
        {
          linkType === "file_upload" && (
            <div>
              <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-2">
                Upload Ebook File
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="file"
                name="ebook"
                id="ebook"
                required
                accept=".pdf,.epub,.mobi"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
              />
            </div>
          )
          
        }
        {
          linkType === "link" && (
            <div>
              <label htmlFor="link" className="block text-sm font-medium text-gray-700 mb-2">
                Ebook Link
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="url"
                name="link"
                id="link"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
                placeholder="Enter ebook link"
              />
            </div>
          )
        }

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
            Add Ebook
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddEbook;