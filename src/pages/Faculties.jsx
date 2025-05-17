import React, { useContext, useEffect, useState } from "react";
import { DepartmentContext } from "./Department";
import FacultyCard from "../components/Faculty/FacultyCard";

const getFaculty = async (depo_code) => {
  if (!depo_code) return [];
  
  try {
    const response = await fetch(`http://localhost:3000/faculty?depo_code=${depo_code}`);
    
    if (!response.ok) throw new Error("Failed to fetch faculty data");
    
    return await response.json();
  } catch (error) {
    console.error("Error getting faculty list:", error);
    return [];
  }
};

function Faculties() {
  const depo_code = useContext(DepartmentContext);
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!depo_code) return;

    setLoading(true);
    getFaculty(depo_code).then((data) => {
      setFaculty(data);
      setLoading(false);
    });
  }, [depo_code]);

  return (
    <section class="max-w-4xl mx-auto mt-10 p-4 sm:p-6 bg-white shadow-md rounded-lg">
      <h2 class="text-4xl font-bold text-red-700 text-center">Department Faculty Members </h2>
      {/* <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mt-6"> */}
        <table class="w-full border-collapse border border-gray-200">
          <thead>
            <tr class="bg-red-700 text-white">
              <th class="py-3 px-6 border border-gray-300">Photo</th>
              <th class="py-3 px-6 border border-gray-300">Name </th>
              <th class="py-3 px-6 border border-gray-300">department</th>
              <th class="py-3 px-6 border border-gray-300">Disignation</th>
              <th class="py-3 px-6 border border-gray-300">Qualification</th>
              <th class="py-3 px-6 border border-gray-300">Experience</th>
              <th class="py-3 px-6 border border-gray-300">email</th>
              <th class="py-3 px-6 border border-gray-300">Phone</th>


            </tr>
          </thead>
          <tbody>
            {faculty ? faculty?.map((faculty) => {
              return <FacultyCard faculty={faculty} key={faculty.id} />;
            }) :<tr> <td colSpan={4} className="text-center text-2xl p-5">
               No Member available currently
              </td></tr>}
          </tbody>
        </table>
      {/* </div> */}
    </section>
  );
}

export default Faculties;
