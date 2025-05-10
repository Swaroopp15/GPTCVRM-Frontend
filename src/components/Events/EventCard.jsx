import React, { useState } from "react";

function EventCard({event}) {
  const [currentImage, setCurrentImage] = useState(0);
  const images = event.images.length > 0 ? event.images.map((image) =>  import.meta.env.VITE_BACKEND + image) : [""];
  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };
  return (
    <div className="w-full bg-white shadow-lg rounded-lg overflow-hidden p-6 flex flex-col md:flex-row gap-4">
    <div className="relative w-full md:w-1/3">
      <img
        className="w-full h-64 object-cover rounded-lg"
        src={images[currentImage]}
        alt={event.title}
      />
      {images.length > 1 && (
        <>
          <button onClick={prevImage} className="absolute top-1/2 left-2 bg-gray-800 text-white p-2 rounded-full">◀</button>
          <button onClick={nextImage} className="absolute top-1/2 right-2 bg-gray-800 text-white p-2 rounded-full">▶</button>
        </>
      )}
    </div>
    <div className="flex-1">
      <h3 className="text-2xl font-semibold text-red-700">{event.title}</h3>
      <p className="text-gray-600 mt-2">{event.description}</p>
      <p className="text-gray-800 mt-2"><strong>On date :</strong> {new Date(event.event_date).toLocaleDateString()}</p>
    </div>
  </div>
  )
}

export default EventCard;
