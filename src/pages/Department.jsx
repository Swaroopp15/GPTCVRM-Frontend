import React, { createContext, useEffect, useState, useContext } from "react";
import { Link, Outlet, useParams, NavLink, useLocation, useNavigate } from "react-router";
import DepartmentCard from "../components/Departments/DepartmentCard";
import DepartmentDetails from "../components/Departments/DepartmentDetails";
import { Context } from "../../Context/Context";
import { motion } from "framer-motion";
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
      duration: 0.6
    },
  },
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
      duration: 0.5
    }
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

  useEffect(() => {
    const fetchDepartmentData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (depo_code) {
          const response = await fetch(
            `http://localhost:3000/departments/${depo_code}`
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

  const isSubPageActive = ["faculty", "labs", "placements"].some(sub =>
    location.pathname.includes(`/department/${depo_code}/${sub}`)
  );

  if (loading) {
    return <Spinner message="Loading department information..." />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
        <main className="flex-grow flex items-center justify-center p-6">
          <div className="max-w-md p-6 bg-white rounded-lg shadow-md text-center">
            <div className="text-red-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Error Loading Department</h2>
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
    <DepartmentContext.Provider value={depo_code}>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100"
      >
        {depo_code ? (
          <section className="py-16 px-4 sm:px-6 lg:px-8 flex-grow">
            <div className="max-w-7xl mx-auto">
              <motion.div variants={itemVariants}>
                <DepartmentDetails department={department} />
              </motion.div>

              <motion.div variants={itemVariants} className="mt-12">
                <div className="flex flex-wrap justify-center gap-4 mb-10">
                  <NavLink
                    to="faculty"
                    className={({ isActive }) =>
                      `px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-sm ${
                        isActive
                          ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg"
                          : "bg-white text-red-600 border-2 border-red-600 hover:bg-red-50 shadow-md"
                      }`
                    }
                  >
                    Faculty Members
                  </NavLink>
                  <NavLink
                    to="labs"
                    className={({ isActive }) =>
                      `px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-sm ${
                        isActive
                          ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg"
                          : "bg-white text-red-600 border-2 border-red-600 hover:bg-red-50 shadow-md"
                      }`
                    }
                  >
                    Laboratory Facilities
                  </NavLink>
                  <NavLink
                    to={`placements?depo_code=${depo_code}&year=2025`}
                    className={({ isActive }) =>
                      `px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-sm ${
                        isActive
                          ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg"
                          : "bg-white text-red-600 border-2 border-red-600 hover:bg-red-50 shadow-md"
                      }`
                    }
                  >
                    Placement Records
                  </NavLink>
                </div>

                {isSubPageActive && (
                  <motion.div
                    variants={itemVariants}
                    className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200"
                  >
                    <Outlet />
                  </motion.div>
                )}
              </motion.div>
            </div>
          </section>
        ) : (
          <section className="py-20 px-4 sm:px-6 lg:px-8 flex-grow">
            <div className="max-w-7xl mx-auto">
              <motion.div variants={itemVariants} className="text-center mb-16">
                <span className="text-red-600 font-semibold tracking-wider uppercase text-sm">
                  Academic Excellence
                </span>
                <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mt-4 mb-6">
                  Our <span className="text-red-600">Departments</span>
                </h2>
                <div className="w-24 h-1 bg-red-600 mx-auto mb-6"></div>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Explore our comprehensive range of technical departments offering cutting-edge education and research opportunities.
                </p>
              </motion.div>

              {departmentNames && departmentNames.length > 0 ? (
                <motion.div
                  variants={containerVariants}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {departmentNames.map((dept, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      whileHover={{
                        y: -5,
                        transition: { type: "spring", stiffness: 300, damping: 10 }
                      }}
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
                <div className="text-center py-12 bg-white rounded-xl shadow-md">
                  <p className="text-gray-600">No departments found</p>
                </div>
              )}

              <motion.div
                variants={itemVariants}
                className="mt-20 text-center bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
              >
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                  Need help choosing a department?
                </h3>
                <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                  Our academic advisors are here to guide you in selecting the perfect department that aligns with your career goals and interests.
                </p>
                <Link
                  to="/contact"
                  className="inline-block px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-medium hover:from-red-700 hover:to-red-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Contact Our Advisors
                </Link>
              </motion.div>
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