import React, { useEffect, useState } from "react";
import DepartmentSelector from "../utilities/DepartmentSelector";
import { deleteLab, getLabs } from "../../../../functions/labs";

function DeleteLabs() {
  const [depo_code, setDepo_code] = useState();
  const [labs, setLabs] = useState([]);
  const [selectedLab, setSelectedLab] = useState("");
  useEffect(() => {
    if (!depo_code) return;
    getLabs(depo_code).then((data) => setLabs(data));
  }, [depo_code]);
  return (
    <div className="my-5">
      <div className="container mx-auto max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl shadow-md dark:shadow-white py-4 px-6 sm:px-10 bg-white dark:bg-gray-800 border-emerald-500 rounded-md">
        <div className="my-3">
          <h1 className="text-center text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Delete Lab
          </h1>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              deleteLab(selectedLab).then((response) => alert("Lab Deleted Successfully"));
              setLabs((prevLabs) => prevLabs.filter((lab) => lab.id !== selectedLab));
            }}
            className="my-4"
          >
            <div className="my-2">
              <label
                htmlFor="department"
                className="text-sm sm:text-md font-bold text-gray-700 dark:text-gray-300"
              >
                Department:
              </label>
              <DepartmentSelector name="depo_code" setValue={setDepo_code} />
            </div>

            <div className="my-2">
              <label
                htmlFor="faculty"
                className="text-sm sm:text-md font-bold text-gray-700 dark:text-gray-300"
              >
                Lab:
              </label>
              <select
                name="id"
                id="faculty"
                onChange={(event) => setSelectedLab(event.target.value)}
                className="block w-full border border-gray-300 rounded-lg p-2.5 text-gray-900 bg-gray-50"
              >
                <option value="" disabled selected>
                  Select a Lab
                </option>
                {labs.length > 0 ? (
                  labs.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.lab_name}
                    </option>
                  ))
                ) : (
                  <option value="">No Labs Available</option>
                )}
              </select>
            </div>

            <button
              type="submit"
              className="px-4 py-1 bg-emerald-500 rounded-md text-black text-sm sm:text-lg shadow-md"
            >
              Delete
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DeleteLabs;
