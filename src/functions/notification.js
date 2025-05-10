const getNotifications = async () => {
  try {
    const response = await fetch(
      import.meta.env.VITE_BACKEND + "notifications"
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return [];
  }
};
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
const deleteNotification = async (id) => {
  try {
    const response = await fetch(
      import.meta.env.VITE_BACKEND + "notifications/"+id, {
        method: "DELETE"
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return [];
  }
};
const updateNotification = async (id, newNotification) => {
  try {
    const response = await fetch(
      import.meta.env.VITE_BACKEND + "notifications/"+id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newNotification),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to update notification");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating notification:", error);
    alert("Failed to update notification");
  }
};

export {
  getNotifications,
  addNotification,
  deleteNotification,
  updateNotification,
};
