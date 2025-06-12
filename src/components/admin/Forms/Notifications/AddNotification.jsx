import React, { useState } from 'react';
import { addNotification } from '../../../../functions/notification';

function AddNotification() {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    hasLink: false,
    link: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await addNotification({
        title: formData.title,
        date: formData.date,
        ...(formData.hasLink && { link: formData.link })
      });
      alert("Notification created successfully!");
      setFormData({
        title: '',
        date: '',
        hasLink: false,
        link: ''
      });
    } catch (error) {
      console.error("Error creating notification:", error);
      alert("Failed to create notification");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden p-6 sm:p-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Add Notification</h3>
        <p className="text-sm text-gray-500 mt-1">Create a new notification</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="date"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              required
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="hasLink"
              className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
              checked={formData.hasLink}
              onChange={(e) => setFormData({...formData, hasLink: e.target.checked})}
            />
            <label htmlFor="hasLink" className="ml-2 block text-sm text-gray-700">
              Include Link?
            </label>
          </div>

          {formData.hasLink && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Link URL
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="url"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
                value={formData.link}
                onChange={(e) => setFormData({...formData, link: e.target.value})}
                required={formData.hasLink}
                placeholder="https://example.com"
              />
            </div>
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
            className="px-5 py-2.5 rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-200 transform hover:-translate-y-0.5 disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating...' : 'Create Notification'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddNotification;