import React, { useEffect, useState } from "react";
import DepartmentSelector from "../utilities/DepartmentSelector";
import { deleteLab, getLabs } from "../../../../functions/labs";

function DeleteLabs() {
  const [depo_code, setDepo_code] = useState('');
  const [labs, setLabs] = useState([]);
  const [selectedLab, setSelectedLab] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch labs when department changes
  useEffect(() => {
    if (!depo_code) {
      setLabs([]);
      setSelectedLab('');
      return;
    }

    setIsLoading(true);
    getLabs(depo_code)
      .then((data) => {
        setLabs(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error fetching labs:", error);
        setIsLoading(false);
      });
  }, [depo_code]);

  const handleDelete = async (e) => {
    e.preventDefault();
    if (!selectedLab) {
      alert("Please select a lab to delete");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this lab? This action cannot be undone.")) {
      return;
    }

    setIsDeleting(true);
    try {
      await deleteLab(selectedLab);
      alert("Lab deleted successfully");
      // Update local state to remove the deleted lab
      setLabs(prevLabs => prevLabs.filter(lab => lab.id !== selectedLab));
      setSelectedLab('');
    } catch (error) {
      console.error("Error deleting lab:", error);
      alert("Failed to delete lab. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden p-6 sm:p-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Delete Lab</h3>
        <p className="text-sm text-gray-500 mt-1">Remove an existing laboratory</p>
      </div>

      <form onSubmit={handleDelete} className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-2">
              Department
              <span className="text-red-500 ml-1">*</span>
            </label>
            <DepartmentSelector 
              name="depo_code" 
              setValue={setDepo_code} 
              required 
            />
          </div>

          <div>
            <label htmlFor="lab" className="block text-sm font-medium text-gray-700 mb-2">
              Lab
              <span className="text-red-500 ml-1">*</span>
            </label>
            <select
              name="lab"
              id="lab"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              required
              disabled={!depo_code || isLoading}
              value={selectedLab}
              onChange={(e) => setSelectedLab(e.target.value)}
            >
              <option value="" disabled>Select a lab</option>
              {isLoading && depo_code ? (
                <option value="" disabled>Loading labs...</option>
              ) : labs.length > 0 ? (
                labs.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.lab_name}
                  </option>
                ))
              ) : (
                <option value="" disabled>{depo_code ? 'No labs available' : 'Select department first'}</option>
              )}
            </select>
          </div>
        </div>

        {selectedLab && (
          <div className="pt-4">
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">
                    Warning: This action will permanently delete the selected lab and cannot be undone.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-200 transform hover:-translate-y-0.5 disabled:opacity-50"
                disabled={isDeleting}
              >
                {isDeleting ? 'Deleting...' : 'Confirm Delete'}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default DeleteLabs;