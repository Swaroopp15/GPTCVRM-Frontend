import React from "react";
import ResultRecord from "./ResultRecord";

const ResultsTable = ({ isLoading, currentResults, department, year, query }) => {
    if (isLoading) {
        return (
            <div className="p-12 flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider hidden md:table-cell">Pin</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Student Name</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider hidden md:table-cell">Application ID</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider hidden md:table-cell">Year</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider hidden md:table-cell">Department</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Percentage</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {currentResults.length > 0 ? (
                        currentResults.map((result, index) => (
                            <ResultRecord result={result} key={index} index={index} />
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6} className="px-6 py-8 text-center">
                                <div className="flex flex-col items-center justify-center">
                                    <svg className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <h3 className="mt-2 text-lg font-medium text-gray-900">No results found</h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        {department || year || query
                                            ? "Try adjusting your search or filter criteria"
                                            : "Please select department and year or use search"}
                                    </p>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ResultsTable;