import React, { useEffect, useState } from "react";
import Spinner from "../components/hero/Spinner";

const AdmissionRow = ({ admission, index }) => {
  return (
    <>
      {admission?.admissions.map((branch, branchIndex) => (
        <tr key={`${index}-${branchIndex}`} className="hover:bg-gray-100">
          {branchIndex === 0 && (
            <td 
              className="py-3 px-6 border border-gray-300" 
              rowSpan={admission.admissions.length}
            >
              {admission.year}
            </td>
          )}
          <td className="py-3 px-6 border border-gray-300">{branch.depo_code}</td>
          <td className="py-3 px-6 border border-gray-300">{branch.allocated}</td>
          <td className="py-3 px-6 border border-gray-300">{branch.intake}</td>
        </tr>
      ))}
    </>
  );
};

function Admissions() {
  const [admissions, setAdmissions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAdmissions = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(import.meta.env.VITE_BACKEND + "admissions");
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!Array.isArray(data)) {
          throw new Error("Invalid data format received");
        }
        
        setAdmissions(data);
      } catch (error) {
        console.error("Error fetching admissions:", error);
        setError(error.message || "Failed to load admission data");
      } finally {
        setLoading(false);
      }
    };

    getAdmissions();
  }, []);

  if (loading) {
    return <Spinner message="Loading admission data..." />;
  }

  if (error) {
    return (
      <section className="py-16 px-6 text-center">
        <h2 className="text-4xl font-bold text-red-700">Yearly Seat Allocation</h2>
        <div className="max-w-6xl mx-auto mt-6 p-8 bg-white rounded-lg shadow-md">
          <div className="text-red-500 mb-4">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-12 w-12 mx-auto" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Error Loading Data</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-800 transition-colors"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  if (!admissions || admissions.length === 0) {
    return (
      <section className="py-16 px-6 text-center">
        <h2 className="text-4xl font-bold text-red-700">Yearly Seat Allocation</h2>
        <div className="max-w-6xl mx-auto mt-6 p-8 bg-white rounded-lg shadow-md">
          <p className="text-gray-600">No admission data available</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-6 text-center">
      <h2 className="text-4xl font-bold text-red-700">Yearly Seat Allocation</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mt-6">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-red-700 text-white">
              <th className="py-3 px-6 border border-gray-300">Year</th>
              <th className="py-3 px-6 border border-gray-300">Branch</th>
              <th className="py-3 px-6 border border-gray-300">Seats Allocated</th>
              <th className="py-3 px-6 border border-gray-300">Seats Filled</th>
            </tr>
          </thead>
          <tbody>
            {admissions.map((admission, index) => (
              <AdmissionRow 
                key={admission.year} 
                admission={admission} 
                index={index} 
              />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Admissions;