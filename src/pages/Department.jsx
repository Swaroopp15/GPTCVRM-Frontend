import React, { createContext, useEffect, useState, useContext, useRef } from "react";
import { Link, Outlet, useParams, NavLink, useLocation, useNavigate } from "react-router";
import DepartmentCard from "../components/Departments/DepartmentCard";
import DepartmentDetails from "../components/Departments/DepartmentDetails";
import { Context } from "../../Context/Context";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "../pages/Footer";
import Spinner from "../components/hero/Spinner";
import GoTo from "../components/hero/GoToTop";

export const DepartmentContext = createContext(null);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      when: "beforeChildren",
      duration: 0.6,
    },
  },
  exit: { opacity: 0 }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
      duration: 0.5,
    },
  },
};

function Department() {
  const { depo_code } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [department, setDepartment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { departmentNames } = useContext(Context);

  const isSubPageActive = ["faculty", "labs", "placements"].some((sub) =>
    location.pathname.includes(`/department/${depo_code}/${sub}`)
  );

  const contentRef = useRef(null);

  useEffect(() => {
    if (isSubPageActive && contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [location.pathname]);

  useEffect(() => {
    const fetchDepartmentData = async () => {
      try {
        setLoading(true);
        setError(null);

        if (depo_code) {
          const response = await fetch(
            `${import.meta.env.VITE_BACKEND}departments/${depo_code}`
          );

          if (!response.ok) {
            if (response.status === 404) {
              navigate("/not-found", { replace: true });
              return;
            }
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          setDepartment(data);
        }
      } catch (error) {
        console.error("Error fetching department details:", error);
        setError(error.message || "Failed to load department details");
      } finally {
        setLoading(false);
      }
    };

    fetchDepartmentData();
  }, [depo_code, navigate]);

  if (loading) {
    return <Spinner message="Loading department information..." />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <main className="flex-grow flex items-center justify-center p-6">
          <div className="max-w-md p-8 bg-white rounded-xl shadow-lg text-center">
            <div className="text-red-500 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Department</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
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
    <DepartmentContext.Provider value={depo_code}>
      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={containerVariants}
        className="min-h-screen flex flex-col bg-gray-50"
      >
        {depo_code ? (
          <section className="py-12 px-4 sm:px-6 lg:px-8 flex-grow">
            <div className="max-w-7xl mx-auto">
              <motion.div variants={itemVariants}>
                <DepartmentDetails department={department} />
              </motion.div>

              <motion.div variants={itemVariants} className="mt-12">
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                  <NavLink
                    to="faculty"
                    className={({ isActive }) =>
                      `px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-sm ${isActive
                        ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg"
                        : "bg-white text-red-600 border-2 border-red-600 hover:bg-red-50 shadow-md"
                      }`
                    }
                  >
                    <div className="flex items-center justify-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-1a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v1h-3zM4.75 12.094A5.973 5.973 0 004 15v1H1v-1a3 3 0 013.75-2.906z" />
                      </svg>
                      Faculty
                    </div>
                  </NavLink>
                  <NavLink
                    to="labs"
                    className={({ isActive }) =>
                      `px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-sm ${isActive
                        ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg"
                        : "bg-white text-red-600 border-2 border-red-600 hover:bg-red-50 shadow-md"
                      }`
                    }
                  >
                    <div className="flex items-center justify-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M11.17 3a1.5 1.5 0 00-1.5 1.5v1.17l-1.5-1.5V4.5A3 3 0 0111.17 1H14a3 3 0 013 3v10a3 3 0 01-3 3h-2.83a3 3 0 01-3-3v-1.17l-1.5 1.5v1.17a1.5 1.5 0 001.5 1.5H14a1.5 1.5 0 001.5-1.5V4.5A1.5 1.5 0 0014 3h-2.83zM6 5.33l5.5 5.5v-1.5a1.5 1.5 0 011.5-1.5h1.5L6 5.33z" clipRule="evenodd" />
                        <path fillRule="evenodd" d="M4.5 6.5A1.5 1.5 0 016 5h4.17a1.5 1.5 0 011.5 1.5v4.17a1.5 1.5 0 01-1.5 1.5H6a1.5 1.5 0 01-1.5-1.5V6.5z" clipRule="evenodd" />
                      </svg>
                      Labs
                    </div>
                  </NavLink>
                  <NavLink
                    to={`placements?depo_code=${depo_code}&year=2025`}
                    className={({ isActive }) =>
                      `px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-sm ${isActive
                        ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg"
                        : "bg-white text-red-600 border-2 border-red-600 hover:bg-red-50 shadow-md"
                      }`
                    }
                  >
                    <div className="flex items-center justify-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                        <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                      </svg>
                      Placements
                    </div>
                  </NavLink>
                </div>

                <AnimatePresence mode="wait">
                  {isSubPageActive && (
                    <motion.div
                      key={location.pathname}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="rounded-lg"
                      ref={contentRef}
                    >
                      <Outlet />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </section>
        ) : (
          <section className="py-16 px-4 sm:px-6 lg:px-8 flex-grow">
            <div className="max-w-7xl mx-auto">
              <motion.div variants={itemVariants} className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  Departments
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Explore our comprehensive range of technical departments.
                </p>
              </motion.div>

              {departmentNames && departmentNames.length > 0 ? (
                <motion.div
                  variants={containerVariants}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {departmentNames.map((dept, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      whileHover={{ y: -5 }}
                    >
                      <DepartmentCard
                        name={dept.department_name}
                        link={`/department/${dept.depo_code}`}
                        description={dept.description}
                        facultyCount={dept.facultyCount}
                        labCount={dept.labCount}
                        icon={dept.icon}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                  <p className="text-gray-600">No departments found</p>
                </div>
              )}
            </div>
          </section>
        )}
        <GoTo />
        <Footer />
      </motion.div>
    </DepartmentContext.Provider>
  );
}

export default Department;