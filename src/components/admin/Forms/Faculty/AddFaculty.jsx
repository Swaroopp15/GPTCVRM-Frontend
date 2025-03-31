import React, { useEffect } from 'react'
import DepartmentSelector from '../utilities/DepartmentSelector'

const addFaculty = async (event) => {
  event.preventDefault();
  try {
    const form = new FormData();

    form.append("faculty_name", event.target.faculty_name.value);
    form.append("email", event.target.email.value);
    form.append("faculty_role", event.target.faculty_role.value);
    form.append("depo_code", event.target.depo_code.value);
    form.append("category", "faculty"); 
    form.append("subfolder", event.target.email.value);

    if (event.target.image.files.length > 0) {
      form.append("image", event.target.image.files[0]);
    } else {
      alert("No image selected!");
    }

    const response = await fetch(import.meta.env.VITE_BACKEND + "faculty/", {
      method: 'POST',
      body: form,
    });

    const result = await response.json();
    if (response.ok) {
      alert("Faculty added successfully");
    } else {
      alert("Error adding faculty");
    }
  } catch (error) {
    console.log("error at adding faculty", error);
  }
};


function AddFaculty() {
  return (
    <div className="my-5">
        <div className="container mx-auto max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl shadow-md dark:shadow-white py-4 px-6 sm:px-10 bg-white dark:bg-gray-800 border-emerald-500 rounded-md">
            <div className="my-3">
                <h1 className="text-center text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Add Faculty</h1>
                <form onSubmit={addFaculty} className="my-4">
                    <div className="my-2">
                        <label for="name" className="text-sm sm:text-md font-bold text-gray-700 dark:text-gray-300">Full Name</label>
                        <input type="text" name="faculty_name" className="block w-full border border-emerald-500 outline-emerald-800 px-2 py-2 text-sm sm:text-md rounded-md my-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" id="name" />
                    </div>

                    <div className="my-2">
                        <label for="email" className="text-sm sm:text-md font-bold text-gray-700 dark:text-gray-300">Email</label>
                        <input type="email" name="email" className="block w-full border border-emerald-500 outline-emerald-800 px-2 py-2 text-sm sm:text-md rounded-md my-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" id="email" />
                    </div>
                    <div className="my-2">
                        <label for="faculty_role" className="text-sm sm:text-md font-bold text-gray-700 dark:text-gray-300">Designation : </label>
                        <input type="text" name="faculty_role" className="block w-full border border-emerald-500 outline-emerald-800 px-2 py-2 text-sm sm:text-md rounded-md my-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" id="faculty_role" />
                    </div>
                    <div className="my-2">
                        <label for="department" className="text-sm sm:text-md font-bold text-gray-700 dark:text-gray-300">Department : </label>
                        <DepartmentSelector name={"depo_code"} />
                    </div>
                    <div className="my-2">
                        <label for="image" className="text-sm sm:text-md font-bold text-gray-700 dark:text-gray-300">faculty Image : </label>
                        <input type="file" name="image" id="image" placeholder='Select faculty image'/>
                    </div>
                    <button className="px-4 py-1 bg-emerald-500 rounded-md text-black text-sm sm:text-lg shadow-md">Save</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default AddFaculty