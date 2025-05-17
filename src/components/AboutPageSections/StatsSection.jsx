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

function StatsSection({ data }) {
  return (
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      className="py-16 bg-gradient-to-r from-red-600 to-red-800 text-white"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {data.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="text-center p-4"
            >
              <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
              <h3 className="text-xl font-semibold mb-1">{stat.label}</h3>
              <p className="text-red-100 text-sm">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

export default StatsSection