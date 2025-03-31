import React, { useEffect } from 'react'

function DeleteLabs() {
  const [depo_code, setDepo_code] = useState();
  useEffect(() => {
    if (!depo_code) return;
    const url = import.meta.env.VITE_BACKEND + 'labs'
  }, [depo_code]);
  return (
    <div className="my-5">
      <div className="container mx-auto max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl shadow-md dark:shadow-white py-4 px-6 sm:px-10 bg-white dark:bg-gray-800 border-emerald-500 rounded-md">
        <div className="my-3">
          <h1 className="text-center text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Delete Faculty
          </h1>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              deleteFaculty(selectedFaculty);
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
                Faculty:
              </label>
              <select
                name="id"
                id="faculty"
                onChange={(event) => setSelectedFaculty(event.target.value)}
                className="block w-full border border-gray-300 rounded-lg p-2.5 text-gray-900 bg-gray-50"
              >
                {facultyList.length > 0 ? (
                  facultyList.map((item) => (
                    <option key={item.id} value={item.faculty_id}>
                      {item.faculty_name} - {item.email}
                    </option>
                  ))
                ) : (
                  <option value="">No Faculty</option>
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
  )
}

export default DeleteLabs