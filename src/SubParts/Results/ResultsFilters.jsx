import React from "react";
import { BiSearch } from "react-icons/bi";
import Selector from "../../components/utility/YearSelector";

const ResultsFilters = ({
    departmentNames,
    department,
    setDepartment,
    years,
    setYear,
    query,
    setQuery
}) => {
    return (
        <div className="p-4 sm:p-6 border-b border-gray-200 bg-gray-50/70">
            <div className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <select
                        className="w-full border border-gray-300 rounded-lg p-2.5 text-sm sm:text-base focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 shadow-sm bg-white/90"
                        onChange={(e) => setDepartment(e.target.value)}
                        value={department || ""}
                    >
                        <option value="">All Departments</option>
                        {departmentNames.map((dept, index) => (
                            <option value={dept.depo_code} key={index}>
                                {dept.department_name}
                            </option>
                        ))}
                    </select>

                    <Selector
                        className="w-full border border-gray-300 rounded-lg p-2.5 text-sm sm:text-base focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 shadow-sm bg-white/90"
                        values={years}
                        setValue={setYear}
                    />
                </div>

                <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <BiSearch className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg bg-white/90 shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 text-sm sm:text-base"
                        placeholder="Search by name, PIN or Application ID..."
                    />
                </div>
            </div>
        </div>
    );
};

export default ResultsFilters;