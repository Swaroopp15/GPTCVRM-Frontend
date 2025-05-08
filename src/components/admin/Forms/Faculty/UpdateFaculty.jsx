import React, { useEffect, useState } from 'react'
import DepartmentSelector from "../utilities/DepartmentSelector";
import FacultySelector from '../utilities/FacultySelector';
import { fetchFaculty, updateFaculty } from '../../../../functions/faculty';


function UpdateFaculty() {
  const [selectedFaculty, setSelectedFaculty] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [facultyList, setFacultyList] = useState([]);
  const [depo_code, setDepo_code] = useState('');
  const [faculty_name, setFaculty_name] = useState('');
  const [faculty_role, setFaculty_role] = useState('');
  const [email, setEmail] = useState('');
  const [faculty_code, setFaculty_code] = useState(''); 

  // Logic to update faculty details
  const updateFacultyDetails = async () => {
    await updateFaculty(selectedFaculty, faculty_name, faculty_role, email, depo_code);
  }
  
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
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden p-6 sm:p-8 max-w-2xl mx-auto my-10">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Add New Faculty</h3>
        <p className="text-sm text-gray-500 mt-1">Enter faculty details and assign them to a department</p>
      </div>
      <form onSubmit={(event) => {event.preventDefault(); updateFacultyDetails()}} className="space-y-6">
      <div>
          <label htmlFor="Department" className="block text-sm font-medium text-gray-700 mb-2">
            Select Department
            <span className="text-red-500 ml-1">*</span>
          </label>
          <DepartmentSelector name="department" setValue={setSelectedDepartment} className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"/>
        </div>
        <div>
          <label htmlFor="faculty" className="block text-sm font-medium text-gray-700 mb-2">
            Select Faculty
            <span className="text-red-500 ml-1">*</span>
          </label>
          <FacultySelector name="faculty_code" setValue={setSelectedFaculty} facultyList={facultyList} className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"/>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="faculty_name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="faculty_name"
              id="faculty_name"
              onChange={(event) => setFaculty_name(event.currentTarget.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={(event) => setEmail(event.currentTarget.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="john@example.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="faculty_role" className="block text-sm font-medium text-gray-700 mb-2">
              Designation
            </label>
            <input
              type="text"
              name="faculty_role"
              id="faculty_role"
              onChange={(event) => setFaculty_role(event.currentTarget.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Assistant Professor"
            />
          </div>

          <div>
            <label htmlFor="depo_code" className="block text-sm font-medium text-gray-700 mb-2">
              Department
            </label>
            <DepartmentSelector name="depo_code" setValue={setDepo_code} />
          </div>
        </div>


        <div className="flex justify-end space-x-3 pt-2">
          <button
            type="reset"
            className="px-5 py-2.5 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
          >
            Reset
          </button>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition transform hover:-translate-y-0.5"
          >
            Save Faculty
          </button>
        </div>
      </form>
    </div>
  )
}

export default UpdateFaculty