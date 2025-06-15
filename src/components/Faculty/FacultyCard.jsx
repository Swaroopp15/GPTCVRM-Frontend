import React from "react";
import { motion } from "framer-motion";

const FacultyCard = ({ faculty, index }) => {
  const image = import.meta.env.VITE_BACKEND + faculty.image;

  const getRoleColor = (role) => {
    const lowerRole = role.toLowerCase();

    if (lowerRole.includes('hod') || lowerRole.includes('head of department')) {
      return {
        bg: 'bg-gradient-to-r from-red-400 to-red-500',
        text: 'text-white',
        border: 'border-red-500'
      };
    }

    if (lowerRole.includes('professor')) return {
      bg: 'bg-red-100',
      text: 'text-red-800',
      border: 'border-red-200'
    };
    if (lowerRole.includes('assistant')) return {
      bg: 'bg-blue-100',
      text: 'text-blue-800',
      border: 'border-blue-200'
    };
    if (lowerRole.includes('associate')) return {
      bg: 'bg-purple-100',
      text: 'text-purple-800',
      border: 'border-purple-200'
    };
    return {
      bg: 'bg-gray-100',
      text: 'text-gray-800',
      border: 'border-gray-200'
    };
  };

  const roleStyles = getRoleColor(faculty.faculty_role);
  const isHOD = faculty.faculty_role.toLowerCase().includes('hod') ||
    faculty.faculty_role.toLowerCase().includes('head of department');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -5 }}
      className={`bg-white rounded-lg shadow-md overflow-hidden border ${isHOD ? 'border-red-400 border-2' : 'border-gray-100'} relative`}
    >
      {/* {isHOD && (
        <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-bl-lg">
          HOD
        </div>
      )} */}

      <div className="p-6">
        <div className="flex justify-center mb-4">
          <div className={`h-32 w-32 rounded-full overflow-hidden border-4 ${isHOD ? 'border-red-400' : 'border-white'} shadow-md`}>
            <img
              src={image}
              alt={faculty.faculty_name}
              className="h-full w-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/300?text=Faculty";
              }}
            />
          </div>
        </div>
        <div className="text-center">
          <h3 className={`text-xl font-bold mb-1 ${isHOD ? 'text-red-800' : 'text-gray-800'}`}>
            {faculty.faculty_name}
          </h3>

          <div className="mb-3">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${roleStyles.bg} ${roleStyles.text} border ${roleStyles.border}`}>
              {faculty.faculty_role}
            </span>
          </div>

          <div className="text-sm text-gray-600 mb-4">
            <p className="font-medium">{faculty.qualification || "Not specified"}</p>
            <p>Experience: {faculty.experience || "N/A"} years</p>
          </div>
          <div className="flex justify-center space-x-3">
            {faculty.email && (
              <a
                href={`mailto:${faculty.email}`}
                className={`flex items-center rounded-lg px-3 py-2 transition-colors text-sm ${isHOD ? 'bg-red-50 text-red-700 hover:bg-red-100' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email
              </a>
            )}
            {faculty.number && (
              <a
                href={`tel:${faculty.number}`}
                className={`flex items-center rounded-lg px-3 py-2 transition-colors text-sm ${isHOD ? 'bg-red-50 text-red-700 hover:bg-red-100' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FacultyCard;