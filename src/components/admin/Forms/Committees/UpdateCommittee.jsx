import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../../../../../Context/Context';
import { updateCommittees } from '../../../../functions/committees';

function UpdateCommittee() {
  const { committees } = useContext(Context);
  const [selectedCommitteeId, setSelectedCommitteeId] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    about: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  // When a committee is selected, populate the form with its data
  useEffect(() => {
    if (selectedCommitteeId) {
      const committee = committees.find(c => c.id === selectedCommitteeId);
      if (committee) {
        setFormData({
          name: committee.name || '',
          about: committee.about || ''
        });
      }
    } else {
      setFormData({ name: '', about: '' });
    }
  }, [selectedCommitteeId, committees]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCommitteeId) {
      alert("Please select a committee first");
      return;
    }

    setIsLoading(true);
    try {
      await updateCommittees(selectedCommitteeId, formData.name, formData.about);
      alert("Committee updated successfully!");
    } catch (error) {
      console.error("Error updating committee:", error);
      alert("Failed to update committee. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    if (selectedCommitteeId) {
      const committee = committees.find(c => c.id === selectedCommitteeId);
      setFormData({
        name: committee?.name || '',
        about: committee?.about || ''
      });
    } else {
      setFormData({ name: '', about: '' });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden p-6 sm:p-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Update Committee</h3>
        <p className="text-sm text-gray-500 mt-1">Modify existing committee details</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="mb-4">
          <label htmlFor="committee" className="block text-sm font-medium text-gray-700 mb-2">
            Select Committee
            <span className="text-red-500 ml-1">*</span>
          </label>
          <select
            id="committee"
            name="committee"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            required
            value={selectedCommitteeId}
            onChange={(e) => setSelectedCommitteeId(e.target.value)}
          >
            <option value="" disabled>Select a committee</option>
            {committees.length > 0 ? (
              committees.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))
            ) : (
              <option value="" disabled>No Committees Available</option>
            )}
          </select>
        </div>

        {selectedCommitteeId && (
          <>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Committee Name
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  placeholder="Academic Committee"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label htmlFor="about" className="block text-sm font-medium text-gray-700 mb-2">
                  Committee Description
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <textarea
                  id="about"
                  name="about"
                  rows="4"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  placeholder="Describe the committee's purpose and responsibilities..."
                  value={formData.about}
                  onChange={handleInputChange}
                ></textarea>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={handleReset}
                className="px-5 py-2.5 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
                disabled={!selectedCommitteeId}
              >
                Reset
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 transform hover:-translate-y-0.5 disabled:opacity-50"
                disabled={!selectedCommitteeId || isLoading}
              >
                {isLoading ? 'Updating...' : 'Update Committee'}
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}

export default UpdateCommittee;