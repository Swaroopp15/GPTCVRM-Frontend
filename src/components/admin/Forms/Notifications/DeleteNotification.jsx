import React, { useState, useEffect } from 'react';
import { getNotifications, deleteNotification } from '../../../../functions/notification';

function DeleteNotification() {
  const [notifications, setNotifications] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getNotifications();
        setNotifications(Array.isArray(data) ? data : []); 
      } catch (err) {
        console.error("Failed to load notifications:", err);
        setError("Failed to load notifications. Please try again later.");
        setNotifications([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async () => {
    if (!selectedId) {
      alert("Please select a notification first");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this notification? This action cannot be undone.")) {
      return;
    }

    setIsLoading(true);
    try {
      await deleteNotification(selectedId);
      setNotifications(prev => prev.filter(n => n.id !== selectedId));
      setSelectedId('');
      alert("Notification deleted successfully!");
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete notification. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden p-6 sm:p-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Delete Notification</h3>
        <p className="text-sm text-gray-500 mt-1">Remove an existing notification</p>
      </div>

      {isLoading && !notifications.length ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-red-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <div className="flex items-center">
            <svg className="h-5 w-5 text-red-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span className="text-red-700">{error}</span>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Notification
                <span className="text-red-500 ml-1">*</span>
              </label>
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
                value={selectedId}
                onChange={(e) => setSelectedId(e.target.value)}
                disabled={isLoading || !notifications.length}
                required
              >
                <option value="" disabled>
                  {notifications.length ? "Select a notification" : "No notifications available"}
                </option>
                {notifications.map(notification => (
                  <option key={notification.id} value={notification.id}>
                    {notification.title} ({new Date(notification.date).toLocaleDateString()})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {selectedId && (
            <>
              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">
                      Warning: This will permanently delete the selected notification.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleDelete}
                  className="px-5 py-2.5 rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-200 disabled:opacity-50"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Deleting...
                    </span>
                  ) : 'Confirm Delete'}
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default DeleteNotification;