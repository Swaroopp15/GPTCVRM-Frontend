import React from "react";

const StudentListHeader = () => {
  return (
    <div className="bg-gradient-to-r from-red-700 to-red-600 p-6 sm:p-8 text-white relative overflow-hidden">
      <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-white/10" />
      <div className="absolute -left-20 -bottom-20 w-96 h-96 rounded-full bg-white/5" />
      <div className="relative z-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-2">
          Student List
        </h2>
        <p className="text-center text-red-100 max-w-2xl mx-auto text-sm sm:text-base">
          Browse student information across departments and academic years
        </p>
        <div className="w-20 h-1 bg-red-300 mx-auto mt-4 rounded-full" />
      </div>
    </div>
  );
};

export default StudentListHeader;