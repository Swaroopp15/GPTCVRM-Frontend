import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';

const ShowDepartments = () => {
  const [departments, setDepartments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND}departments`);
        if (!response.ok) {
          throw new Error('Failed to fetch departments');
        }
        const data = await response.json();
        setDepartments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  const deleteDepartment = async (depo_code) => {
    if (!window.confirm('Are you sure you want to delete this department?',depo_code)) 
      return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND}departments/${depo_code}`,
        { method: 'DELETE' }
      );

      if (!response.ok) {
        throw new Error('Failed to delete department');
      }

      alert('Department deleted successfully');
      setDepartments(departments.filter(dept => dept.code !== depo_code));
    } catch (err) {
      alert(`Error deleting department: ${err.message}`);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDepartments = departments.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(departments.length / itemsPerPage);

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">

      {isLoading ? (
        <div className="p-6 space-y-4">
          {[...Array(itemsPerPage)].map((_, i) => (
            <div key={i} className="h-14 bg-gray-100 rounded-lg animate-pulse"></div>
          ))}
        </div>
      ) : error ? (
        <div className="p-6 text-center text-red-500 font-medium">{error}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th> */}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentDepartments.map((dept) => (
                <tr key={dept.id} className="hover:bg-gray-50 transition duration-150">
                  {/* <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{dept.id}</td> */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{dept.department_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 uppercase">
                      {dept.depo_code}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                    <Link to={`/admin/departments/update/${dept.depo_code}`} className="text-blue-600 hover:text-blue-900 transition duration-150">
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteDepartment(dept.depo_code)}
                      className="text-red-600 hover:text-red-900 transition duration-150"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-between items-center">
        <div className="text-sm text-gray-500">
          Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
          <span className="font-medium">{Math.min(indexOfLastItem, departments.length)}</span> of{' '}
          <span className="font-medium">{departments.length}</span> departments
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border border-gray-300 rounded text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 border rounded text-sm font-medium transition duration-200 ${
                currentPage === i + 1
                  ? 'border-blue-500 bg-blue-50 text-blue-600'
                  : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border border-gray-300 rounded text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowDepartments;
