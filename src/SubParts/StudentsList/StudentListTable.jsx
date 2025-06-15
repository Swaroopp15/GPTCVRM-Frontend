import React from "react";
import StudentRecord from "./StudentRecord";

const StudentListTable = ({
  isLoading,
  currentStudents,
  selectedDepartment,
  semester
}) => {
  if (isLoading) {
    return (
      <div className="p-12 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600" />
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Student Name
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider hidden md:table-cell">
              PIN
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Department
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Admission Year
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentStudents.length > 0 ? (
            currentStudents.map((student, index) => (
              <StudentRecord key={index} student={student} index={index} />
            ))
          ) : (
            <tr>
              <td colSpan={4} className="px-6 py-8 text-center">
                {!selectedDepartment || !semester ? (
                  <p className="text-gray-600">
                    Please select department and semester to view students
                  </p>
                ) : (
                  <p className="text-gray-600">
                    No students found matching your criteria
                  </p>
                )}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentListTable;