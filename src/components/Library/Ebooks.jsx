import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const Ebooks = ({ books }) => {
  if (!books || books.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-red-200">
        <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-4">
          <h2 className="text-2xl font-bold text-white">Ebooks Collection</h2>
        </div>
        <div className="p-8 text-center">
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-red-500 text-5xl mb-4"
          >
            📱
          </motion.div>
          <h3 className="text-xl font-medium text-gray-700">No ebooks available</h3>
          <p className="text-gray-500 mt-2">The library currently has no ebooks in its digital collection</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-red-200">
      <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-4">
        <h2 className="text-2xl font-bold text-white">Ebooks Collection</h2>
        <p className="text-red-100 text-sm mt-1">
          Click on any ebook to open it in a new window
        </p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {["Book Name", "Author", "Format", "Access"].map((header, index) => (
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
            {books.map((book, index) => (
              <motion.tr
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className={`transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-red-50 cursor-pointer`}
                onClick={() => {
                  if (book.link) {
                    const link = book.link.startsWith('http') ? book.link : import.meta.env.VITE_BACKEND + book.link;
                    window.open(link, '_blank');
                  }
                }}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      💾
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {book.title || 'Unknown Ebook'}
                      </div>
                      <div className="text-sm text-gray-500">
                        {book.language || 'Language not specified'}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {book.author || 'Unknown Author'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {book.format || 'PDF'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {book.link ? (
                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 animate-pulse">
                      Available
                    </span>
                  ) : (
                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                      Unavailable
                    </span>
                  )}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

Ebooks.propTypes = {
  books: PropTypes.array
};

export default Ebooks;