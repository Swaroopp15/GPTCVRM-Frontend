import React, { useState, useEffect } from 'react';
import { getEvents } from '../../../../functions/events';
import DepartmentSelector from "../utilities/DepartmentSelector";

function ViewEvents() {
  const [depo_code, setDepo_code] = useState('');
  const [events, setEvents] = useState([]);
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

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden p-6 sm:p-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-800">View Events</h3>
        <p className="text-sm text-gray-500 mt-1">Browse all department events</p>
      </div>

      <div className="space-y-6">
        <div className="max-w-md">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Department
            <span className="text-red-500 ml-1">*</span>
          </label>
          <DepartmentSelector name="depo_code" setValue={setDepo_code} required />
        </div>

        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : events.length > 0 ? (
          <div className="space-y-4">
            {events.map(event => (
              <div key={event.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition duration-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-lg text-gray-800">{event.event_name}</h4>
                    <p className="text-sm text-gray-600">Conducted by: {event.conducted_by}</p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {event.depo_code}
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-600">{event.description}</p>
                {event.event_images?.length > 0 && (
                  <div className="mt-3 flex space-x-2 overflow-x-auto">
                    {event.event_images.map((img, index) => (
                      <img 
                        key={index} 
                        src={img} 
                        alt={`Event ${index + 1}`} 
                        className="h-24 w-auto rounded border border-gray-200"
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : depo_code ? (
          <p className="text-center py-8 text-gray-500">No events found for this department</p>
        ) : (
          <p className="text-center py-8 text-gray-500">Please select a department to view events</p>
        )}
      </div>
    </div>
  );
}

export default ViewEvents;