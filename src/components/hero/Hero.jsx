import React, { useContext } from "react";
import { motion } from "framer-motion";
import { Context } from "../../../Context/Context";

function Hero() {
  const { college } = useContext(Context);

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      <div className="fixed inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: college?.college_image
              ? `url(${import.meta.env.VITE_BACKEND +  college.college_image})`
              : "linear-gradient(to right, #4a044e, #1a1a2e)",
            backgroundAttachment: "fixed",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
      </div>

      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 sm:px-6 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-3xl"
        >
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
            Welcome to{" "}
            <span className="block capitalize">
              {college?.college_name?.toLowerCase()}
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-2xl text-gray-200 font-light">
            Your Gateway to Excellence in Technical Education
          </p>

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-transform duration-300 transform hover:scale-105 shadow">
              Learn More
            </button>
            <button className="px-6 py-3 bg-white text-red-600 rounded-lg font-medium hover:bg-gray-100 transition-transform duration-300 transform hover:scale-105 shadow">
              Apply Now
            </button>
          </div>

          <div className="mt-10 grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-4 text-white text-sm sm:text-base font-medium">
            <a href="#about" className="hover:text-red-400 transition">About</a>
            <a href="#departments" className="hover:text-red-400 transition">Academics</a>
            <a href="#labs" className="hover:text-red-400 transition">Facilities</a>
            <a href="#placements" className="hover:text-red-400 transition">Careers</a>
            <a href="#events" className="hover:text-red-400 transition">News & Events</a>
            <a href="#notifications" className="hover:text-red-400 transition">Announcements</a>
          </div>
        </motion.div>

        <motion.a
          href="#about"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-8 sm:mt-12 text-white flex flex-col items-center cursor-pointer hover:opacity-80"
        >
          <span className="text-xs sm:text-sm">Scroll Down</span>
          <svg
            className="mt-1 animate-bounce"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </motion.a>
      </div>
    </section>
  );
}

export default Hero;