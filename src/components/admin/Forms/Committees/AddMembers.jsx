import React, { useContext, useEffect, useState } from "react";
import DepartmentSelector from "../utilities/DepartmentSelector";
import { Context } from "../../../../../Context/Context";

const addMember = async (event) => {
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
      alert("Faculty added to COmmittee successfully");
    } else {
      alert("Error adding faculty to committee");
    }
  } catch (error) {
    console.log("Error deleting committee:", error);
  }
};

function AddMember() {
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const { committees } = useContext(Context);
  const [faculty, setFaculty] = useState();
  const [selectedCommittee, setSelectedCommittee] = useState();
  useEffect(() => {
    const getFaculty = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_BACKEND + "committee/all"
        );
        const data = await response.json();
        console.log(data);
        setFaculty(data);
      } catch (error) {
        console.log("error at fetching facutly free from committees : ", error);
      }
    };
    getFaculty();
  }, []);
  return (
    <div className="my-5">
      <div className="container mx-auto max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl shadow-md dark:shadow-white py-4 px-6 sm:px-10 bg-white dark:bg-gray-800 border-emerald-500 rounded-md">
        <div className="my-3">
          <h1 className="text-center text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Add Member to Committee
          </h1>
          <form onSubmit={(event) => { event.preventDefault(); addMember(event); }} className="my-4" >
            <div className="my-2">
              <label htmlFor="committee" className="text-sm sm:text-md font-bold text-gray-700 dark:text-gray-300" >
                Committee:
              </label>
              <select name="committee" id="committee" onChange={(event) => setSelectedCommittee(event.target.value)} className="block w-full border border-gray-300 rounded-lg p-2.5 text-gray-900 bg-gray-50" aria-placeholder="Select Committee" >
                <option value={null}>Select Committee</option>
                {committees.length > 0 ? (
                  committees.map((item) => ( <option key={item.id} value={item.id}> {item.name} </option>
                  ))
                ) : (
                  <option value="">No Committees Available</option>
                )}
              </select>
            </div>
            <div className="my-2">
              <label htmlFor="faculty" className="text-sm sm:text-md font-bold text-gray-700 dark:text-gray-300" > Faculty : </label>
              <select name="faculty" id="faculty" onChange={(event) => setSelectedFaculty(event.target.value)} className="block w-full border border-gray-300 rounded-lg p-2.5 text-gray-900 bg-gray-50" >
                <option value={null}>Select Faculty</option>
                {faculty?.length > 0 ? (
                  faculty?.map((item) => ( <option key={item.id} value={item.faculty_id}> {item.faculty_name} - {item.email} </option> ))
                ) : (
                  <option value="">No Faculty Available</option>
                )}
              </select>
            </div>
            <div className="my-2">
              <label for="role" className="text-sm sm:text-md font-bold text-gray-700 dark:text-gray-300" >
                Role / Duty
              </label>
              <input type="text" name="role" className="block w-full border border-emerald-500 outline-emerald-800 px-2 py-2 text-sm sm:text-md rounded-md my-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" id="role"/>
            </div>
            <button type="submit" className="px-4 py-1 bg-emerald-500 rounded-md text-black text-sm sm:text-lg shadow-md" >
              Add Faculty to Committee
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddMember;
