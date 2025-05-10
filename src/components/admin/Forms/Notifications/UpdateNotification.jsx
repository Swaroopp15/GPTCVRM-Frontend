import React, { useState, useEffect } from 'react';
import { getNotifications, updateNotification } from '../../../../functions/notification';

function UpdateNotification() {
  const [notifications, setNotifications] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    hasLink: false,
    link: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await getNotifications();
        setNotifications(data || []); // Ensure we always have an array
      } catch (err) {
        console.error("Error fetching notifications:", err);
        setError("Failed to load notifications");
        setNotifications([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedId && notifications.length > 0) {
      const notification = notifications.find(n => n.id === selectedId);
      if (notification) {
        setFormData({
          title: notification.title,
          date: notification.date?.split('T')[0] || '',
          hasLink: !!notification.link,
          link: notification.link || ''
        });
      }
    }
  }, [selectedId, notifications]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedId) {
      alert("Please select a notification first");
      return;
    }

    setIsLoading(true);
    try {
      await updateNotification(selectedId, {
        title: formData.title,
        date: formData.date,
        ...(formData.hasLink && { link: formData.link })
      });
      alert("Notification updated successfully!");
    } catch (err) {
      console.error("Error updating notification:", err);
      alert("Failed to update notification");
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden p-6 sm:p-8">
        <div className="text-red-500 text-center py-8">{error}</div>
      </div>
    );
  }

  if (isLoading && notifications.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden p-6 sm:p-8">
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden p-6 sm:p-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Update Notification</h3>
        <p className="text-sm text-gray-500 mt-1">Modify existing notification</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Notification
              <span className="text-red-500 ml-1">*</span>
            </label>
            <select
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
              disabled={isLoading}
              required
            >
              <option value="" disabled>Select a notification</option>
              {notifications.length > 0 ? (
                notifications.map(notification => (
                  <option key={notification.id} value={notification.id}>
                    {notification.title} ({notification.date ? new Date(notification.date).toLocaleDateString() : 'No date'})
                  </option>
                ))
              ) : (
                <option value="" disabled>No notifications available</option>
              )}
            </select>
          </div>

          {/* Rest of your form remains the same */}
          {selectedId && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  value={formData.date || new Date().toISOString().split('T')[0]}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="updateHasLink"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={formData.hasLink}
                  onChange={(e) => setFormData({...formData, hasLink: e.target.checked})}
                />
                <label htmlFor="updateHasLink" className="ml-2 block text-sm text-gray-700">
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                    value={formData.link}
                    onChange={(e) => setFormData({...formData, link: e.target.value})}
                    required={formData.hasLink}
                    placeholder="https://example.com"
                  />
                </div>
              )}
            </>
          )}
        </div>

        {selectedId && (
          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={() => {
                const notification = notifications.find(n => n.id === selectedId);
                if (notification) {
                  setFormData({
                    title: notification.title,
                    date: notification.date?.split('T')[0] || '',
                    hasLink: !!notification.link,
                    link: notification.link || ''
                  });
                }
              }}
              className="px-5 py-2.5 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
            >
              Reset
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 transform hover:-translate-y-0.5 disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? 'Updating...' : 'Update Notification'}
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default UpdateNotification;