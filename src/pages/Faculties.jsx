import React, { useContext, useEffect, useState } from "react";
import { DepartmentContext } from "./Department";
import FacultyCard from "../components/Faculty/FacultyCard";
import { motion } from "framer-motion";

const getFaculty = async (depo_code) => {
  if (!depo_code) return [];
  
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND}faculty?depo_code=${depo_code}`);
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
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!depo_code) return;

    setLoading(true);
    getFaculty(depo_code).then((data) => {
      setFaculty(data);
      setLoading(false);
    });
  }, [depo_code]);

  const filteredFaculty = faculty
    .filter((fac) =>
      fac.faculty_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fac.faculty_role.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      // Sort HOD to the top
      const aIsHOD = a.faculty_role.toLowerCase().includes('hod') || 
                    a.faculty_role.toLowerCase().includes('head of department');
      const bIsHOD = b.faculty_role.toLowerCase().includes('hod') || 
                    b.faculty_role.toLowerCase().includes('head of department');
      
      if (aIsHOD && !bIsHOD) return -1;
      if (!aIsHOD && bIsHOD) return 1;
      return 0;
    });

  return (
    <section className="max-w-7xl mx-auto mt-6 p-4 sm:p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          Faculty Members
        </h2>
        
        <div className="max-w-md">
          <div className="relative">
            <input
              type="text"
              placeholder="Search faculty..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </motion.div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {filteredFaculty.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFaculty.map((faculty, index) => (
                <FacultyCard faculty={faculty} key={faculty.id} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <svg className="h-12 w-12 text-gray-400 mb-4 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-gray-600">No faculty members found matching your search</p>
            </div>
          )}
        </motion.div>
      )}
    </section>
  );
}

export default Faculties;