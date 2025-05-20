import React, { useEffect, useState } from 'react';
import Footer from '../../pages/Footer'; // Make sure this path is correct

const Academics = () => {
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const admissionUrl = 'http://localhost:3000/admissions';

  useEffect(() => {
    fetchAdmissions();
  }, []);

  const fetchAdmissions = async () => {
    try {
      const response = await fetch(admissionUrl);
      const data = await response.json();
      setAdmissions(data);
    } catch (err) {
      console.error('Error fetching college data:', err);
      setError('Failed to fetch data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="py-16 px-4 sm:px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-red-700 mb-6">
          Yearly Seat Allocation
        </h2>

        {loading ? (
          <p className="text-gray-600 text-lg">Loading data...</p>
        ) : error ? (
          <p className="text-red-600 text-lg">{error}</p>
        ) : admissions.length === 0 ? (
          <p className="text-gray-500 text-lg">No admission data available.</p>
        ) : (
          <div className="overflow-x-auto max-w-6xl mx-auto">
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
                {admissions.map((yearData) =>
                  yearData.admissions.map((branch, index) => (
                    <tr
                      key={`${yearData.year}-${branch.depo_code}-${index}`}
                      className="hover:bg-gray-100"
                    >
                      {index === 0 && (
                        <td
                          rowSpan={yearData.admissions.length}
                          className="py-3 px-4 sm:px-6 border border-gray-300 font-semibold align-middle text-sm sm:text-base"
                        >
                          {yearData.year}
                        </td>
                      )}
                      <td className="py-3 px-4 sm:px-6 border border-gray-300 text-sm sm:text-base">
                        {branch.depo_code}
                      </td>
                      <td className="py-3 px-4 sm:px-6 border border-gray-300 text-sm sm:text-base">
                        {branch.allocated}
                      </td>
                      <td className="py-3 px-4 sm:px-6 border border-gray-300 text-sm sm:text-base">
                        {branch.intake}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <Footer />
    </>
  );
};

export default Academics;
