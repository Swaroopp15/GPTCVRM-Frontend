import React from 'react'

const addDepartment = async (event) => {
  event.preventDefault();
  try {
    const form = new FormData();
    form.append("department_name", event.target.department_name.value);
    form.append("depo_code", event.target.depo_code.value);
    form.append("vision", event.target.vision.value);
    form.append("mission", event.target.mission.value);

    const data = Object.fromEntries(form.entries());
    const response = await fetch(import.meta.env.VITE_BACKEND + "departments/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log(result);
    
    if (response.ok) {
      alert("Department added successfully");
    } else {
      alert("Error adding Department");
    }
  } catch (error) {
    console.log("error at adding Department ", error);
  }
};

function AddDepartment() {
  return (
    <div className="my-5">
        <div className="container mx-auto max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl shadow-md dark:shadow-white py-4 px-6 sm:px-10 bg-white dark:bg-gray-800 border-emerald-500 rounded-md">
            <div className="my-3">
                <h1 className="text-center text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Add Faculty</h1>
                <form onSubmit={addDepartment} className="my-4">
                    <div className="my-2">
                        <label for="department_name" className="text-sm sm:text-md font-bold text-gray-700 dark:text-gray-300">Department Name</label>
                        <input type="text" name="department_name" className="block w-full border border-emerald-500 outline-emerald-800 px-2 py-2 text-sm sm:text-md rounded-md my-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" id="department_name" />
                    </div>

                    <div className="my-2">
                        <label for="depo_code" className="text-sm sm:text-md font-bold text-gray-700 dark:text-gray-300">Department Code</label>
                        <input type="text" name="depo_code" className="block w-full border border-emerald-500 outline-emerald-800 px-2 py-2 text-sm sm:text-md rounded-md my-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" id="depo_code" />
                    </div>
                    <div className="my-2">
                        <label for="vision" className="text-sm sm:text-md font-bold text-gray-700 dark:text-gray-300">Vision : </label>
                        <textarea name="vision" className="block w-full border border-emerald-500 outline-emerald-800 px-2 py-2 text-sm sm:text-md rounded-md my-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" id="vision" > </textarea>
                    </div>
                    <div className="my-2">
                        <label for="mission" className="text-sm sm:text-md font-bold text-gray-700 dark:text-gray-300">Mission : </label>
                        <textarea name="mission" className="block w-full border border-emerald-500 outline-emerald-800 px-2 py-2 text-sm sm:text-md rounded-md my-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" id="mission" > </textarea>

                    </div>
                    
                    <button className="px-4 py-1 bg-emerald-500 rounded-md text-black text-sm sm:text-lg shadow-md">Save</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default AddDepartment