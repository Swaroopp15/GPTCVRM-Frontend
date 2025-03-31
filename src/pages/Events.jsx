import React, { useEffect, useState } from 'react'
import EventCard from '../components/Events/EventCard'

function Events() {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch(import.meta.env.VITE_BACKEND + "events/");
      const data = await response.json();
      setEvents(data);
    }
    fetchEvents();
  }
  , []);
  return (
    <div className="container mx-auto p-4 mt-20">
      <h2 className=" font-bold mb-4 text-center text-red-700 text-3xl">Events:</h2>
      {events.length > 0 ? (
        <div className="grid gap-6">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <p className="text-center">No labs available.</p>
      )}
    </div>
  )
}

export default Events