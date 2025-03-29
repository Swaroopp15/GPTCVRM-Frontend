import React, { useContext, useEffect, useState } from "react";
import { DepartmentContext } from "./Department";
import FacultyCard from "../components/Faculty/FacultyCard";

const getFaculty = async (depo_code) => {
  if (!depo_code) return [];
  
  try {
    console.log("Fetching faculty for:", depo_code);
    const response = await fetch(`http://localhost:3000/faculty?depo_code=${depo_code}`);
    
    if (!response.ok) throw new Error("Failed to fetch faculty data");
    
    return await response.json();
  } catch (error) {
    console.error("Error getting faculty list:", error);
    return [];
  }
};

function Faculty() {
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
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Faculty List</h2>

      {loading ? (
        <p className="text-center">Loading faculty data...</p>
      ) : faculty.length > 0 ? (
        <div className="grid grid-cols-3 gap-4">
          {faculty.map((prof) => (
            <FacultyCard key={prof.id} faculty={prof} />
          ))}
        </div>
      ) : (
        <p className="text-center">No faculty data available.</p>
      )}
    </div>
  );
}

export default Faculty;
