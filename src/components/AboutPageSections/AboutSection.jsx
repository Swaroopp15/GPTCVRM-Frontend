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

function AboutSection({ data }) {
  return (
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      className="max-w-6xl mx-auto py-20 px-6"
    >
      <motion.div variants={itemVariants} className="text-center mb-16">
        <span className="text-red-600 font-semibold tracking-wider text-lg">ABOUT US</span>
        <h2 className="text-4xl font-bold text-gray-800 mt-2 mb-6">
          {data.title}
        </h2>
        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            {data.description}
          </p>
          <div className="inline-flex items-center bg-green-100 px-6 py-3 rounded-full shadow-sm">
            <span className="text-green-800 font-medium">
              {data.raggingFree}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}

export default AboutSection