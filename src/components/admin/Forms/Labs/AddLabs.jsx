import React, { useContext, useState } from "react";
import { Context } from "../../../../../Context/Context";

const addLab = async (event) => {
  try {
    const form = new FormData();

    form.append("lab_name", event.target.lab_name.value);
    form.append("description", event.target.description.value);
    form.append("depo_code", event.target.depo_code.value);
    form.append("capacity", event.target.capacity.value);
    form.append("equipment", event.target.equipment.value);
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
    console.log("Error at adding new Lab : " + error);
  }
};

function AddLabs() {
  const { departmentNames } = useContext(Context);
  return (
    <div className="my-5">
      <div className="container mx-auto max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl shadow-md dark:shadow-white py-4 px-6 sm:px-10 bg-white dark:bg-gray-800 border-emerald-500 rounded-md">
        <div className="my-3">
          <h1 className="text-center text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Add New Lab
          </h1>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              addLab(event);
            }}
            className="my-4"
          >
            <div className="my-2">
              <label
                htmlFor="depo_code"
                className="text-sm sm:text-md font-bold text-gray-700 dark:text-gray-300"
              >
                Departments :
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
                for="lab_name"
                className="text-sm sm:text-md font-bold text-gray-700 dark:text-gray-300"
              >
                Lab Name
              </label>
              <input
                type="text"
                name="lab_name"
                className="block w-full border border-emerald-500 outline-emerald-800 px-2 py-2 text-sm sm:text-md rounded-md my-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                id="lab_name"
              />
            </div>
            <div className="my-2">
              <label
                for="role"
                className="text-sm sm:text-md font-bold text-gray-700 dark:text-gray-300"
              >
                Description
              </label>
              <input
                type="text"
                name="description"
                className="block w-full border border-emerald-500 outline-emerald-800 px-2 py-2 text-sm sm:text-md rounded-md my-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                id="description"
              />
            </div>
            <div className="my-2">
              <label
                for="capacity"
                className="text-sm sm:text-md font-bold text-gray-700 dark:text-gray-300"
              >
                Capacity
              </label>
              <input
                type="number"
                min={0}
                name="capacity"
                className="block w-full border border-emerald-500 outline-emerald-800 px-2 py-2 text-sm sm:text-md rounded-md my-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                id="capacity"
              />
            </div>
            <div className="my-2">
              <label
                for="equipment"
                className="text-sm sm:text-md font-bold text-gray-700 dark:text-gray-300"
              >
                Equipment
              </label>
              <textarea name="equipment" className="block w-full border border-emerald-500 outline-emerald-800 px-2 py-2 text-sm sm:text-md rounded-md my-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" id="equipment" />
            </div>
            <div className="my-2">
              <label for="lab_images" className="text-sm sm:text-md font-bold text-gray-700 dark:text-gray-300" >
                Lab Images :
              </label>
              <input
                type="file" accept="image/*" multiple name="lab_images"  className="block w-full border border-emerald-500 outline-emerald-800 px-2 py-2 text-sm sm:text-md rounded-md my-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" id="lab_images"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-1 bg-emerald-500 rounded-md text-black text-sm sm:text-lg shadow-md"
            >
              Add Lab
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddLabs;
