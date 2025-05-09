import React, { useEffect, useState } from 'react'
import { getLabs, updateLab } from '../../../../functions/labs';
import DepartmentSelector from "../utilities/DepartmentSelector";


function UpdateLabs() {
  const [depo_code, setDepo_code] = useState();
  const [labs, setLabs] = useState([]);
  const [selectedLab, setSelectedLab] = useState("");
  useEffect(() => {
    if (!depo_code) return;
    getLabs(depo_code).then((data) => setLabs(data));
  }, [depo_code]);
  return (
    <div className="my-5">
      <div className="container mx-auto max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl shadow-md dark:shadow-white py-4 px-6 sm:px-10 bg-white dark:bg-gray-800 border-emerald-500 rounded-md">
        <div className="my-3">
          <h1 className="text-center text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Delete Lab
          </h1>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              updateLab(selectedLab, event);
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

            <div className="my-2">
              <label
                htmlFor="faculty"
                className="text-sm sm:text-md font-bold text-gray-700 dark:text-gray-300"
              >
                Lab:
              </label>
              <select
                name="id"
                id="faculty"
                onChange={(event) => setSelectedLab(event.target.value)}
                className="block w-full border border-gray-300 rounded-lg p-2.5 text-gray-900 bg-gray-50"
              >
                <option value="" disabled selected>
                  Select a Lab
                </option>
                {labs.length > 0 ? (
                  labs.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.lab_name}
                    </option>
                  ))
                ) : (
                  <option value="">No Labs Available</option>
                )}
              </select>
            </div>
            <div>
            <label htmlFor="lab_name" className="block text-sm font-medium text-gray-700 mb-2">
              Lab Name
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              name="lab_name"
              id="lab_name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              placeholder="Enter lab name"
            />
          </div>

          <div>
            <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 mb-2">
              Capacity
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="number"
              min="0"
              name="capacity"
              id="capacity"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              placeholder="Enter capacity"
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              rows="3"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              placeholder="Enter lab description"
            ></textarea>
          </div>

          <div className="md:col-span-2">
            <label htmlFor="equipment" className="block text-sm font-medium text-gray-700 mb-2">
              Equipment
            </label>
            <textarea
              name="equipment"
              id="equipment"
              rows="3"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              placeholder="List equipment (comma separated)"
            ></textarea>
          </div>
          <div className="md:col-span-2">
            <label htmlFor="lab_images" className="block text-sm font-medium text-gray-700 mb-2">
              Lab Images
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              name="lab_images"
              id="lab_images"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

            <button
              type="submit"
              className="px-4 py-1 bg-emerald-500 rounded-md text-black text-sm sm:text-lg shadow-md"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UpdateLabs