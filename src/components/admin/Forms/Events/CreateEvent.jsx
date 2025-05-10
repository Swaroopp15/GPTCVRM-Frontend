import React, { useState } from 'react';
import DepartmentSelector from "../utilities/DepartmentSelector";

function CreateEvent() {
  const [formData, setFormData] = useState({
    event_name: '',
    conducted_by: '',
    description: '',
    depo_code: '',
    event_images: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      event_images: e.target.files
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('event_name', formData.event_name);
      formDataToSend.append('conducted_by', formData.conducted_by);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('depo_code', formData.depo_code);
      
      if (formData.event_images) {
        for (let i = 0; i < formData.event_images.length; i++) {
          formDataToSend.append('event_images', formData.event_images[i]);
        }
      }

      // Replace with your actual API call
      // const response = await createEvent(formDataToSend);
      // if (response.ok) {
        alert("Event created successfully!");
        setFormData({
          event_name: '',
          conducted_by: '',
          description: '',
          depo_code: '',
          event_images: null
        });
      // }
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Failed to create event. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden p-6 sm:p-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Create New Event</h3>
        <p className="text-sm text-gray-500 mt-1">Add details about the upcoming event</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="event_name" className="block text-sm font-medium text-gray-700 mb-2">
              Event Name
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              id="event_name"
              name="event_name"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              placeholder="Enter event name"
              value={formData.event_name}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="conducted_by" className="block text-sm font-medium text-gray-700 mb-2">
              Conducted By
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              id="conducted_by"
              name="conducted_by"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              placeholder="Enter organizer name"
              value={formData.conducted_by}
              onChange={handleInputChange}
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-2">
              Department
              <span className="text-red-500 ml-1">*</span>
            </label>
            <DepartmentSelector 
              name="depo_code" 
              setValue={(value) => setFormData(prev => ({...prev, depo_code: value}))} 
              required 
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description
              <span className="text-red-500 ml-1">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              rows="4"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              placeholder="Enter event description"
              value={formData.description}
              onChange={handleInputChange}
            ></textarea>
          </div>

          <div className="md:col-span-2">
            <label htmlFor="event_images" className="block text-sm font-medium text-gray-700 mb-2">
              Event Photos
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              name="event_images"
              id="event_images"
              onChange={handleFileChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            <p className="mt-1 text-sm text-gray-500">Upload multiple images of the event</p>
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-2">
          <button
            type="reset"
            className="px-5 py-2.5 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
          >
            Reset
          </button>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 transform hover:-translate-y-0.5 disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating...' : 'Create Event'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateEvent;