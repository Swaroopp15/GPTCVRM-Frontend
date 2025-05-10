const getEvents = async () => {};
const addEvent = async (eventData) => {
  try {
    const response = await fetch(import.meta.env.VITE_BACKEND + "events", {
      method: "POST",
      body: eventData,
    });
  } catch (error) {
    console.log("Error in adding new Event : ", error);
    return error;
  }
};
const deleteEvent = async (id) => {
  try {
    const response = await fetch(import.meta.env.VITE_BACKEND + "events/" + id, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
  } catch (error) {
    console.log("Error in deleting Event : ", error);
    return error;
  }
};
const updateEvent = async (id, newEvent) => {
  try {
    const response = await fetch(import.meta.env.VITE_BACKEND + "events/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body:newEvent,
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
  } catch (error) {
    console.log("Error in updating Event : ", error);
    return error;
  }
};

export{
  getEvents,
  addEvent,
  deleteEvent,
  updateEvent
}