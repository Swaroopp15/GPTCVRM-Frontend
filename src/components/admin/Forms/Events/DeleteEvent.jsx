import React, { useEffect } from "react";
import { deleteEvent, getEvents } from "../../../../functions/events";

function DeleteEvent() {
  const [events, setEvents] = React.useState([]);
  const [selectedEvent, setSelectedEvent] = React.useState("");
  useEffect(() => {
    getEvents()
      .then((data) => {
        setEvents(data);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden p-6 sm:p-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Delete Event</h3>
        <p className="text-sm text-gray-500 mt-1">Delete existing event</p>
      </div>

      <form
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          if (!selectedEvent) {
            alert("Please select an event first");
            return;
          }
          deleteEvent(selectedEvent)
            .then(() => {
              alert("Event deleted successfully!");
              setSelectedEvent("");
              setEvents(events.filter((event) => event.id !== selectedEvent));
            })
            .catch((error) => {
              console.error("Error deleting event:", error);
              alert("Failed to delete event");
            });
        }}
      >
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Event
              <span className="text-red-500 ml-1">*</span>
            </label>
            <select
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
              required
            >
              <option value="" disabled>
                Select an event
              </option>
              {events.map((event) => (
                <option key={event.id} value={event.id}>
                  {event.title} -{" "}
                  {new Date(event.event_date).toLocaleDateString()}
                </option>
              ))}
            </select>
          </div>
        </div>

        {selectedEvent && (
          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              className="px-5 py-2.5 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-200"
            >
              Reset
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-200 transform hover:-translate-y-0.5 disabled:opacity-50"
            >
              {"Delete Event"}
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default DeleteEvent;
