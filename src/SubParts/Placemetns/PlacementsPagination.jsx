import React from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

const PlacementsStats = ({ filteredPlacements }) => {
    if (filteredPlacements.length === 0) return null;

    const highestPackage = Math.max(
        ...filteredPlacements.map((p) => parseFloat(p.package))
    );
    const averagePackage = (
        filteredPlacements.reduce((sum, p) => sum + parseFloat(p.package), 0) /
        filteredPlacements.length
    ).toFixed(2);

    return (
        <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            <div className="flex items-center text-xs sm:text-sm">
                <span className="h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-green-500 mr-2"></span>
                <span>Highest: {highestPackage} LPA</span>
            </div>
            <div className="flex items-center text-xs sm:text-sm">
                <span className="h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-blue-500 mr-2"></span>
                <span>Avg: {averagePackage} LPA</span>
            </div>
        </div>
    );
};

const PlacementsPagination = ({
    currentPage,
    totalPages,
    paginate,
    placementsPerPage,
    setPlacementsPerPage,
    indexOfFirstPlacement,
    indexOfLastPlacement,
    filteredPlacements,
}) => {
    const renderPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1);

            if (currentPage > 3) {
                pages.push("...");
            }

            let startPage = Math.max(2, currentPage - 1);
            let endPage = Math.min(totalPages - 1, currentPage + 1);

            if (currentPage <= 3) {
                endPage = 4;
            } else if (currentPage >= totalPages - 2) {
                startPage = totalPages - 3;
            }

            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }

            if (currentPage < totalPages - 2) {
                pages.push("...");
            }

            pages.push(totalPages);
        }

        return pages.map((page, index) => {
            if (page === "...") {
                return (
                    <span key={index} className="px-1">
                        ...
                    </span>
                );
            }
            return (
                <button
                    key={index}
                    onClick={() => paginate(page)}
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm ${currentPage === page
                            ? "bg-red-600 text-white"
                            : "text-gray-700 hover:bg-gray-200"
                        }`}
                >
                    {page}
                </button>
            );
        });
    };

    return (
        <div className="bg-gray-50/70 px-4 py-3 border-t border-gray-200 flex flex-col gap-3">
            {filteredPlacements.length > 0 && (
                <div className="flex flex-col gap-2 w-full">
                    <PlacementsStats filteredPlacements={filteredPlacements} />

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 w-full">
                        <div className="flex items-center text-xs sm:text-sm">
                            <span className="mr-2">Records per page:</span>
                            <select
                                value={placementsPerPage}
                                onChange={(e) => {
                                    setPlacementsPerPage(Number(e.target.value));
                                    paginate(1);
                                }}
                                className="border border-gray-300 rounded p-1 text-xs sm:text-sm"
                            >
                                {[10, 20, 30, 40, 50].map((size) => (
                                    <option key={size} value={size}>
                                        {size}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="text-xs sm:text-sm text-gray-600 text-center sm:text-right">
                            Showing {indexOfFirstPlacement + 1}-
                            {Math.min(indexOfLastPlacement, filteredPlacements.length)} of{" "}
                            {filteredPlacements.length}
                        </div>
                    </div>
                </div>
            )}

            {filteredPlacements.length > placementsPerPage && (
                <div className="flex flex-col items-center w-full">
                    <div className="flex items-center space-x-1">
                        <button
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`p-1 sm:p-2 rounded-full ${currentPage === 1
                                    ? "text-gray-400 cursor-not-allowed"
                                    : "text-red-600 hover:bg-red-100"
                                }`}
                        >
                            <BiChevronLeft className="h-5 w-5" />
                        </button>

                        {renderPageNumbers()}

                        <button
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`p-1 sm:p-2 rounded-full ${currentPage === totalPages
                                    ? "text-gray-400 cursor-not-allowed"
                                    : "text-red-600 hover:bg-red-100"
                                }`}
                        >
                            <BiChevronRight className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PlacementsPagination;