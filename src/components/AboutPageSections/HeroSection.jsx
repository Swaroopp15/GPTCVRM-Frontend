import React from 'react';
import { motion } from 'framer-motion';

function HeroSection({ data }) {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: data?.collegeImage 
              ? `url(${data.collegeImage})` 
              : 'linear-gradient(to right, #4a044e, #1a1a2e)',
            backgroundAttachment: 'fixed',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center px-6"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight capitalize">
          {data?.title || 'Welcome'}
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-200 font-light">
          {data?.subtitle || 'Your Gateway to Excellence in Technical Education'}
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-all duration-300 shadow-lg"
          >
            Learn More
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-white text-red-600 rounded-lg font-medium hover:bg-gray-100 transition-all duration-300 shadow-lg"
          >
            Apply Now
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}

export default HeroSection;