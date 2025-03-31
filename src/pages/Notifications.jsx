import { useState, useEffect } from "react";
import { useParams } from "react-router";

const Notifications = () => {
  const { admin } = useParams();
  const [isAdmin, setIsAdmin] = useState(false);
  const [newNotification, setNewNotification] = useState({
    title: "",
    link: "",
    date: ""
  });
  const [notifications, setNotifications] = useState([
    { title: "Alert Students! Exam Results are announced (C-20)", link: "https://sbtet.ap.gov.in/APSBTET/gradeWiseResults.do", date: "December 24, 2024 - 10:00 AM" },
    { title: "New event: Annual Day", date: "March 30, 2025 - 10:00 AM" },
    { title: "Semester Exams Scheduled for Final Year Students", date: "April 03-20, 2025" },
    { title: "Library Timings Updated", date: "8:30 AM - 3:30 PM (Monday-Saturday)" }
  ]);

  useEffect(() => {
    setIsAdmin(admin === "admin");
  }, [admin]);

  const addNotification = (e) => {
    e.preventDefault();
    if (newNotification.title && newNotification.date) {
      setNotifications([newNotification, ...notifications]);
      setNewNotification({ title: "", link: "", date: "" });
    }
  };

  const deleteNotification = (index) => {
    setNotifications(notifications.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {isAdmin ? (
        <>
          <h1 className="text-3xl font-bold text-red-700 mb-6">Admin Notifications Panel</h1>
          <form onSubmit={addNotification} className="space-y-4 bg-white shadow-md rounded-xl p-6 border border-gray-300">
            <div>
              <label className="block text-gray-700 font-semibold">Notification Title</label>
              <input type="text" value={newNotification.title} onChange={(e) => setNewNotification({...newNotification, title: e.target.value})} className="w-full border p-2 rounded-md" required />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold">Notification Link (Optional)</label>
              <input type="url" value={newNotification.link} onChange={(e) => setNewNotification({...newNotification, link: e.target.value})} className="w-full border p-2 rounded-md" />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold">Date & Time</label>
              <input type="datetime-local" value={newNotification.date} onChange={(e) => setNewNotification({...newNotification, date: e.target.value})} className="w-full border p-2 rounded-md" required />
            </div>
            <button type="submit" className="bg-red-700 text-white py-2 px-4 rounded-md hover:bg-red-800">Add Notification</button>
          </form>
          <h2 className="text-2xl font-bold text-red-700 mt-8">Existing Notifications</h2>
          <div className="space-y-4 mt-4">
            {notifications.map((notification, i) => (
              <div key={i} className="bg-white shadow-md rounded-xl p-5 border-l-4 border-red-700 flex justify-between items-center">
                <div>
                  {notification.link ? (
                    <a href={notification.link} target="_blank" rel="noopener noreferrer" className="text-lg text-gray-800 font-semibold hover:text-red-700">
                      {notification.title}
                    </a>
                  ) : (
                    <p className="text-lg text-gray-800 font-semibold">{notification.title}</p>
                  )}
                  <p className="text-gray-600 text-sm mt-1">{notification.date}</p>
                </div>
                <button onClick={() => deleteNotification(i)} className="bg-red-700 text-white px-3 py-1 rounded-md hover:bg-red-700">Delete</button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <h1 className="text-3xl font-bold text-red-700 mb-6 flex items-center">
            Notifications
          </h1>
          <div className="space-y-4">
            {notifications.map((notification, i) => (
              <div key={i} className="bg-white shadow-md rounded-xl p-5 border-l-4 border-red-700">
                {notification.link ? (
                  <a href={notification.link} target="_blank" rel="noopener noreferrer" className="text-lg text-gray-800 font-semibold hover:text-red-700">
                    {notification.title}
                  </a>
                ) : (
                  <p className="text-lg text-gray-800 font-semibold">{notification.title}</p>
                )}
                <p className="text-gray-600 text-sm mt-1">{notification.date}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Notifications;
