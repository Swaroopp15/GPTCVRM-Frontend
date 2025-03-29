import React, { useContext } from "react";
import { Context } from "../../../Context/Context";

function Hero() {
  const {college} = useContext(Context);
  return (
    <section className="relative w-full h-[600px] flex items-center justify-center  bg-cover bg-center text-white min-h-screen bg-gray-100" 
    style={{ backgroundImage: `url(${college.college_image})` }} >
      <div className="text-center bg-black bg-opacity-60 p-10 rounded-lg max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight"> Welcome to <span className="capitalize text-5xl md:text-6xl">{college.college_name.toLowerCase()}</span></h1>
        <p className="mt-4 text-lg md:text-xl">Contact Us.</p>
      </div>
    </section>
  );
}

export default Hero;
