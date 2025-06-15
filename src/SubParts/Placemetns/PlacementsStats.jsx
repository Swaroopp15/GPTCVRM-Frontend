import React from "react";

const PlacementsStats = ({ filteredPlacements }) => {
  if (filteredPlacements.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
      <div className="flex items-center text-xs sm:text-sm">
        <span className="h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-green-500 mr-2"></span>
        <span>Highest: {Math.max(...filteredPlacements.map(p => parseFloat(p.package)))} LPA</span>
      </div>
      <div className="flex items-center text-xs sm:text-sm">
        <span className="h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-blue-500 mr-2"></span>
        <span>Avg: {(filteredPlacements.reduce((sum, p) => sum + parseFloat(p.package), 0) / filteredPlacements.length).toFixed(2)} LPA</span>
      </div>
    </div>
  );
};

export default PlacementsStats;