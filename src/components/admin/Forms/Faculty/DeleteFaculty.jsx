import React, { useEffect, useState } from "react";
import DepartemntSelector from "../utilities/DepartmentSelector";
import FacultySelector from "../utilities/FacultySelector";
import { fetchFaculty } from "../../../../functions/faculty";

const deleteFaculty = async (faculty_code) => {
  if (!faculty_code) return alert("No faculty selected!");

  try {
    const response = await fetch(
      import.meta.env.VITE_BACKEND + "faculty/" + faculty_code,
      {
        method: "DELETE",
      }
    );
    const result = await response.json();

    if (response.ok) {
      alert("Faculty deleted successfully");
    } else {
      alert("Error deleting faculty");
    }
  } catch (error) {
    console.log("Error deleting faculty:", error);
  }
};

function DeleteFaculty() {
  const [faculty_code, setFaculty_code] = useState(null);
  const [isConfirming, setIsConfirming] = useState(false);
  const [facultyList, setFacultyList] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  // Logic to fetch faculty available based on selected Department
  useEffect(() => {
    if (!selectedDepartment) return;
    // Fetch faculty based on selected department
    const fetchFacultyList = async () => {
      const data = await fetchFaculty(selectedDepartment);
      setFacultyList(data);
    }
    fetchFacultyList();
  }, [selectedDepartment]);

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden p-6 sm:p-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Delete Faculty</h3>
        <p className="text-sm text-gray-500 mt-1">Remove a faculty from the system</p>
      </div>
      <form onSubmit={(event) => {
        event.preventDefault();
        deleteFaculty(faculty_code);
      }} className="space-y-6">
        <div>
          <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-2">
            Select Department
            <span className="text-red-500 ml-1">*</span>
          </label>
          <DepartemntSelector name="department" setValue={setSelectedDepartment} className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"/>
        </div>
        <div>
          <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-2">
            Select Department
            <span className="text-red-500 ml-1">*</span>
          </label>
          <FacultySelector name="department" facultyList={facultyList} setValue={setFaculty_code} className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"/>
        </div>

        {isConfirming && (
          <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4 animate-fade-in">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-red-500 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h4 className="text-sm font-medium text-red-800">Warning: Irreversible Action</h4>
                <p className="text-sm text-red-700 mt-1">
                  Are you sure you want to delete this faculty? All associated data will be permanently removed.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end space-x-3 pt-2">
          {isConfirming && (
            <button
              type="button"
              onClick={() => setIsConfirming(false)}
              className="px-5 py-2.5 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-200"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={!faculty_code}
            className={`px-5 py-2.5 rounded-lg shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-200 ${!faculty_code
              ? 'bg-red-300 cursor-not-allowed'
              : 'bg-red-600 hover:bg-red-700 transform hover:-translate-y-0.5'
              }`}
          >
            {isConfirming ? 'Confirm Deletion' : 'Delete Faculty'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default DeleteFaculty;
