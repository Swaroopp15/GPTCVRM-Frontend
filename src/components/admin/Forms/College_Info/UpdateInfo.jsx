import React, { useEffect, useState } from "react";
import getCollegeInfo from "../../../../functions/getCollegeInfo";
import InfoItem from "./InfoItem";

function UpdateInfo() {
  const [collegeInfo, setCollegeInfo] = useState();
  const [keys, setKeys] = useState([]);
  const [selectedKey, setSelectedKey] = useState("");
  const [value, setValue] = useState("");

  useEffect(() => {
    getCollegeInfo().then((data) => {
      setCollegeInfo(data.college);
      setKeys(Object.keys(data.college));
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${import.meta.env.VITE_BACKEND}college-info/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        info_key: selectedKey,
        info_value: value,
      }),
    });
    const data = await response.json();
    if (response.ok) {
      alert("College information updated successfully");
      setValue("");
      setSelectedKey("");
      alert("Please refresh the page to see the changes");
    } else {
      alert("Error updating college information");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden p-6 sm:p-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-800">
          Update College Information
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-4 gap-6 items-center">
          <label
            htmlFor="name"
            className="block text-md font-medium text-center"
          >
            Select Info To Change
          </label>
          <select
            id="info"
            name="info"
            onChange={(e) => setSelectedKey(e.target.value)}
            className="w-full px-4 py-3 col-span-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
          >
            <option value="">Select Info</option>
            {keys.map((key, index) => (
              <option key={index} value={key} className="capitalize">
                {key.split("_").join(" ")}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-4 gap-6 items-center">
          {selectedKey && collegeInfo && (
            <textarea
              id="info"
              name="info"
              required
              onChange={(e) =>
                setValue((value) => {
                  return e.target.value;
                })
              }
              className="w-full px-4 py-3 col-span-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
              placeholder={collegeInfo[selectedKey]}
            />
          )}
        </div>

        <div className="flex justify-end space-x-3 pt-2">
          <button
            type="reset"
            className="px-5 py-2.5 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-200"
          >
            Reset
          </button>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-200 transform hover:-translate-y-0.5"
          >
            Update Information
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateInfo;
