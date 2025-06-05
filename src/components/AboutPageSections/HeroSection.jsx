import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

function HeroSection({ data }) {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      <div className="fixed inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: data.collegeImage
              ? `url(${import.meta.env.VITE_BACKEND + data.collegeImage})`
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
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 sm:px-6"
      >
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
          {data.title}
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-200 font-light mb-8">
          {data.subtitle}
        </p>
        <div className="mt-4 sm:mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <motion.a
            href="#about-section"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-all duration-300 shadow-lg text-center"
          >
            Learn More
          </motion.a>
          <motion.a
            href="#admission-process"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-white text-red-600 rounded-lg font-medium hover:bg-gray-100 transition-all duration-300 shadow-lg text-center"
          >
            Apply Now
          </motion.a>
        </div>
      </motion.div>

      <div className="absolute bottom-6 w-full flex justify-center z-10 animate-bounce px-4">
        <a href="#about">
          <ChevronDown size={36} className="text-white opacity-75 hover:opacity-100 transition" />
        </a>
      </div>

    </section>
  );
}

export default HeroSection;
