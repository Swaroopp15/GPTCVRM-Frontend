import React from "react";
import { Link } from "react-router";

function DepartmentCard({key, name, link }) {
  return (
    <div key={key} className="bg-white p-6 sm:p-8 shadow-lg rounded-lg transition-transform transform hover:scale-105">
      <h3 className="text-xl sm:text-2xl font-semibold text-red-700">{name}</h3>
      <Link className="text-blue-600 underline block mt-2" to={link}>
        Explore
      </Link>
    </div>
  );
}

export default DepartmentCard;
