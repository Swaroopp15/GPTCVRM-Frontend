const getEvents = async () => {
  try {
    const response = await fetch(import.meta.env.VITE_BACKEND + "events");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error in fetching Events : ", error);
    return error;
  }
};
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
    console.log("newEvent: ", newEvent.get("event_images"));
    
    const response = await fetch(import.meta.env.VITE_BACKEND + "events/" + id, {
      method: "PUT",
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