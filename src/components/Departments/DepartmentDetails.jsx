import React from 'react';
import { motion } from 'framer-motion';

function DepartmentDetails({department}) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-2xl shadow-lg p-8 sm:p-10 border border-gray-100"
    >
      <div className="flex items-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
          {department?.department_name}
        </h2>
        <div className="ml-auto text-4xl text-red-600">
          {department?.icon}
        </div>
      </div>
      
      <div className="space-y-8">
        <div>
          <h3 className="text-xl sm:text-2xl font-semibold text-red-700 mb-4 pb-2 border-b border-gray-200">
            Vision
          </h3>
          <p className="text-gray-700 text-lg leading-relaxed">
            {department?.vision}
          </p>
        </div>
        
        <div>
          <h3 className="text-xl sm:text-2xl font-semibold text-red-700 mb-4 pb-2 border-b border-gray-200">
            Mission
          </h3>
          <p className="text-gray-700 text-lg leading-relaxed">
            {department?.mission}
          </p>
        </div>
        
        {department?.objectives && (
          <div>
            <h3 className="text-xl sm:text-2xl font-semibold text-red-700 mb-4 pb-2 border-b border-gray-200">
              Objectives
            </h3>
            <ul className="list-disc pl-5 text-gray-700 text-lg space-y-2">
              {department.objectives.map((obj, index) => (
                <li key={index}>{obj}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default DepartmentDetails;