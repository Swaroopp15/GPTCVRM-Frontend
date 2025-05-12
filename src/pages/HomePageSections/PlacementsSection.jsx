// components/home/PlacementsSection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';

const PlacementsSection = ({ containerVariants, itemVariants }) => (
  <section id="placements" className="py-16 sm:py-20 bg-white">
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
            CAREERS
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mt-2">
            Placements & Recruiters
          </h2>
        </motion.div>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8"
      >
        {/* Top Recruiters */}
        <motion.div
          variants={itemVariants}
          className="bg-gray-50 p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100"
        >
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">Top Recruiters</h3>
          <div className="flex flex-wrap gap-3">
            {['TCS', 'Infosys', 'Wipro', 'Tech Mahindra', 'L&T', 'HCL'].map((company, index) => (
              <span
                key={index}
                className="bg-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm sm:text-base text-gray-800 shadow-sm border border-gray-200"
              >
                {company}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Placement Stats */}
        <motion.div
          variants={itemVariants}
          className="bg-gray-50 p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100"
        >
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">Placement Statistics</h3>
          <div className="space-y-4">
            {[
              { year: '2024 Batch', percentage: 82 },
              { year: '2023 Batch', percentage: 78 },
              { year: '2022 Batch', percentage: 85 }
            ].map((stat, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1 sm:mb-2">
                  <span className="text-sm sm:text-base text-gray-700">{stat.year}</span>
                  <span className="font-medium text-sm sm:text-base text-gray-800">
                    {stat.percentage}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 sm:h-2.5">
                  <div
                    className="bg-red-600 h-2 sm:h-2.5 rounded-full"
                    style={{ width: `${stat.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mt-10 sm:mt-12"
      >
        <Link
          to="/placements"
          className="inline-block px-6 sm:px-8 py-2.5 sm:py-3 bg-red-600 text-white text-sm sm:text-base rounded-lg font-medium hover:bg-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          View Placement Details
        </Link>
      </motion.div>
    </div>
  </section>
);

export default PlacementsSection;
