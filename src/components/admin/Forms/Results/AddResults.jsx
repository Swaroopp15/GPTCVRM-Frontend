import React, { useContext } from "react";
import { Context } from "../../../../../Context/Context";

const addResult = async (event) => {
  try {
    event.preventDefault();
    const data = {
      pin: event.target.pin.value,
      name: event.target.name.value,
      application_id: event.target.application.value,
      percentage: event.target.percentage.value,
      year: event.target.year.value,
      depo_code : event.target.depo_code.value
    };
    const response = await fetch(import.meta.env.VITE_BACKEND + "results", {
      method: 'POST', 
      headers : {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    if (response.ok) {
      alert("Result added successfully");
    }
    else{
      alert("Failed to add result");
    }
  } catch (error) {
    console.log("Error at adding new Result : ", error);
    
  }
};

function AddResults() {
  const { departmentNames } = useContext(Context);
  return (
    <div className="my-5">
      <div className="container mx-auto max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl shadow-md dark:shadow-white py-4 px-6 sm:px-10 bg-white dark:bg-gray-800 border-emerald-500 rounded-md">
        <div className="my-3">
          <h1 className="text-center text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Add Result Record :{" "}
          </h1>
          <form onSubmit={addResult} className="my-4">
            <div className="my-2">
              <label
                for="department"
                className="text-sm sm:text-md font-bold text-gray-700 dark:text-gray-300"
              >
                Department :{" "}
              </label>
              <select
                name="depo_code"
                id="depo_code"
                className="block w-full border border-gray-300 rounded-lg p-2.5 text-gray-900 bg-gray-50"
                aria-placeholder="Select Committee"
              >
                <option value={null}>Select Department</option>
                {departmentNames.length > 0 ? (
                  departmentNames.map((item) => (
                    <option key={item.depo_code} value={item.depo_code}>
                      {" "}
                      {item.department_name}{" "}
                    </option>
                  ))
                ) : (
                  <option value="">No Departments Available</option>
                )}
              </select>
            </div>
            <div className="my-2">
              <label
                for="year"
                className="text-sm sm:text-md font-bold text-gray-700 dark:text-gray-300"
              >
                Year
              </label>
              <input
                type="number"
                min={2017}
                defaultValue={new Date().getFullYear().toLocaleString()}
                name="year"
                className="block w-full border border-emerald-500 outline-emerald-800 px-2 py-2 text-sm sm:text-md rounded-md my-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                id="year"
              />
            </div>

            <div className="my-2">
              <label
                for="name"
                className="text-sm sm:text-md font-bold text-gray-700 dark:text-gray-300"
              >
                Name :{" "}
              </label>
              <input
                type="text"
                name="name"
                className="block w-full border border-emerald-500 outline-emerald-800 px-2 py-2 text-sm sm:text-md rounded-md my-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                id="name"
              />
            </div>
            <div className="my-2">
              <label
                for="pin"
                className="text-sm sm:text-md font-bold text-gray-700 dark:text-gray-300"
              >
                Pin :{" "}
              </label>
              <input
                type="text"
                name="pin"
                className="block w-full border border-emerald-500 outline-emerald-800 px-2 py-2 text-sm sm:text-md rounded-md my-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                id="pin"
              />
            </div>
            <div className="my-2">
              <label
                for="percentage"
                className="text-sm sm:text-md font-bold text-gray-700 dark:text-gray-300"
              >
                Percentage :{" "}
              </label>
              <input
                type="text"
                name="petcentage"
                className="block w-full border border-emerald-500 outline-emerald-800 px-2 py-2 text-sm sm:text-md rounded-md my-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                id="percentage"
              />
            </div>
            <div className="my-2">
              <label
                for="application"
                className="text-sm sm:text-md font-bold text-gray-700 dark:text-gray-300"
              >
                Application Id :{" "}
              </label>
              <input
                type="text"
                name="application"
                className="block w-full border border-emerald-500 outline-emerald-800 px-2 py-2 text-sm sm:text-md rounded-md my-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                id="application"
              />
            </div>
            <button className="px-4 py-1 bg-emerald-500 rounded-md text-black text-sm sm:text-lg shadow-md">
              Add Result Record
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddResults;
