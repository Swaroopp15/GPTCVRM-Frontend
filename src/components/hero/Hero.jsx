import React, { useContext } from "react";
import { Context } from "../../../Context/Context";

function Hero() {
  const { college } = useContext(Context);

  return (
    <section
      className="relative w-full h-screen flex items-center justify-center bg-cover bg-center text-white mt-20"
      style={{ backgroundImage: `url(${college?.college_image})` }}
    >
      {/* Red Overlay instead of black */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* Content */}
      <div className="relative text-center p-6 md:p-10 rounded-lg max-w-4xl mx-4 z-10 space-y-6">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-wide">
          Welcome to{" "}
          <span className="block capitalize text-white">
            {college?.college_name?.toLowerCase()}
          </span>
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-white">
          Your Gateway to Excellence in Technical Education
        </p>

        <div className="flex justify-center gap-4 flex-wrap mt-6">
          <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-full transition-all duration-300">
            Learn More
          </button>
          <button className="bg-white hover:bg-gray-100 text-red-700 font-semibold py-2 px-6 rounded-full transition-all duration-300">
            Apply Now
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
