import React from "react";

const PlacementRecord = ({ placement, index }) => {
    return (
        <>
            <tr
                className={`hidden md:table-row transition-all duration-200 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-red-50 group relative z-10`}
            >
                <td className="py-4 px-6 border-b border-gray-200 font-medium text-gray-900 group-hover:text-red-700 transition-colors duration-200">
                    {placement.name}
                </td>
                <td className="py-4 px-6 border-b border-gray-200 text-gray-700">
                    {placement.pin}
                </td>
                <td className="py-4 px-6 border-b border-gray-200">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        {placement.depo_code?.toUpperCase()}
                    </span>
                </td>
                <td className="py-4 px-6 border-b border-gray-200 text-gray-700 font-medium">
                    {placement.company}
                </td>
                <td className="py-4 px-6 border-b border-gray-200 text-gray-700">
                    {placement.role}
                </td>
                <td className="py-4 px-6 border-b border-gray-200 font-semibold text-green-600">
                    {placement.package} LPA
                </td>
                <td className="py-4 px-6 border-b border-gray-200">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {placement.placement_year}
                    </span>
                </td>
            </tr>

            <tr
                className={`md:hidden ${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-red-50`}
            >
                <td className="px-4 py-3 border-b border-gray-200" colSpan="7">
                    <div className="flex flex-col space-y-2">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-medium text-gray-900">{placement.name}</h3>
                                <p className="text-sm text-gray-500">{placement.pin}</p>
                            </div>
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                                {placement.depo_code?.toUpperCase()}
                            </span>
                        </div>

                        <div className="pt-1">
                            <p className="font-medium">{placement.company}</p>
                            <p className="text-gray-700 text-sm">{placement.role}</p>
                        </div>

                        <div className="flex justify-between items-center pt-1">
                            <span className="font-semibold text-green-600">
                                {placement.package} LPA
                            </span>
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                {placement.placement_year}
                            </span>
                        </div>
                    </div>
                </td>
            </tr>
        </>
    );
};

export default PlacementRecord;