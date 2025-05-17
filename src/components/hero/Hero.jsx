import React, { useContext } from "react";
import { motion } from "framer-motion";
import { Context } from "../../../Context/Context";

function Hero() {
  const { college } = useContext(Context);

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Fixed background elements */}
      <div className="fixed inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: college?.college_image ? `url(${college.college_image})` : 'linear-gradient(to right, #4a044e, #1a1a2e)',
            backgroundAttachment: 'fixed',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
      </div>

      {/* Scrollable content */}
      <div className="absolute inset-0 overflow-y-auto">
        <div className="min-h-screen flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 text-center px-6 py-24"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
              Welcome to{" "}
              <span className="block capitalize">
                {college?.college_name?.toLowerCase()}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 font-light">
              Your Gateway to Excellence in Technical Education
            </p>
            <div className="mt-8 flex justify-center gap-4 flex-wrap">
              <button className="px-8 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                Learn More
              </button>
              <button className="px-8 py-3 bg-white text-red-600 rounded-lg font-medium hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
                Apply Now
              </button>
            </div>
          </motion.div>
        </div>

        {/* Additional scrollable content can go here */}
        {/* <div className="h-screen flex items-center justify-center">
          <p className="text-white text-2xl">More content here that will scroll</p>
        </div> */}
      </div>
    </section>
  );
}

export default Hero;