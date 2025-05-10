import React, { useState, useEffect } from 'react';
import { getEvents, updateEvent } from '../../../../functions/events';
import DepartmentSelector from "../utilities/DepartmentSelector";

function UpdateEvent() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState('');

  useEffect(() => {
      getEvents()
        .then(data => {
          setEvents(data);
        })
        .catch(error => {
          console.error("Error fetching events:", error);
        });
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedEvent) {
      alert("Please select an event first");
      return;
    }
    try {
      const formData = new FormData();
      const files = e.target.event_images.files;
      formData.append('title', e.target.event_name.value);
      formData.append('date', e.target.date.value);
      formData.append('description', e.target.description.value);
      formData.append('category', 'events');
      formData.append('subfolder', e.target.event_name.value || events.map(event => {if (event.id === selectedEvent) return event.title}));
      for (let i = 0; i < files.length; i++) {
        formData.append("event_images", files[i]);
      }
      await updateEvent(selectedEvent, formData);
      alert("Event updated successfully!");
    } catch (error) {
      console.error("Error updating event:", error);
      alert("Failed to update event");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden p-6 sm:p-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Update Event</h3>
        <p className="text-sm text-gray-500 mt-1">Modify existing event details</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Event
              <span className="text-red-500 ml-1">*</span>
            </label>
            <select
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
            >
              <option value="" disabled>Select an event</option>
              {events.map((event) => (
                <option key={event.id} value={event.id}>
                  {event.title} -{" "}
                  {new Date(event.event_date).toLocaleDateString()}
                </option>
              ))}
            </select>
          </div>

          {selectedEvent && (
            <>
              <div className='md:col-span-2'>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Name
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  name='event_name'
                />
              </div>

              <div className='md:col-span-2'>
                <label className="block text-sm font-medium text-gray-700 mb-2 ">
                  Conducted On (Date)
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  name='date'
                  placeholder="Enter event held date"
                />
              </div>

              <div className='md:col-span-2'>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <textarea
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  name='description'
                  placeholder="Enter event description"
                ></textarea>
              </div>
         <div className="md:col-span-2">
            <label htmlFor="event_images" className="block text-sm font-medium text-gray-700 mb-2">
              Event Photos
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              name="event_images"
              id="event_images"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            <p className="mt-1 text-sm text-gray-500">Upload multiple images of the event</p>
          </div>
            </>
          )}
        </div>

        {selectedEvent && (
          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              className="px-5 py-2.5 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
            >
              Reset
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 transform hover:-translate-y-0.5 disabled:opacity-50"
            >
              Update Event
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default UpdateEvent;