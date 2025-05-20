import React, { useEffect, useState } from "react";
import { getFacilities, updateFacility } from "../../../../functions/facilities";

function UpdateFacility() {
  const [facilities, setFacilitys] = useState([]);
  const [selectedFacility, setSelectedFacility] = useState("");
  const [changeImage, setChangeImage] = useState(false);
  useEffect(() => {
    getFacilities()
      .then((data) => {
        return data.filter((item) => item != null);
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
        <h3 className="text-2xl font-bold text-gray-800">Update Facility</h3>
        <p className="text-sm text-gray-500 mt-1">Update existing facility</p>
      </div>

      <form
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          if (!selectedFacility) {
            alert("Please select an facility first");
            return;
          }
          const form = new FormData();
          form.append("name", e.target.name.value);
          form.append("about", e.target.about.value);
          form.append("changeImage", e.target.changeImage.value);
          if (changeImage) {
            form.append("images", e.target.images.files[0]);
          }
          updateFacility(selectedFacility, form).then((d) => alert("Updated Facility Successfully"))
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
          {selectedFacility && (
            <>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Facility Name
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  name="name"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  About
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <textarea
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  name="about"
                  placeholder="Enter facility description"
                ></textarea>
              </div>
              <div className="md:col-span-2">
                <label htmlFor="">
                  <input
                    type="checkbox"
                    id=""
                    onChange={(e) => setChangeImage(e.currentTarget.value)}
                    name="changeImage"
                    value={changeImage}
                  />{" "}
                  Update the Facility Image ?
                </label>
                <label
                  htmlFor="event_images"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Facility Photos
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  name="images"
                  id="images"
                  disabled={!changeImage}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Upload multiple images of the facility
                </p>
              </div>
            </>
          )}
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
              {"Update Facility"}
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default UpdateFacility;
