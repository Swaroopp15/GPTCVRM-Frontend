import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const BookList = ({ books }) => {
  if (!books || books.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-red-200">
        <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-4">
          <h2 className="text-2xl font-bold text-white">Book Collection</h2>
        </div>
        <div className="p-8 text-center">
          <motion.div 
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-red-500 text-5xl mb-4"
          >
            📚
          </motion.div>
          <h3 className="text-xl font-medium text-gray-700">No books available</h3>
          <p className="text-gray-500 mt-2">The library currently has no books in its collection</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-red-200">
      <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-4">
        <h2 className="text-2xl font-bold text-white">Book Collection</h2>
        <p className="text-red-100 text-sm mt-1">
          Showing {books.length} books in our collection
        </p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {["Book Name", "Author", "Copies Available"].map((header, index) => (
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
                className={`transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-red-50`}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                      📘
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {book.title || 'Unknown Title'}
                      </div>
                      <div className="text-sm text-gray-500">
                        {book.isbn || 'ISBN not available'}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{book.author || 'Unknown Author'}</div>
                  {book.publisher && (
                    <div className="text-sm text-gray-500">{book.publisher}</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    book.volumes > 5 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {book.volumes || 0} {book.volumes === 1 ? 'copy' : 'copies'}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

BookList.propTypes = {
  books: PropTypes.array
};

export default BookList;