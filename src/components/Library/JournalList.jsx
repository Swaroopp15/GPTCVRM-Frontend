import React from 'react';

const JournalList = ({ journals }) => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md border border-red-100 mt-6">
      <h2 className="text-2xl font-bold text-red-800 mb-6 border-b-2 border-red-200 pb-2">
        Journal Collection
      </h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-red-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-red-800 uppercase tracking-wider">
                Journal Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-red-800 uppercase tracking-wider">
                Publisher
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {journals.map((journal, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-red-50'}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {journal.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {journal.publisher}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JournalList;