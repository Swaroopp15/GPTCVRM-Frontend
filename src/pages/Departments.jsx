import React, { useContext } from "react";
import { motion } from "framer-motion";
import DepartmentCard from "../components/Departments/DepartmentCard";
import { Context } from "../../Context/Context";

function Departments() {
  const { departmentNames } = useContext(Context);
  
  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white"
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
          {departmentNames && departmentNames.map((department, index) => (
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
      </div>
    </motion.section>
  );
}

export default Departments;