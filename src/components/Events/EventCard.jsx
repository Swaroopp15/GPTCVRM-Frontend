import React, { useState } from "react";
import { useNavigate } from "react-router";
import { CalendarIcon, MapPinIcon } from '@heroicons/react/24/outline';

function EventCard({ event }) {
  const navigate = useNavigate();
  const images =
    event.images.length > 0
      ? event.images.map((image) => import.meta.env.VITE_BACKEND + image)
      : ["/placeholder-event.jpg"];

  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleCardClick = () => {
    navigate(`/events/${event.id}`);
  };

  return (
    <div 
      className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col cursor-pointer"
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Gallery */}
      <div className="relative h-64 w-full overflow-hidden">
        <img
          src={images[currentImage]}
          alt={event.title}
          className={`w-full h-full object-cover transition-transform duration-500 ${isHovered ? 'scale-105' : 'scale-100'}`}
          loading="lazy"
        />
        
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className={`absolute top-1/2 left-4 -translate-y-1/2 bg-white/80 text-red-700 p-2 rounded-full hover:bg-white transition-all shadow-md ${isHovered ? 'opacity-100' : 'opacity-0'} focus:opacity-100`}
              aria-label="Previous Image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            <button
              onClick={nextImage}
              className={`absolute top-1/2 right-4 -translate-y-1/2 bg-white/80 text-red-700 p-2 rounded-full hover:bg-white transition-all shadow-md ${isHovered ? 'opacity-100' : 'opacity-0'} focus:opacity-100`}
              aria-label="Next Image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            <div className={`absolute bottom-4 left-0 right-0 flex justify-center space-x-2 transition-opacity ${isHovered ? 'opacity-100' : 'opacity-0'} focus-within:opacity-100`}>
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImage(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${currentImage === index ? 'bg-white w-4' : 'bg-white/50'}`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-2xl font-bold text-gray-900 mb-3 line-clamp-2">{event.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{event.description}</p>
        
        <div className="mt-auto pt-4 border-t border-gray-100">
          <div className="flex items-center text-gray-700 mb-2">
            <CalendarIcon className="h-5 w-5 mr-2 text-red-600 flex-shrink-0" />
            <span className="font-medium truncate">
              {new Date(event.event_date).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </div>
          
          {event.location && (
            <div className="flex items-center text-gray-700">
              <MapPinIcon className="h-5 w-5 mr-2 text-red-600 flex-shrink-0" />
              <span className="truncate">{event.location}</span>
            </div>
          )}
        </div>
        
        <button 
          className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-300"
          onClick={(e) => {
            e.stopPropagation();
            handleCardClick();
          }}
        >
          View Details
        </button>
      </div>
    </div>
  );
}

export default EventCard;