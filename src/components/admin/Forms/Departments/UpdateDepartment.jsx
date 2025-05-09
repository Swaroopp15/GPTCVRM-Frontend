import React, { useEffect, useState } from 'react';
import fetchDepartments from '../../../../functions/fetchDepartments';
import updateDepartment from '../../../../functions/updateDepartment';

function UpdateDepartment() {
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [formData, setFormData] = useState({
    department_name: '',
    depo_code: '',
    vision: '',
    mission: ''
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchDepartments();
        setDepartments(data);
      } catch (error) {
        console.error("Error loading departments:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const handleDepartmentSelect = (e) => {
    const depoCode = e.target.value;
    const department = departments.find(d => d.depo_code === depoCode);
    
    if (department) {
      setSelectedDepartment(department);
      setFormData({
        department_name: department.department_name,
        depo_code: department.depo_code,
        vision: department.vision || '',
        mission: department.mission || ''
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.depo_code) {
        alert("Please select a department first");
        return;
      }

      const { depo_code, ...updateData } = formData;
      await updateDepartment(depo_code, updateData);
      alert("Department updated successfully!");
    } catch (error) {
      console.error("Error updating department:", error);
      alert("Failed to update department. Please try again.");
    }
  };

  const handleReset = () => {
    if (selectedDepartment) {
      setFormData({
        department_name: selectedDepartment.department_name,
        depo_code: selectedDepartment.depo_code,
        vision: selectedDepartment.vision || '',
        mission: selectedDepartment.mission || ''
      });
    } else {
      setFormData({
        department_name: '',
        depo_code: '',
        vision: '',
        mission: ''
      });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden p-6 sm:p-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Update Department</h3>
        <p className="text-sm text-gray-500 mt-1">Modify existing department details</p>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="mb-4">
            <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-2">
              Select Department
              <span className="text-red-500 ml-1">*</span>
            </label>
            <select
              id="department"
              name="department"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              required
              onChange={handleDepartmentSelect}
              value={formData.depo_code || ""}
            >
              <option value="" disabled>Select a department</option>
              {departments.map((department) => (
                <option key={department.depo_code} value={department.depo_code}>
                  {department.department_name} ({department.depo_code})
                </option>
              ))}
            </select>
          </div>

          {selectedDepartment && (
            <>
              <div className="border-t-2 pt-5 border-gray-200">
                <h2 className="font-semibold text-xl text-gray-800">Department Details</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="department_name" className="block text-sm font-medium text-gray-700 mb-2">
                    Department Name
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    id="department_name"
                    name="department_name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                    placeholder="Computer Science"
                    value={formData.department_name}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label htmlFor="depo_code" className="block text-sm font-medium text-gray-700 mb-2">
                    Department Code
                  </label>
                  <input
                    type="text"
                    id="depo_code"
                    name="depo_code"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-gray-100 cursor-not-allowed"
                    value={formData.depo_code}
                    readOnly
                    disabled
                  />
                </div>
              </div>

              <div>
                <label htmlFor="vision" className="block text-sm font-medium text-gray-700 mb-2">
                  Vision Statement
                </label>
                <textarea
                  id="vision"
                  name="vision"
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  placeholder="Department vision statement..."
                  value={formData.vision}
                  onChange={handleInputChange}
                ></textarea>
              </div>

              <div>
                <label htmlFor="mission" className="block text-sm font-medium text-gray-700 mb-2">
                  Mission Statement
                </label>
                <textarea
                  id="mission"
                  name="mission"
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  placeholder="Department mission statement..."
                  value={formData.mission}
                  onChange={handleInputChange}
                ></textarea>
              </div>
            </>
          )}

          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={handleReset}
              className="px-5 py-2.5 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
              disabled={!selectedDepartment}
            >
              Reset
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 transform hover:-translate-y-0.5 disabled:opacity-50"
              disabled={!selectedDepartment}
            >
              {isLoading ? 'Updating...' : 'Update Department'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default UpdateDepartment;