import React, { useEffect, useState } from "react";
import DepartmentSelector from "../utilities/DepartmentSelector";

const deleteDepartment = async (depo_code) => {
  if (!depo_code) return alert("No department selected!");

  try {
    const response = await fetch(
      import.meta.env.VITE_BACKEND + "departments/" + depo_code,
      {
        method: "DELETE",
      }
    );
    const result = await response.json();

    if (response.ok) {
      alert("Department deleted successfully");
    } else {
      alert("Error deleting department");
    }
  } catch (error) {
    console.log("Error deleting department:", error);
  }
};

function DeleteDepartment() {
  const [depo_code, setDepo_code] = useState(null);

  return (
    <div className="my-5">
      <div className="container mx-auto max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl shadow-md dark:shadow-white py-4 px-6 sm:px-10 bg-white dark:bg-gray-800 border-emerald-500 rounded-md">
        <div className="my-3">
          <h1 className="text-center text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Delete Department
          </h1>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              deleteDepartment(depo_code);
            }}
            className="my-4"
          >
            <div className="my-2">
              <label
                htmlFor="department"
                className="text-sm sm:text-md font-bold text-gray-700 dark:text-gray-300"
              >
                Department:
              </label>
              <DepartmentSelector name="depo_code" setValue={setDepo_code} />
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

export default DeleteDepartment;
