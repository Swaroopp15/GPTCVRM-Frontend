// components/home/DepartmentsSection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';

const DepartmentsSection = ({ departments, containerVariants, itemVariants }) => (
  <section id="departments" className="py-16 sm:py-20 bg-white">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="text-center mb-8 sm:mb-12"
      >
        <motion.div variants={itemVariants}>
          <span className="text-red-600 text-sm sm:text-base font-semibold tracking-wider">
            ACADEMICS
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mt-2">
            Our Departments
          </h2>
        </motion.div>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8"
      >
        {departments.slice(0, 3).map((dept) => (
          <motion.div
            key={dept.depo_code}
            variants={itemVariants}
            whileHover={{ y: -10 }}
            className="bg-gray-50 p-6 sm:p-8 rounded-xl shadow-sm hover:shadow-md border border-gray-100"
          >
            <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">{dept.icon || '🏛️'}</div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3">
              {dept.department_name}
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4">
              {dept.description || 'Department offering quality technical education.'}
            </p>
            <Link
              to={`/departments/${dept.depo_code}`}
              className="inline-flex items-center text-red-600 hover:text-red-800 font-medium transition text-sm sm:text-base"
            >
              Learn More <span className="ml-1">→</span>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mt-10 sm:mt-12"
      >
        <Link
          to="/departments"
          className="inline-block px-6 sm:px-8 py-2.5 sm:py-3 bg-red-600 text-white text-sm sm:text-base rounded-lg font-medium hover:bg-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          View All Departments
        </Link>
      </motion.div>
    </div>
  </section>
);

export default DepartmentsSection;
