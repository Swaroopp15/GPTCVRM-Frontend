import React from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

const StudentListPagination = ({
  currentPage,
  totalPages,
  paginate,
  indexOfFirstStudent,
  indexOfLastStudent,
  filteredStudents,
  studentsPerPage,
  setStudentsPerPage,
  setCurrentPage,
}) => {
  return (
    <div className="bg-gray-50/70 px-4 py-3 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-3">
      {filteredStudents.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="text-sm text-gray-600">
            Showing {indexOfFirstStudent + 1}-{Math.min(indexOfLastStudent, filteredStudents.length)} of {filteredStudents.length} students
          </div>

          <div className="flex items-center text-sm">
            <span className="mr-2">Records per page:</span>
            <select
              value={studentsPerPage}
              onChange={(e) => {
                setStudentsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="border border-gray-300 rounded p-1 text-sm"
            >
              {[10, 20, 30, 40, 50].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {filteredStudents.length > studentsPerPage && (
        <div className="flex items-center space-x-2">
          <button
            onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
            disabled={currentPage === 1}
            className={`p-2 rounded-full ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-red-600 hover:bg-red-100'}`}
          >
            <BiChevronLeft className="h-5 w-5" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm ${currentPage === number
                  ? 'bg-red-600 text-white'
                  : 'text-gray-700 hover:bg-gray-200'
                }`}
            >
              {number}
            </button>
          ))}

          <button
            onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-full ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-red-600 hover:bg-red-100'}`}
          >
            <BiChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default StudentListPagination;