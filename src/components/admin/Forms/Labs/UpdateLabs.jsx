import React, { useEffect, useState } from 'react';
import { getLabs, updateLab } from '../../../../functions/labs';
import DepartmentSelector from "../utilities/DepartmentSelector";

function UpdateLabs() {
  const [depo_code, setDepo_code] = useState('');
  const [labs, setLabs] = useState([]);
  const [selectedLabId, setSelectedLabId] = useState('');
  const [selectedLabData, setSelectedLabData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    lab_name: '',
    capacity: '',
    description: '',
    equipment: '',
    lab_images: null
  });

  // Fetch labs when department changes
  useEffect(() => {
    if (!depo_code) {
      setLabs([]);
      setSelectedLabId('');
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

  // Populate form when lab is selected
  useEffect(() => {
    if (selectedLabId && labs.length > 0) {
      const lab = labs.find(l => l.id === selectedLabId);
      if (lab) {
        setSelectedLabData(lab);
        setFormData({
          lab_name: lab.lab_name || '',
          capacity: lab.capacity || '',
          description: lab.description || '',
          equipment: lab.equipment || '',
          lab_images: null
        });
      }
    } else {
      setSelectedLabData(null);
      setFormData({
        lab_name: '',
        capacity: '',
        description: '',
        equipment: '',
        lab_images: null
      });
    }
  }, [selectedLabId, labs]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      lab_images: e.target.files
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedLabId) {
      alert("Please select a lab first");
      return;
    }

    setIsLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('lab_name', formData.lab_name);
      formDataToSend.append('capacity', formData.capacity);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('equipment', formData.equipment);
      
      if (formData.lab_images) {
        for (let i = 0; i < formData.lab_images.length; i++) {
          formDataToSend.append('lab_images', formData.lab_images[i]);
        }
      }

      await updateLab(selectedLabId, formDataToSend);
      alert("Lab updated successfully!");
      
      // Refresh labs list
      const updatedLabs = await getLabs(depo_code);
      setLabs(updatedLabs);
    } catch (error) {
      console.error("Error updating lab:", error);
      alert("Failed to update lab. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    if (selectedLabData) {
      setFormData({
        lab_name: selectedLabData.lab_name || '',
        capacity: selectedLabData.capacity || '',
        description: selectedLabData.description || '',
        equipment: selectedLabData.equipment || '',
        lab_images: null
      });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden p-6 sm:p-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Update Lab</h3>
        <p className="text-sm text-gray-500 mt-1">Modify existing lab details</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
              required
              disabled={!depo_code || isLoading}
              value={selectedLabId}
              onChange={(e) => setSelectedLabId(e.target.value)}
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

          {selectedLabId && (
            <>
              <div>
                <label htmlFor="lab_name" className="block text-sm font-medium text-gray-700 mb-2">
                  Lab Name
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  name="lab_name"
                  id="lab_name"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
                  placeholder="Enter lab name"
                  value={formData.lab_name}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 mb-2">
                  Capacity
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="number"
                  min="0"
                  name="capacity"
                  id="capacity"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
                  placeholder="Enter capacity"
                  value={formData.capacity}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
                  placeholder="Enter lab description"
                  value={formData.description}
                  onChange={handleInputChange}
                ></textarea>
              </div>

              <div>
                <label htmlFor="equipment" className="block text-sm font-medium text-gray-700 mb-2">
                  Equipment
                </label>
                <textarea
                  name="equipment"
                  id="equipment"
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
                  placeholder="List equipment (comma separated)"
                  value={formData.equipment}
                  onChange={handleInputChange}
                ></textarea>
              </div>

              <div>
                <label htmlFor="lab_images" className="block text-sm font-medium text-gray-700 mb-2">
                  Lab Images (Optional)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  name="lab_images"
                  id="lab_images"
                  onChange={handleFileChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                />
                <p className="mt-1 text-sm text-gray-500">Select new images to update existing ones</p>
              </div>
            </>
          )}
        </div>

        {selectedLabId && (
          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={handleReset}
              className="px-5 py-2.5 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-200"
            >
              Reset
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-200 transform hover:-translate-y-0.5 disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? 'Updating...' : 'Update Lab'}
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default UpdateLabs;