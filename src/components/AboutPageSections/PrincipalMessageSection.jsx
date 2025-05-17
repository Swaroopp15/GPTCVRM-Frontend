import React from 'react';
import { motion } from 'framer-motion';

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8 }
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

function PrincipalMessageSection({ data }) {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="md:flex">
            <motion.div 
              variants={fadeIn}
              className="md:w-1/3 bg-gray-100 flex items-center justify-center p-8"
            >
              <img 
                src={data.image} 
                alt={data.name}
                className="w-full h-auto max-w-xs rounded-lg shadow-md object-cover"
              />
            </motion.div>
            <div className="md:w-2/3 p-8 md:p-12">
              <motion.div variants={itemVariants}>
                <span className="text-red-600 font-semibold tracking-wider">PRINCIPAL'S MESSAGE</span>
                <h2 className="text-3xl font-bold text-gray-800 mt-2 mb-4">
                  Words from Our Principal
                </h2>
                <div className="flex items-center mb-6">
                  <div className="w-12 h-1 bg-red-600 mr-4"></div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{data.name}</h3>
                    <p className="text-gray-500">{data.title}</p>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {data.message}
                </p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-2 border-2 border-red-600 text-red-600 rounded-lg font-medium hover:bg-red-50 transition-all duration-300"
                >
                  Read Full Message
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default PrincipalMessageSection