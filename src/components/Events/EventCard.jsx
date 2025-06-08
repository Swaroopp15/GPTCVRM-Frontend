import React, { useState } from "react";
import { useNavigate } from "react-router";
import { MapPinIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import EventCalender from "../Events/EventCalender";

function EventCard({ event, type }) {
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Handle image URLs safely
  const getImageUrls = () => {
    try {
      if (!event?.images) return ["/placeholder-event.jpg"];
      
      if (type === "facility") {
        return event.images.map(image => {
          try {
            return import.meta.env.VITE_BACKEND + image.replace("\\", "/");
          } catch (error) {
            console.error("Error processing facility image:", error);
            return "/placeholder-event.jpg";
          }
        });
      } else {
        return event.images.length > 0
          ? event.images.map(image => {
              try {
                return import.meta.env.VITE_BACKEND + image;
              } catch (error) {
                console.error("Error processing event image:", error);
                return "/placeholder-event.jpg";
              }
            })
          : ["/placeholder-event.jpg"];
      }
    } catch (error) {
      console.error("Error generating image URLs:", error);
      return ["/placeholder-event.jpg"];
    }
  };

  const images = getImageUrls();

  const nextImage = (e) => {
    e?.stopPropagation();
    setCurrentImage((prev) => (prev + 1) % images.length);
    setImageError(false);
  };

  const prevImage = (e) => {
    e?.stopPropagation();
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
    setImageError(false);
  };

  const handleCardClick = () => {
    if (!event?.id) {
      console.error("Event ID is missing");
      return;
    }
    navigate(`/events/${event.id}`);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  if (!event) {
    return (
      <div className="bg-white rounded-2xl shadow-md overflow-hidden h-full flex flex-col border border-red-100">
        <div className="bg-red-50 h-64 flex items-center justify-center">
          <ExclamationTriangleIcon className="h-12 w-12 text-red-400" />
        </div>
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Event Not Available</h3>
          <p className="text-gray-600 mb-4">The event information could not be loaded.</p>
          <div className="mt-auto pt-4">
            <button 
              className="w-full bg-gray-300 text-gray-600 py-2 px-4 rounded-lg font-medium cursor-not-allowed"
              disabled
            >
              Unavailable
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Gallery */}
      <div className="relative h-64 w-full overflow-hidden">
        {imageError ? (
          <div className="w-full h-full bg-red-50 flex items-center justify-center">
            <ExclamationTriangleIcon className="h-12 w-12 text-red-400" />
            <span className="sr-only">Image failed to load</span>
          </div>
        ) : (
          <img
            src={images[currentImage]}
            alt={event.title || event.name || "Event image"}
            className={`w-full h-full object-cover transition-transform duration-500 ${isHovered ? 'scale-105' : 'scale-100'}`}
            loading="lazy"
            onError={handleImageError}
          />
        )}
        
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
                    setImageError(false);
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
        <h3 className="text-2xl font-bold text-gray-900 mb-3 line-clamp-2">
          {event.title || event.name || "Untitled Event"}
        </h3>
        
        {event.description || event.about ? (
          <p className="text-gray-600 mb-4 line-clamp-3">
            {event.description || event.about}
          </p>
        ) : (
          <p className="text-gray-400 italic mb-4">No description available</p>
        )}
        
        <div className="mt-auto pt-4 border-t border-gray-100">
          {event.event_date && (
            <div className="mb-3">
              <EventCalender event={event} />
            </div>
          )}
        </div>
        
        <button 
          className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed"
          onClick={(e) => {
            e.stopPropagation();
            handleCardClick();
          }}
          disabled={!event?.id}
        >
          {event?.id ? "View Details" : "Unavailable"}
        </button>
      </div>
    </div>
  );
}

export default EventCard;