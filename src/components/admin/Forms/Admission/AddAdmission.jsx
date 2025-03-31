import React, { useContext } from 'react'
import { Context } from '../../../../../Context/Context';

const addAdmission = async (event) => {
  event.preventDefault();
  try {
    const data = {
      year : event.target.year.value,
      depo_code : event.target.depo_code.value,
      allocated: event.target.allocated.value,
      intake : event.target.intake.value
    }
    const response = await fetch(import.meta.env.VITE_BACKEND +'admissions', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data)});
    if (response.ok) {
      alert("New Admission created Successfully");
    }
    else {
      alert("Error creating Admission");
    }
  } catch (error) {
    console.log("Error at adding new admission", error);
    
  }
}

function AddAdmission() {
  const {departmentNames} = useContext(Context);
  return (
    <div className="my-5">
    <div className="container mx-auto max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl shadow-md dark:shadow-white py-4 px-6 sm:px-10 bg-white dark:bg-gray-800 border-emerald-500 rounded-md">
        <div className="my-3">
            <h1 className="text-center text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Add Faculty</h1>
            <form onSubmit={addAdmission} className="my-4">
                <div className="my-2">
                    <label for="department" className="text-sm sm:text-md font-bold text-gray-700 dark:text-gray-300">Department : </label>
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
                    <label for="year" className="text-sm sm:text-md font-bold text-gray-700 dark:text-gray-300">Year</label>
                    <input type="number" min={2017} defaultValue={new Date().getFullYear().toLocaleString()} name="year" className="block w-full border border-emerald-500 outline-emerald-800 px-2 py-2 text-sm sm:text-md rounded-md my-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" id="year" />
                </div>

                <div className="my-2">
                    <label for="allocated" className="text-sm sm:text-md font-bold text-gray-700 dark:text-gray-300">Allocated</label>
                    <input type="number" defaultValue={66} name="allocated" className="block w-full border border-emerald-500 outline-emerald-800 px-2 py-2 text-sm sm:text-md rounded-md my-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" id="allocated" />
                </div>
                <div className="my-2">
                    <label for="intake" className="text-sm sm:text-md font-bold text-gray-700 dark:text-gray-300">Intake : </label>
                    <input type="number" name="intake" className="block w-full border border-emerald-500 outline-emerald-800 px-2 py-2 text-sm sm:text-md rounded-md my-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" id="intake" />
                </div>
                <button className="px-4 py-1 bg-emerald-500 rounded-md text-black text-sm sm:text-lg shadow-md">Save</button>
            </form>
        </div>
    </div>
</div>
  )
}

export default AddAdmission