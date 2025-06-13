import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const JournalList = ({ journals }) => {
  if (!journals || journals.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-red-200">
        <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-4">
          <h2 className="text-2xl font-bold text-white">Journal Collection</h2>
        </div>
        <div className="p-8 text-center">
          <motion.div 
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-red-500 text-5xl mb-4"
          >
            📰
          </motion.div>
          <h3 className="text-xl font-medium text-gray-700">No journals available</h3>
          <p className="text-gray-500 mt-2">The library currently has no journals in its collection</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-red-200">
      <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-4">
        <h2 className="text-2xl font-bold text-white">Journal Collection</h2>
        <p className="text-red-100 text-sm mt-1">
          Showing {journals.length} journals in our collection
        </p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {["Journal Name", "Publisher", "ISSN"].map((header, index) => (
                <th 
                  key={index}
                  className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {journals.map((journal, index) => (
              <motion.tr
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className={`transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-red-50`}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                      📰
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {journal.title || 'Unknown Journal'}
                      </div>
                      <div className="text-sm text-gray-500">
                        {journal.frequency || 'Frequency not specified'}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {journal.author || 'Unknown Publisher'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {journal.issn || 'N/A'}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

JournalList.propTypes = {
  journals: PropTypes.array
};

export default JournalList;