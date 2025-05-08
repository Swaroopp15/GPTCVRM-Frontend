import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../../../../Context/Context";

const deleteCommittee = async (id) => {
  if (!id) return alert("No committee selected!");

  try {
    const response = await fetch(
      import.meta.env.VITE_BACKEND + "committee/delete/" + id,
      {
        method: "DELETE",
      }
    );
    const result = await response.json();
    
    if (response.ok) {
      alert("Committee deleted successfully");
    } else {
      alert("Error deleting Committee");
    }
  } catch (error) {
    console.log("Error deleting committee:", error);
  }
};

function DeleteCommittee() {
  const [id, setId] = useState(null);
  const { committees } = useContext(Context); 

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden p-6 sm:p-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Delete Committee</h3>
        <p className="text-sm text-gray-500 mt-1">Remove an existing committee</p>
      </div>
      
      <form
        onSubmit={(event) => {
          event.preventDefault();
          deleteCommittee(id);
        }}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label htmlFor="committee" className="block text-sm font-medium text-gray-700 mb-2">
              Committee
              <span className="text-red-500 ml-1">*</span>
            </label>
            <select
              name="id"
              id="committee"
              onChange={(event) => setId(event.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
              required
            >
              <option value="">Select Committee</option>
              {committees.length > 0 ? (
                committees.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))
              ) : (
                <option value="" disabled>No Committees Available</option>
              )}
            </select>
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-2">
          <button
            type="reset"
            className="px-5 py-2.5 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 transform hover:-translate-y-0.5"
          >
            Delete Committee
          </button>
        </div>
      </form>
    </div>
  );
}

export default DeleteCommittee;