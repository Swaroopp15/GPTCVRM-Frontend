import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ArrowLeftIcon, CalendarIcon, MapPinIcon } from '@heroicons/react/24/outline';

function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND}events/${id}/`);
        const data = await response.json();
        setEvent(data);
      } catch (error) {
        console.error("Error fetching event:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const handleImageChange = (index) => {
    setCurrentImage(index);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-700"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Event not found</h2>
          <button 
            onClick={() => navigate('/events')}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  const images = event.images.length > 0 
    ? event.images.map(image => import.meta.env.VITE_BACKEND + image) 
    : ['/placeholder-event.jpg'];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate('/events')}
          className="flex items-center text-red-600 hover:text-red-800 mb-8 transition-colors"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to Events
        </button>

        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="relative h-96 w-full overflow-hidden bg-gray-100">
            <img
              src={images[currentImage]}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            
            {images.length > 1 && (
              <>
                <button
                  onClick={() => handleImageChange((currentImage - 1 + images.length) % images.length)}
                  className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/80 text-red-700 p-2 rounded-full hover:bg-white transition-all shadow-md hover:scale-110"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                <button
                  onClick={() => handleImageChange((currentImage + 1) % images.length)}
                  className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/80 text-red-700 p-2 rounded-full hover:bg-white transition-all shadow-md hover:scale-110"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleImageChange(index)}
                      className={`w-3 h-3 rounded-full ${currentImage === index ? 'bg-white' : 'bg-white/50'}`}
                      aria-label={`View image ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{event.title}</h1>
            
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center text-gray-700">
                <CalendarIcon className="h-5 w-5 mr-2 text-red-600" />
                <span className="font-medium">
                  {new Date(event.event_date).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    weekday: 'long',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
              
              {event.location && (
                <div className="flex items-center text-gray-700">
                  <MapPinIcon className="h-5 w-5 mr-2 text-red-600" />
                  <span>{event.location}</span>
                </div>
              )}
            </div>

            <div className="prose max-w-none text-gray-700 mb-8">
              {event.description.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4">{paragraph}</p>
              ))}
            </div>

            {event.registration_link && (
              <a
                href={event.registration_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
              >
                Register Now
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetails;