import React from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      when: "beforeChildren"
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

function JourneySection({ data }) {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants}>
            <span className="text-red-600 font-semibold tracking-wider text-lg">OUR JOURNEY</span>
            <h2 className="text-4xl font-bold text-gray-800 mt-2">
              Milestones & Achievements
            </h2>
          </motion.div>
        </motion.div>

        <div className="relative">
          <div className="absolute left-1/2 h-full w-1 bg-gradient-to-b from-red-200 to-red-400 transform -translate-x-1/2 hidden md:block"></div>
          
          {data.map((milestone, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={itemVariants}
              className={`mb-12 md:flex items-center w-full ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
            >
              <div className={`md:w-5/12 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                <div className={`p-6 bg-white rounded-xl shadow-md relative hover:shadow-lg transition-shadow duration-300 ${
                  index % 2 === 0 ? 'md:ml-0' : 'md:mr-0'
                }`}>
                  <div className="hidden md:block absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-red-600 rounded-full z-10" 
                    style={{
                      left: index % 2 === 0 ? 'calc(100% + 32px)' : '-36px',
                      right: index % 2 !== 0 ? 'calc(100% + 32px)' : 'auto'
                    }}></div>
                  <div className="text-red-600 font-bold text-lg mb-1">
                    {milestone.year}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {milestone.event}
                  </h3>
                  <p className="text-gray-600">
                    {milestone.description}
                  </p>
                </div>
              </div>
              <div className="hidden md:block md:w-2/12"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default JourneySection