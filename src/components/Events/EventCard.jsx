import React, { useState } from "react";

function EventCard({ event }) {
  const images =
    event.images.length > 0
      ? event.images.map((image) => import.meta.env.VITE_BACKEND + image)
      : [""];

  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col md:flex-row gap-6 p-6">
      <div className="relative w-full md:w-1/3 rounded-lg overflow-hidden shadow-md">
        <img
          src={images[currentImage]}
          alt={event.title}
          className="w-full h-64 object-cover rounded-lg"
          loading="lazy"
        />
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute top-1/2 left-3 -translate-y-1/2 bg-red-700 text-white p-2 rounded-full hover:bg-red-800 transition-colors"
              aria-label="Previous Image"
            >
              ◀
            </button>
            <button
              onClick={nextImage}
              className="absolute top-1/2 right-3 -translate-y-1/2 bg-red-700 text-white p-2 rounded-full hover:bg-red-800 transition-colors"
              aria-label="Next Image"
            >
              ▶
            </button>
          </>
        )}
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <h3 className="text-3xl font-bold text-red-700 mb-3">{event.title}</h3>
        <p className="text-gray-700 mb-4 line-clamp-4">{event.description}</p>
        <p className="text-gray-900 font-semibold">
          <span className="text-gray-600 font-normal">On date: </span>
          {new Date(event.event_date).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
    </div>
  );
}

export default EventCard;
