import React from 'react';

function Logo({ name }) {
  return (
    <div className="w-full flex justify-start items-center">
      <div className="flex items-center gap-2 sm:gap-3">
        <img
          src="https://github.com/Swaroop0915/gitImages/blob/main/images/CollegeLogo.jpeg?raw=true"
          alt="College Logo"
          className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 rounded-full border-2 border-red-700 shadow-md object-cover"
        />
        <h1 className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-extrabold text-red-700 leading-tight">
          {name}
        </h1>
      </div>
    </div>
  );
}

export default Logo;
