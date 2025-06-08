import React from 'react';

const Spinner = ({ message }) => {
  return (
    <div
      className="fixed top-0 left-0 z-50 w-screen h-screen flex items-center justify-center bg-black/30"
      role="status"
      aria-live="polite"
    >
      <div className="bg-white border px-6 py-4 rounded-xl shadow-md flex flex-col items-center">
        <div className="flex space-x-2 mt-1 h-5">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce"></div>
        </div>
        <p className="text-gray-500 text-sm font-light mt-3 text-center">
          {message || 'Loading.....'}
        </p>
      </div>
    </div>
  );
};

export default Spinner;
