import React, { useEffect, useState } from "react";
import EventCard from "../components/Events/EventCard";
import Footer from "../pages/Footer";

function Events() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_BACKEND + "events/");
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="container mx-auto px-4 sm:px-6 py-20 flex-grow">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-red-700 mb-4">
            Upcoming Events
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our exciting events and join us for unforgettable experiences
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-700"></div>
          </div>
        ) : events.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-xl">
              No events available at the moment. Please check back later!
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default Events;