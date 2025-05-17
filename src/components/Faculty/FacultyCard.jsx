import React from "react";

function FacultyCard({ faculty }) {
  console.log(faculty.image);
  
  return (
    <div className="card shadow-lg rounded-lg overflow-hidden bg-white p-6">
      <img
        src={`${import.meta.env.VITE_BACKEND}${faculty.image}`}
        className="w-full h-40 object-cover"
        alt="Faculty"
      />
      <div className="p-4">
        <p className="badge bg-purple bg-opacity-10 text-purple">{faculty.faculty_role}</p>
        <p className="text-lg font-medium mt-2">{faculty.faculty_name}</p>
      </div>
    </div>
  );
}

export default FacultyCard;
