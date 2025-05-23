import React from "react";

function FacultyCard({ faculty, key }) {
  
  const image = import.meta.env.VITE_BACKEND + faculty.image;
  return (
    <tr key={key} class="bg-white hover:bg-gray-100 w-5">
      <td class="border border-gray-300 w-4/5 h-4/5"><img src={image} alt={faculty.name} className="object-cover "/></td>
      <td class="py-3 px-4 border border-gray-300">{faculty.faculty_name}</td>
      <td class="py-3 px-4 border border-gray-300">{faculty.faculty_role}</td>
      <td class="py-3 px-4 border border-gray-300">{faculty.qualification || "No Qualification Data Available"}</td>
      <td class="py-3 px-4 border border-gray-300">{faculty.experience  || "No Experience Data Available"}</td>
      <td class="py-3 px-4 border border-gray-300">{faculty.email || "No Email Data Available"}</td>
      <td class="py-3 px-4 border border-gray-300">{faculty.number || "No Number Available"}</td>
    </tr>
  );
}

export default FacultyCard;
