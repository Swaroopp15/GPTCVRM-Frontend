import React, { useState, useEffect } from 'react';
import { getEvents, updateEvent } from '../../../../functions/events';
import DepartmentSelector from "../utilities/DepartmentSelector";

function UpdateEvent() {
  const [depo_code, setDepo_code] = useState('');
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [formData, setFormData] = useState({
    event_name: '',
    conducted_by: '',
    description: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (depo_code) {
      setIsLoading(true);
      getEvents(depo_code)
        .then(data => {
          setEvents(data);
          setIsLoading(false);
        })
        .catch(error => {
          console.error("Error fetching events:", error);
          setIsLoading(false);
        });
    }
  }, [depo_code]);

  useEffect(() => {
    if (selectedEvent && events.length > 0) {
      const event = events.find(e => e.id === selectedEvent);
      if (event) {
        setFormData({
          event_name: event.event_name,
          conducted_by: event.conducted_by,
          description: event.description
        });
      }
    }
  }, [selectedEvent, events]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedEvent) {
      alert("Please select an event first");
      return;
    }

    setIsLoading(true);
    try {
      await updateEvent(selectedEvent, formData);
      alert("Event updated successfully!");
    } catch (error) {
      console.error("Error updating event:", error);
      alert("Failed to update event");
    } finally {
      setIsLoading(false);
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Department
              <span className="text-red-500 ml-1">*</span>
            </label>
            <DepartmentSelector name="depo_code" setValue={setDepo_code} required />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Event
              <span className="text-red-500 ml-1">*</span>
            </label>
            <select
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
              disabled={!depo_code || isLoading}
              required
            >
              <option value="" disabled>Select an event</option>
              {events.map(event => (
                <option key={event.id} value={event.id}>
                  {event.event_name}
                </option>
              ))}
            </select>
          </div>

          {selectedEvent && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Name
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  value={formData.event_name}
                  onChange={(e) => setFormData({...formData, event_name: e.target.value})}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Conducted By
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  value={formData.conducted_by}
                  onChange={(e) => setFormData({...formData, conducted_by: e.target.value})}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <textarea
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  required
                ></textarea>
              </div>
            </>
          )}
        </div>

        {selectedEvent && (
          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={() => {
                const event = events.find(e => e.id === selectedEvent);
                setFormData({
                  event_name: event.event_name,
                  conducted_by: event.conducted_by,
                  description: event.description
                });
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
              {isLoading ? 'Updating...' : 'Update Event'}
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default UpdateEvent;