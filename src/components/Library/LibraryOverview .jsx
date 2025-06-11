import React from 'react';
import PropTypes from 'prop-types';

const LibraryOverview = ({ library, ebooksLength }) => {
  if (!library) {
    return (
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-red-200 animate-pulse h-64"></div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-red-200 transform transition-all hover:scale-[1.01]">
      <div className="bg-red-700 px-6 py-4">
        <h2 className="text-2xl font-bold text-white">
          Library Statistics
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        {[
          { title: "Library Area", value: library.area ? `${library.area} sq.ft` : 'N/A', icon: "🏛️" },
          { title: "Number of Titles", value: library[0].total_titles ? library[0].total_titles.toLocaleString() : 0, icon: "📚" },
          { title: "Number of Volumes", value: library[0].total_volumes ? library[0].total_volumes.toLocaleString() : 0, icon: "📖" },
          { title: "Number of Journals", value: library[0].total_journal ? library[0].total_journal.toLocaleString() : 0, icon: "🗞️" },
          { title: "E-Books Collection", value: ebooksLength ? ebooksLength.toLocaleString() : 0, icon: "💻" },
          { title: "Annual Library Budget", value: library.budget ? `₹${library.budget.toLocaleString()}` : 'N/A', icon: "💰" },
        ].map((stat, index) => (
          <div 
            key={index}
            className="flex items-start p-4 bg-gradient-to-r from-red-50 to-white rounded-lg border-l-4 border-red-500 hover:border-red-700 transition-all"
          >
            <span className="text-3xl mr-4">{stat.icon}</span>
            <div>
              <h3 className="font-semibold text-red-800">{stat.title}</h3>
              <p className="text-2xl font-bold text-red-600">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

LibraryOverview.propTypes = {
  library: PropTypes.object,
  ebooksLength: PropTypes.number
};

LibraryOverview.defaultProps = {
  library: null,
  ebooksLength: 0
};

export default LibraryOverview;