import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const LibraryOverview = ({ library, ebooksLength }) => {
  if (!library) {
    return (
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-red-200 animate-pulse h-64"></div>
    );
  }

  const stats = [
    { title: "Library Area", value: library.area ? `${library.area}` : 'N/A', icon: "🏛️", color: "bg-red-100" },
    { title: "Number of Titles", value: library[0]?.total_titles ? library[0].total_titles.toLocaleString() : 0, icon: "📚", color: "bg-blue-100" },
    { title: "Number of Volumes", value: library[0]?.total_volumes ? library[0].total_volumes.toLocaleString() : 0, icon: "📖", color: "bg-green-100" },
    { title: "Number of Journals", value: library[0]?.total_journal ? library[0].total_journal.toLocaleString() : 0, icon: "🗞️", color: "bg-purple-100" },
    { title: "E-Books Collection", value: ebooksLength ? ebooksLength.toLocaleString() : 0, icon: "💻", color: "bg-amber-100" },
    { title: "Annual Library Budget", value: library.budget ? `₹${library.budget.toLocaleString()}` : 'N/A', icon: "💰", color: "bg-emerald-100" },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-red-200 transform transition-all hover:scale-[1.005]">
      <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-4">
        <h2 className="text-2xl font-bold text-white">
          Library Statistics
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex items-start p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all ${stat.color}`}
          >
            <span className="text-3xl mr-4">{stat.icon}</span>
            <div>
              <h3 className="font-semibold text-gray-800">{stat.title}</h3>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

LibraryOverview.propTypes = {
  library: PropTypes.object,
  ebooksLength: PropTypes.number
};

export default LibraryOverview;