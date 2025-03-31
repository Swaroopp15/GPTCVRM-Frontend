import React from 'react'

const addCommittee = async (event) => {
  event.preventDefault();
  try {
    const form = new FormData();
    form.append("name", event.target.name.value);
    form.append("about", event.target.about.value);

    const data = Object.fromEntries(form.entries());
    const response = await fetch(import.meta.env.VITE_BACKEND + "committee/add", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log(result);
    
    if (response.ok) {
      alert("Committee added successfully");
    } else {
      alert("Error adding Committee");
    }
  } catch (error) {
    console.log("error at adding Committee ", error);
  }
};

function AddCommittee() {
  return (
    <div className="my-5">
        <div className="container mx-auto max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl shadow-md dark:shadow-white py-4 px-6 sm:px-10 bg-white dark:bg-gray-800 border-emerald-500 rounded-md">
            <div className="my-3">
                <h1 className="text-center text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Add Committee</h1>
                <form onSubmit={addCommittee} className="my-4">
                    <div className="my-2">
                        <label for="name" className="text-sm sm:text-md font-bold text-gray-700 dark:text-gray-300">Committee Name</label>
                        <input type="text" name="name" className="block w-full border border-emerald-500 outline-emerald-800 px-2 py-2 text-sm sm:text-md rounded-md my-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" id="name" />
                    </div>
                    <div className="my-2">
                        <label for="about" className="text-sm sm:text-md font-bold text-gray-700 dark:text-gray-300">About : </label>
                        <textarea name="about" className="block w-full border border-emerald-500 outline-emerald-800 px-2 py-2 text-sm sm:text-md rounded-md my-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" id="about" > </textarea>

                    </div>
                    
                    <button className="px-4 py-1 bg-emerald-500 rounded-md text-black text-sm sm:text-lg shadow-md">Save</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default AddCommittee