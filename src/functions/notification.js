const getNotifications = async () => {};
const addNotification = async (notification) => {
  try {
    const response = await fetch(
      import.meta.env.VITE_BACKEND + "notifications",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(notification),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to create notification");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating notification:", error);
    alert("Failed to create notification");
  }
};
const deleteNotification = async () => {};
const updateNotification = async () => {};

export {
  getNotifications,
  addNotification,
  deleteNotification,
  updateNotification,
};
