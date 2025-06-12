import React, { useState } from 'react';
import DepartmentSelector from "../utilities/DepartmentSelector";
import { addEvent } from '../../../../functions/events';

function CreateEvent() {
  const [formData, setFormData] = useState({
    event_name: '',
    date: '',
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



  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.event_name);
      formDataToSend.append('date', formData.date);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('depo_code', formData.depo_code);
      formDataToSend.append('category', 'events');
      formDataToSend.append('subfolder', formData.event_name);
      
      const files = e.target.event_images.files;
    for (let i = 0; i < files.length; i++) {
      formDataToSend.append("event_images", files[i]);
    }

      // Replace with your actual API call
      // const response = await createEvent(formDataToSend);
      console.log("event image", formData.event_images);
      
      await addEvent(formDataToSend);
      // if (response.ok) {
        alert("Event created successfully!");
        // setFormData({
        //   event_name: '',
        //   date: '',
        //   description: '',
        //   depo_code: '',
        //   event_images: null
        // });
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
              placeholder="Enter event name"
              value={formData.event_name}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
              Conducted On (Date)
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              id="date"
              name="date"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
              placeholder="Enter event held date"
              value={formData.date}
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
            />
            <p className="mt-1 text-sm text-gray-500">Upload multiple images of the event</p>
          </div>
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
            className="px-5 py-2.5 rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-200 transform hover:-translate-y-0.5 disabled:opacity-50"
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