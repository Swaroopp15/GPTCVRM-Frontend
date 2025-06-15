import React, { useContext, useEffect, useState } from 'react'
import { DepartmentContext } from './Department';
import LabCard from '../components/Labs/LabCard';
import { getLabs } from '../functions/labs';
import { motion } from "framer-motion";

function Labs() {
    const depo_code = useContext(DepartmentContext);
    const [labs, setLabs] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
      setLoading(true);
      getLabs(depo_code)
        .then(data => {
          setLabs(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }, [depo_code]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-red-700 mb-4 relative inline-block">
          Laboratory Facilities
          <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-red-700 rounded-full"></span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          State-of-the-art laboratories equipped with modern technology to enhance practical learning experiences.
        </p>
      </motion.div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-700"></div>
        </div>
      ) : labs.length > 0 ? (
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          className="grid gap-8"
        >
          {labs.map((lab, index) => (
            <LabCard key={lab.id} lab={lab} index={index} />
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-16 bg-white rounded-xl shadow-md border border-gray-100">
          <svg className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-xl font-medium text-gray-700">No Labs Available</h3>
          <p className="text-gray-500 mt-2">Currently there are no labs listed for this department.</p>
        </div>
      )}
    </div>
  )
}

export default Labs;