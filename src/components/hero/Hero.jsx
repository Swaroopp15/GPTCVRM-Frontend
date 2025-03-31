import React, { useContext } from "react";
import { Context } from "../../../Context/Context";

function Hero() {
  const { college } = useContext(Context);
  
  return (
    <section 
      className="relative w-full h-screen flex items-center justify-center bg-cover bg-center text-white bg-gray-100 mt-20" 
      style={{ backgroundImage: `url(${college?.college_image})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      
      <div className="text-center bg-black bg-opacity-60 p-6 md:p-10 rounded-lg max-w-3xl mx-4 z-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
          Welcome to <span className="capitalize block sm:inline text-4xl sm:text-5xl md:text-6xl ">{college?.college_name?.toLowerCase()}</span>
        </h1>
        <p className="mt-4 text-base sm:text-lg md:text-xl">Contact Us.</p>
        <button className="mt-6 bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-6 rounded-full transition-colors">
          Learn More
        </button>
      </div>
    </section>
  );
}

export default Hero;