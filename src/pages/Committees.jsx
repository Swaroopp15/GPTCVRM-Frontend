import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../Context/Context";
import DepartmentCard from "../components/Departments/DepartmentCard";
import Spinner from "../components/hero/Spinner";
import Footer from "../pages/Footer";

function Committees() {
  const { committees } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (committees === null) {
      setError("Failed to load committees data");
    }
  }, [committees]);

  if (loading) {
    return <Spinner message="Loading committees..." />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <section className="flex-grow flex items-center justify-center py-16 px-4 bg-gray-200">
          <div className="max-w-md p-6 bg-white rounded-lg shadow-md text-center">
            <div className="text-red-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Error Loading Committees</h2>
            <p className="text-gray-600 mt-2">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-red-700 text-white rounded hover:bg-red-800 transition-colors"
            >
              Try Again
            </button>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <section className="py-16 px-4 sm:px-6 md:px-8 text-center bg-gray-200 flex-grow">
        <h2 className="text-3xl sm:text-4xl font-bold text-red-700">
          Committees
        </h2>
                        <div className="w-24 h-1 bg-red-600 mx-auto mb-6"></div>

        {committees && committees.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {committees.map((committee, index) => (
              <DepartmentCard 
                key={committee.id || index} 
                name={committee.name} 
                link={`/committee/${committee.id}`} 
              />
            ))}
          </div>
        ) : (
          <div className="mt-8 p-8 bg-white rounded-lg shadow-md max-w-2xl mx-auto">
            <p className="text-gray-600">No committees found</p>
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
}

export default Committees;