import React from "react";
import { Link } from "react-router";

const DepartmentCard = ({
  name,
  link,
  description,
  facultyCount,
  labCount,
  icon,
  className = "",
}) => {
  return (
    <div
      className={`flex flex-col justify-between h-full bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 ${className}`}
    >
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center mb-4">
          <div className="text-3xl mr-4">{icon}</div>
          <h3 className="text-xl font-bold text-gray-800">{name}</h3>
        </div>
        <p className="text-gray-600 mb-6 flex-grow">{description}</p>
        {/* <div className="flex justify-between text-sm text-gray-500">
          <span>{facultyCount} Faculty</span>
          <span>{labCount} Labs</span>
        </div> */}
      </div>
      <Link
        to={link}
        className="block bg-red-600 text-white text-center py-3 font-medium hover:bg-red-700 transition"
      >
        View More
      </Link>
    </div>
  );
};

export default DepartmentCard;