import React, { useEffect, useState } from "react";
import Footer from "../pages/Footer";
import EventCard from "../components/Events/EventCard";

function Facilities() {
  const [facilities, setfacilities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchfacilities = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_BACKEND + "facility/");
        const data = await response.json();
        setfacilities(data);
      } catch (error) {
        console.error("Error fetching facilities:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchfacilities();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="container mx-auto px-4 sm:px-6 py-20 flex-grow">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-red-700 mb-4">
            Our facilities
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our exciting facilities and join us for unforgettable experiences
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-700"></div>
          </div>
        ) : facilities.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            {facilities.map((event) => {
              if (!event) return
              return <EventCard key={event.id} event={event} type={"facility"} />
})}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-xl">
              No facilities available at the moment. Please check back later!
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default Facilities;