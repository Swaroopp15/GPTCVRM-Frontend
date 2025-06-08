import React, { useContext, useState, useEffect } from "react";
import { motion } from "framer-motion";
import DepartmentCard from "../components/Departments/DepartmentCard";
import { Context } from "../../Context/Context";
import Spinner from "../components/hero/Spinner";
import Footer from "../pages/Footer";

function Departments() {
  const { departmentNames } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate loading (replace with actual data loading logic)
    const timer = setTimeout(() => {
      if (departmentNames) {
        setLoading(false);
      } else {
        setError("Failed to load departments data");
        setLoading(false);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [departmentNames]);

  if (loading) {
    return <Spinner message="Loading departments..." />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
        <main className="flex-grow flex items-center justify-center p-6">
          <div className="max-w-md p-6 bg-white rounded-lg shadow-md text-center">
            <div className="text-red-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Error Loading Departments</h2>
            <p className="text-gray-600 mt-2">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white flex-grow"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-red-600 font-semibold tracking-wider uppercase text-sm">
              Academic Programs
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mt-4">
              Our <span className="text-red-600">Departments</span>
            </h2>
            <div className="w-24 h-1 bg-red-600 mx-auto my-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our comprehensive range of technical departments offering cutting-edge education and research opportunities.
            </p>
          </div>

          {departmentNames && departmentNames.length > 0 ? (
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                    when: "beforeChildren"
                  }
                }
              }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {departmentNames.map((department, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { y: 30, opacity: 0 },
                    visible: {
                      y: 0,
                      opacity: 1,
                      transition: {
                        type: "spring",
                        stiffness: 100,
                        damping: 10
                      }
                    }
                  }}
                  whileHover={{ 
                    y: -10,
                    transition: { type: "spring", stiffness: 300, damping: 10 }
                  }}
                >
                  <DepartmentCard 
                    name={department.department_name} 
                    link={`/department/${department.depo_code}`}
                    description={department.description}
                    facultyCount={department.facultyCount}
                    labCount={department.labCount}
                    icon={department.icon}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl shadow-md">
              <p className="text-gray-600">No departments available</p>
            </div>
          )}
        </div>
      </motion.section>
      <Footer />
    </div>
  );
}

export default Departments;