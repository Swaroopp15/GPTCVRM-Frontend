import React, { useEffect, useState } from "react";
import EventCard from "../components/Events/EventCard";
import Footer from "../pages/Footer";

function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch(import.meta.env.VITE_BACKEND + "events/");
      const data = await response.json();
      setEvents(data);
    };
    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="container mx-auto p-6 mt-20 flex-grow">
        <h2 className="text-center text-red-700 text-4xl font-extrabold mb-8 drop-shadow-md">
          Events
        </h2>

        {events.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-lg mt-10">
            No events available at the moment.
          </p>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default Events;
