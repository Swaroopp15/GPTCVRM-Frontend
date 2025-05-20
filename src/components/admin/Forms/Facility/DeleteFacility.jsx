import React, { useEffect } from "react";
import { deleteFacility, getFacilities } from "../../../../functions/facilities";

function DeleteFacility() {
  const [facilities, setFacilitys] = React.useState([]);
  const [selectedFacility, setSelectedFacility] = React.useState("");
  console.log(facilities);
  
  useEffect(() => {
    getFacilities()
      .then((data) => {
        return data.filter((item) => item != null)
      })
      .then((data) => {
        setFacilitys(data);
      })
      .catch((error) => {
        console.error("Error fetching facilities:", error);
      });
  }, []);
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden p-6 sm:p-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Delete Facility</h3>
        <p className="text-sm text-gray-500 mt-1">Delete existing facility</p>
      </div>

      <form
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          if (!selectedFacility) {
            alert("Please select an facility first");
            return;
          }
          deleteFacility(selectedFacility)
            .then(() => {
              alert("Facility deleted successfully!");
              setSelectedFacility("");
              setFacilitys(facilities.filter((facility) => facility.id !== selectedFacility));
            })
            .catch((error) => {
              console.error("Error deleting facility:", error);
              alert("Failed to delete facility");
            });
        }}
      >
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Facility
              <span className="text-red-500 ml-1">*</span>
            </label>
            <select
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              value={selectedFacility}
              onChange={(e) => setSelectedFacility(e.target.value)}
              required
            >
              <option value="" disabled>
                Select an facility
              </option>
              {facilities.map((facility) => (
                <option key={facility.id} value={facility.id}>
                  {facility.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {selectedFacility && (
          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              className="px-5 py-2.5 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
            >
              Reset
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 transform hover:-translate-y-0.5 disabled:opacity-50"
            >
              {"Delete Facility"}
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default DeleteFacility;
