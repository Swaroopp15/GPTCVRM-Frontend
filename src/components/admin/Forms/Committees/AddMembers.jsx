import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../../../../Context/Context";

const addMember = async (event) => {
  event.preventDefault();
  const form = new FormData();
  form.append("committee_id", event.target.committee.value);
  form.append("faculty_id", event.target.faculty.value);
  form.append("role", event.target.role.value);
  const data = Object.fromEntries(form.entries());
  
  try {
    const response = await fetch(
      import.meta.env.VITE_BACKEND + "committee/add",
      {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      }
    );
    const result = await response.json();

    if (response.ok) {
      alert("Faculty added to Committee successfully");
    } else {
      alert("Error adding faculty to committee");
    }
  } catch (error) {
    console.log("Error adding committee member:", error);
  }
};

function AddMember() {
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const { committees } = useContext(Context);
  const [faculty, setFaculty] = useState([]);
  const [selectedCommittee, setSelectedCommittee] = useState(null);

  useEffect(() => {
    const getFaculty = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_BACKEND + "committee/all"
        );
        const data = await response.json();
        setFaculty(data);
      } catch (error) {
        console.log("Error fetching faculty free from committees:", error);
      }
    };
    getFaculty();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden p-6 sm:p-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Add Member to Committee</h3>
        <p className="text-sm text-gray-500 mt-1">Assign faculty members to committees</p>
      </div>
      
      <form onSubmit={addMember} className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label htmlFor="committee" className="block text-sm font-medium text-gray-700 mb-2">
              Committee
              <span className="text-red-500 ml-1">*</span>
            </label>
            <select
              name="committee"
              id="committee"
              onChange={(event) => setSelectedCommittee(event.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
              required
            >
              <option value="">Select Committee</option>
              {committees.length > 0 ? (
                committees.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))
              ) : (
                <option value="" disabled>No Committees Available</option>
              )}
            </select>
          </div>

          <div>
            <label htmlFor="faculty" className="block text-sm font-medium text-gray-700 mb-2">
              Faculty Member
              <span className="text-red-500 ml-1">*</span>
            </label>
            <select
              name="faculty"
              id="faculty"
              onChange={(event) => setSelectedFaculty(event.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
              required
            >
              <option value="">Select Faculty</option>
              {faculty.length > 0 ? (
                faculty.map((item) => (
                  <option key={item.id} value={item.faculty_id}>
                    {item.faculty_name} - {item.email}
                  </option>
                ))
              ) : (
                <option value="" disabled>No Faculty Available</option>
              )}
            </select>
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
              Role/Duty
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              name="role"
              id="role"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
              placeholder="Enter role or duty"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-2">
          <button
            type="reset"
            className="px-5 py-2.5 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-200"
          >
            Reset
          </button>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-200 transform hover:-translate-y-0.5"
          >
            Add Faculty to Committee
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddMember;