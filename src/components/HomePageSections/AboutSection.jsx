// components/home/AboutSection.jsx
import React from 'react';
import { motion } from 'framer-motion';

const AboutSection = ({ containerVariants, itemVariants }) => (
  <motion.section
    id="about"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={containerVariants}
    className="py-16 sm:py-20 bg-gradient-to-b from-gray-50 to-gray-100"
  >
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div variants={itemVariants} className="text-center mb-8 sm:mb-12">
        <span className="text-red-600 text-sm sm:text-base font-semibold tracking-wider">
          ABOUT US
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mt-2">
          About Our College
        </h2>
      </motion.div>

      <motion.div variants={itemVariants} className="max-w-3xl mx-auto text-center">
        <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-6 sm:mb-8">
          Established in 1985, Government Polytechnic College, Chodavaram provides high-quality
          technical education to produce skilled engineers and technicians ready for industry.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mt-8"
      >
        {[
          { value: '35+', label: 'Years of Excellence' },
          { value: '1500+', label: 'Students Enrolled' },
          { value: '85%', label: 'Placement Rate' }
        ].map((stat, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 sm:p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 text-center"
          >
            <div className="text-3xl sm:text-4xl font-bold text-red-600 mb-2">{stat.value}</div>
            <div className="text-sm sm:text-base text-gray-700 font-medium">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </motion.section>
);

export default AboutSection;
