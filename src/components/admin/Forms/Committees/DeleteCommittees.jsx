import React, { useContext, useEffect, useState } from "react";
import DepartmentSelector from "../utilities/DepartmentSelector";
import { Context } from "../../../../../Context/Context";

const deleteCommittee = async (id) => {
  if (!id) return alert("No department selected!");

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
  const {committees} = useContext(Context);
  console.log(committees);
  
  return (
    <div className="my-5">
      <div className="container mx-auto max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl shadow-md dark:shadow-white py-4 px-6 sm:px-10 bg-white dark:bg-gray-800 border-emerald-500 rounded-md">
        <div className="my-3">
          <h1 className="text-center text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Delete Committee
          </h1>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              deleteCommittee(id);
            }}
            className="my-4"
          >
            <div className="my-2">
              <label
                htmlFor="department"
                className="text-sm sm:text-md font-bold text-gray-700 dark:text-gray-300"
              >
                Committee:
              </label>
              <select
                name="id"
                id="faculty"
                onChange={(event) => setId(event.target.value)}
                className="block w-full border border-gray-300 rounded-lg p-2.5 text-gray-900 bg-gray-50"
                aria-placeholder="Select Committee"
              >
                <option value={null}>
                  Select Committee
                </option>
                {committees.length > 0 ? (
                  committees.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))
                ) : (
                  <option value="">No Committees Available</option>
                )}
              </select>
            </div>


            <button
              type="submit"
              className="px-4 py-1 bg-emerald-500 rounded-md text-black text-sm sm:text-lg shadow-md"
            >
              Delete
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DeleteCommittee;
