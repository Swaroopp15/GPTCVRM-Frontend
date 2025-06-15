import React from "react";

const StudentRecord = ({ student, index }) => {
    return (
        <>

            <tr className={`hidden md:table-row transition-all duration-200 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-red-50 group relative z-10`}>
                <td className="py-4 px-6 border-b border-gray-200 font-medium text-gray-900 group-hover:text-red-700 transition-colors duration-200">
                    {student.name}
                </td>
                <td className="py-4 px-6 border-b border-gray-200 text-gray-700">
                    {student.pin}
                </td>
                <td className="py-4 px-6 border-b border-gray-200">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        {student.depo_code?.toUpperCase()}
                    </span>
                </td>
                <td className="py-4 px-6 border-b border-gray-200">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {student.admission_year}
                    </span>
                </td>
            </tr>


            <tr className={`md:hidden ${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-red-50`}>
                <td className="px-4 py-3 border-b border-gray-200" colSpan="4">
                    <div className="flex flex-col space-y-2">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-medium text-gray-900">{student.name}</h3>
                                <p className="text-sm text-gray-500">{student.pin}</p>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800 mb-1">
                                    {student.depo_code?.toUpperCase()}
                                </span>
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                    {student.admission_year}
                                </span>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
        </>
    );
};

export default StudentRecord;