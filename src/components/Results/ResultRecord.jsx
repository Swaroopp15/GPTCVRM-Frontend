import React from 'react'

const ResultRecord = ({ result }) => {
  return (
    <tr>
      <td className="py-3 px-6 border border-gray-300">{result.pin}</td>
      <td className="py-3 px-6 border border-gray-300">{result.name}</td>
      <td className="py-3 px-6 border border-gray-300">{result.application_id}</td>
      <td className="py-3 px-6 border border-gray-300">{result.year}</td>
      <td className="py-3 px-6 border border-gray-300">{result.depo_code}</td>
      <td className="py-3 px-6 border border-gray-300">{result.percentage}</td>
    </tr>
  );
};

export default ResultRecord