import React, { useEffect, useState } from 'react';
import Footer from '../../pages/Footer';
import LoadingSpinner from "../hero/Spinner";

const Academics = () => {
  const [admissions, setAdmissions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const admissionUrl = import.meta.env.VITE_BACKEND + 'admissions'; // Using environment variable

  useEffect(() => {
    fetchAdmissions();
  }, []);

  const fetchAdmissions = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(admissionUrl);
      
      if (!response.ok) {
        throw new Error(`Failed to load data. Status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data || !Array.isArray(data)) {
        throw new Error('Invalid data format received');
      }
      
      setAdmissions(data);
    } catch (err) {
      console.error('Error fetching admission data:', err);
      setError(err.message || 'Failed to fetch admission data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const renderTable = () => {
    if (!admissions || admissions.length === 0) {
      return <p className="text-gray-500 text-lg">No admission data available.</p>;
    }

    return (
      <div className="overflow-x-auto max-w-6xl mx-auto shadow-md rounded-lg">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-red-700 text-white">
              <th className="py-3 px-4 sm:px-6 border border-gray-300 text-sm sm:text-base">
                Year
              </th>
              <th className="py-3 px-4 sm:px-6 border border-gray-300 text-sm sm:text-base">
                Branch
              </th>
              <th className="py-3 px-4 sm:px-6 border border-gray-300 text-sm sm:text-base">
                Seats Allocated
              </th>
              <th className="py-3 px-4 sm:px-6 border border-gray-300 text-sm sm:text-base">
                Seats Filled
              </th>
            </tr>
          </thead>
          <tbody>
            {admissions.map((yearData) => {
              if (!yearData.admissions || !Array.isArray(yearData.admissions)) {
                return null; // Skip invalid year data
              }

              return yearData.admissions.map((branch, index) => (
                <tr
                  key={`${yearData.year || 'unknown'}-${branch.depo_code || index}-${index}`}
                  className="hover:bg-gray-100 even:bg-gray-50"
                >
                  {index === 0 && (
                    <td
                      rowSpan={yearData.admissions.length}
                      className="py-3 px-4 sm:px-6 border border-gray-300 font-semibold align-middle text-sm sm:text-base"
                    >
                      {yearData.year || 'N/A'}
                    </td>
                  )}
                  <td className="py-3 px-4 sm:px-6 border border-gray-300 text-sm sm:text-base">
                    {branch.depo_code || 'Unknown Branch'}
                  </td>
                  <td className="py-3 px-4 sm:px-6 border border-gray-300 text-sm sm:text-base">
                    {branch.allocated ?? 'N/A'}
                  </td>
                  <td className="py-3 px-4 sm:px-6 border border-gray-300 text-sm sm:text-base">
                    {branch.intake ?? 'N/A'}
                  </td>
                </tr>
              ));
            })}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <>
      <section className="py-16 px-4 sm:px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-red-700 mb-6">
          Yearly Seat Allocation
        </h2>

        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 max-w-2xl mx-auto">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">
                  {error}
                  <button 
                    onClick={fetchAdmissions}
                    className="ml-2 text-sm font-medium text-red-700 hover:text-red-600 underline focus:outline-none"
                  >
                    Try again
                  </button>
                </p>
              </div>
            </div>
          </div>
        ) : (
          renderTable()
        )}
      </section>

      {/* <Footer /> */}
    </>
  );
};

export default Academics;