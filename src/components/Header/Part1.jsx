import React from 'react';
import ApLogo from '../../../public/Logo/ap-govt-logo.png';
import SbtetLogo from '../../../public/Logo/sbtet-ap-logo.png';
import Director from '../../../public/photos/image.png';

const Part1 = () => {
  return (
    <div id="part1" className="bg-white border-b border-gray-200 py-2 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center justify-center space-x-4 w-full md:w-auto">
            <div className="w-16 h-16 rounded-full border-2 border-red-600 overflow-hidden flex-shrink-0">
              <img
                src={ApLogo}
                alt="AP Government Logo"
                className="w-full h-full object-contain p-1"
              />
            </div>

            <div className="text-center flex-1">
              <h1 className="text-base sm:text-lg md:text-xl font-bold text-red-700 uppercase tracking-tight">
                State Board of Technical Education and Training AP
              </h1>
            </div>

            <div className="w-16 h-16 rounded-full border-2 border-red-600 overflow-hidden flex-shrink-0">
              <img
                src={SbtetLogo}
                alt="SBTET Logo"
                className="w-full h-full object-contain p-1"
              />
            </div>
          </div>

          <div className="hidden md:flex items-center">
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-semibold text-black">Sri. G. Ganesh Kumar, I.A.S.,</p>
                <p className="text-xs text-gray-600">Director of Technical Education</p>
              </div>
              <div className="w-24 h-24 border-2 border-red-600 overflow-hidden">
                <img
                  src={Director}
                  alt="Director"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Part1;