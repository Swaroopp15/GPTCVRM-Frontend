import React, { useContext } from 'react';
import { Context } from '../../../Context/Context';

function Logo({ name }) {
  const {collegeImages} = useContext(Context);
  const logo = collegeImages.find((image) => image.image_name === "college_logo");
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      {logo && <img
        src={import.meta.env.VITE_BACKEND + logo.image_path}
        alt="College Logo"
        className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 rounded-full border-2 border-red-700 shadow-md object-cover flex-shrink-0"
      />}
      <h1 className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-red-700 tracking-tight whitespace-nowrap overflow-hidden text-ellipsis text-transform: uppercase">
        {name}
      </h1>
    </div>
  );
}

export default Logo;