import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getNotifications } from "../functions/notification";
import Spinner from "../components/hero/Spinner";
import Footer from "./Footer";
import GoToTop from "../components/hero/GoToTop";

const NotificationItem = ({ notification, i, onDelete, isAdmin }) => {
  return (
    <div
      key={i}
      className={`bg-white shadow-md hover:shadow-lg rounded-xl p-5 border-l-4 border-red-700 transition-all duration-300`}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          {notification.link ? (
            <a
              href={notification.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg text-gray-800 font-semibold hover:text-red-700 transition-colors underline underline-offset-4 decoration-1 hover:decoration-2"
            >
              {notification.title}
            </a>
          ) : (
            <p className="text-lg text-gray-800 font-semibold">
              {notification.title}
            </p>
          )}
          <p className="text-gray-600 text-sm mt-1">
            {new Date(notification.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
        {isAdmin && (
          <button
            onClick={() => onDelete(i)}
            className="ml-4 text-red-700 hover:text-red-800 transition-colors"
            aria-label={`Delete notification: ${notification.title}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

const Notifications = () => {
  const { admin } = useParams();
  const [isAdmin, setIsAdmin] = useState(false);
  const [newNotification, setNewNotification] = useState({
    title: "",
    link: "",
    date: "",
  });
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setIsLoading(true);
        const data = await getNotifications();
        setNotifications(data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch notifications:", err);
        setError("Failed to load notifications. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  useEffect(() => {
    setIsAdmin(admin === "admin");
  }, [admin]);

  const addNotification = async (e) => {
    e.preventDefault();
    setError(null);
    
    if (!newNotification.title || !newNotification.date) {
      setError("Title and date are required");
      return;
    }

    try {
      const notificationWithId = {
        ...newNotification,
        id: Date.now().toString(),
      };
      
      setNotifications([notificationWithId, ...notifications]);
      setNewNotification({ title: "", link: "", date: "" });
      setSuccessMessage("Notification added successfully!");
      
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error("Failed to add notification:", err);
      setError("Failed to add notification. Please try again.");
    }
  };

  const deleteNotification = async (index) => {
    try {
      const newNotifications = [...notifications];
      newNotifications.splice(index, 1);
      setNotifications(newNotifications);
      setSuccessMessage("Notification deleted successfully!");
      
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error("Failed to delete notification:", err);
      setError("Failed to delete notification. Please try again.");
    }
  };

  return (
    <div>
      <div className="max-w-4xl mx-auto p-4 md:p-6 min-h-screen">
        {isAdmin ? (
          <>
            <h1 className="text-2xl md:text-3xl font-bold text-red-700 mb-6">
              Admin Notifications Panel
            </h1>
            
            {error && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
                <p>{error}</p>
              </div>
            )}
            
            {successMessage && (
              <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded">
                <p>{successMessage}</p>
              </div>
            )}

            <form
              onSubmit={addNotification}
              className="space-y-4 bg-white shadow-md rounded-xl p-4 md:p-6 border border-gray-300 mb-8"
            >
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Notification Title *
                </label>
                <input
                  type="text"
                  value={newNotification.title}
                  onChange={(e) =>
                    setNewNotification({
                      ...newNotification,
                      title: e.target.value,
                    })
                  }
                  className="w-full border p-2 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter notification title"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Notification Link (Optional)
                </label>
                <input
                  type="url"
                  value={newNotification.link}
                  onChange={(e) =>
                    setNewNotification({
                      ...newNotification,
                      link: e.target.value,
                    })
                  }
                  className="w-full border p-2 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="https://example.com"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Date & Time *
                </label>
                <input
                  type="datetime-local"
                  value={newNotification.date}
                  onChange={(e) =>
                    setNewNotification({
                      ...newNotification,
                      date: e.target.value,
                    })
                  }
                  className="w-full border p-2 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-red-700 hover:bg-red-800 text-white py-2 px-6 rounded-md transition-colors duration-300 flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Add Notification
                </button>
              </div>
            </form>

            <h2 className="text-xl md:text-2xl font-bold text-red-700 mt-8 mb-4">
              Existing Notifications
            </h2>
            
            {isLoading ? (
              <div className="flex justify-center items-center h-32">
                <Spinner />
              </div>
            ) : notifications.length === 0 ? (
              <div className="bg-gray-100 rounded-xl p-6 text-center">
                <p className="text-gray-600">No notifications found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {notifications.map((notification, i) => (
                  <NotificationItem
                    key={notification.id || i}
                    notification={notification}
                    i={i}
                    onDelete={deleteNotification}
                    isAdmin={isAdmin}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <>
            <h1 className="text-2xl md:text-3xl font-bold text-red-700 mb-6">
              Notifications
            </h1>
            
            {error && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
                <p>{error}</p>
              </div>
            )}

            {isLoading ? (
              <div className="flex justify-center items-center h-32">
                <Spinner />
              </div>
            ) : notifications.length === 0 ? (
              <div className="bg-gray-100 rounded-xl p-6 text-center">
                <p className="text-gray-600">No notifications available</p>
              </div>
            ) : (
              <div className="space-y-4">
                {notifications.map((notification, i) => (
                  <NotificationItem
                    key={notification.id || i}
                    notification={notification}
                    i={i}
                    isAdmin={isAdmin}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
      <Footer/>
      <GoToTop />
    </div>
  );
};

export default Notifications;