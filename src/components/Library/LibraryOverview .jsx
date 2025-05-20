import React from 'react';

const LibraryOverview = ({ library }) => {
  const {
    area,
    titles,
    volumes,
    journals,
    ebooks,
    budget
  } = library;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md border border-red-100">
      <h2 className="text-2xl font-bold text-red-800 mb-6 border-b-2 border-red-200 pb-2">
        Library Statistics
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
            <h3 className="font-semibold text-red-800">Library Area</h3>
            <p className="text-3xl font-bold text-red-600">{area} sq.ft</p>
          </div>
          
          <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
            <h3 className="font-semibold text-red-800">Number of Titles</h3>
            <p className="text-3xl font-bold text-red-600">{titles.toLocaleString()}</p>
          </div>
          
          <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
            <h3 className="font-semibold text-red-800">Number of Volumes</h3>
            <p className="text-3xl font-bold text-red-600">{volumes.toLocaleString()}</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
            <h3 className="font-semibold text-red-800">Number of Journals</h3>
            <p className="text-3xl font-bold text-red-600">{journals.toLocaleString()}</p>
          </div>
          
          <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
            <h3 className="font-semibold text-red-800">E-Books Collection</h3>
            <p className="text-3xl font-bold text-red-600">{ebooks.toLocaleString()}</p>
          </div>
          
          <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
            <h3 className="font-semibold text-red-800">Annual Library Budget</h3>
            <p className="text-3xl font-bold text-red-600">₹{budget.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibraryOverview;