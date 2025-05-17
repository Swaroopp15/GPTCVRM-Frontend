// components/home/LabsSection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';

const LabsSection = ({ labs, containerVariants, itemVariants }) => (
  <section id="labs" className="py-16 sm:py-20 bg-gradient-to-b from-gray-50 to-gray-100">
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
            FACILITIES
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mt-2">
            Our Laboratory Facilities
          </h2>
          <p className="text-sm sm:text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
            We provide modern, well-equipped laboratories to give students hands-on experience.
          </p>
        </motion.div>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8"
      >
        {labs.map((lab, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ y: -10 }}
            className="bg-white p-6 sm:p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
          >
            <div className="text-5xl sm:text-6xl text-center mb-4 sm:mb-6 text-red-600">
              {lab.image}
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3">
              {lab.name}
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4">{lab.description}</p>
            <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
              <h4 className="font-semibold text-sm sm:text-base text-gray-800 mb-2">Equipment:</h4>
              <p className="text-sm sm:text-base text-gray-600">{lab.equipment}</p>
            </div>
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
          to="/labs"
          className="inline-block px-6 sm:px-8 py-2.5 sm:py-3 border-2 border-red-600 text-red-600 text-sm sm:text-base rounded-lg font-medium hover:bg-red-600 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-sm"
        >
          Explore All Labs
        </Link>
      </motion.div>
    </div>
  </section>
);

export default LabsSection;
