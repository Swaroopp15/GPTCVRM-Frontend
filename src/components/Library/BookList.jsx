import React from 'react';
import PropTypes from 'prop-types';

const BookList = ({ books }) => {
  if (!books || books.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-red-200">
        <div className="bg-red-700 px-6 py-4">
          <h2 className="text-2xl font-bold text-white">Book Collection</h2>
        </div>
        <div className="p-8 text-center">
          <div className="text-red-500 text-5xl mb-4">📚</div>
          <h3 className="text-xl font-medium text-gray-700">No books available</h3>
          <p className="text-gray-500 mt-2">The library currently has no books in its collection</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-red-200">
      <div className="bg-red-700 px-6 py-4">
        <h2 className="text-2xl font-bold text-white">Book Collection</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-red-100">
          <thead className="bg-red-50">
            <tr>
              {["Book Name", "Author", "Copies Available"].map((header, index) => (
                <th 
                  key={index}
                  className="px-6 py-3 text-left text-xs font-bold text-red-800 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-red-100">
            {books.map((book, index) => (
              <tr 
                key={index} 
                className={`transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-red-50'} hover:bg-red-100`}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="text-red-600 mr-3">📘</div>
                    <div className="text-sm font-medium text-gray-900">
                      {book.title || 'Unknown Title'}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {book.author || 'Unknown Author'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                    {book.volumes || 0} copies
                  </span>
                </td>
              </tr>
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

BookList.defaultProps = {
  books: []
};

export default BookList;