import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ArrowLeftIcon, CalendarIcon, MapPinIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import Spinner from "../hero/Spinner";

function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`${import.meta.env.VITE_BACKEND}events/${id}/`);

        if (!response.ok) {
          throw new Error(response.status === 404
            ? 'Event not found'
            : `Failed to load event (Status: ${response.status})`);
        }

        const data = await response.json();
        if (!data) throw new Error('No data received from server');

        setEvent(data);
      } catch (err) {
        console.error("Error fetching event:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleImageChange = (index) => {
    setCurrentImage(index);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const getSafeImages = () => {
    try {
      if (!event?.images || event.images.length === 0) return ['/placeholder-event.jpg'];
      return event.images.map(image => import.meta.env.VITE_BACKEND + image);
    } catch {
      return ['/placeholder-event.jpg'];
    }
  };

  const formatEventDate = () => {
    try {
      if (!event.event_date) return 'Date not specified';
      const date = new Date(event.event_date);
      if (isNaN(date.getTime())) return 'Invalid date';
      return date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return 'Date not available';
    }
  };

  const images = getSafeImages();

  if (isLoading) {
    return (
      <Spinner/>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md text-center">
          <ExclamationTriangleIcon className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{error || 'Event not available'}</h2>
          <p className="text-gray-600 mb-6">We couldn't load the event details. Please try again later.</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => navigate('/events')}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Back to Events
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate('/events')}
          className="flex items-center text-red-600 hover:text-red-800 mb-8 transition-colors group"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Events
        </button>

        <div className="bg-white shadow-xl rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Image Gallery (Left) */}
          <div className="relative h-96 lg:h-full w-full bg-gray-100">
            {imageError ? (
              <div className="w-full h-full flex flex-col items-center justify-center bg-red-50 text-red-600">
                <ExclamationTriangleIcon className="h-12 w-12 mb-4" />
                <p>Image failed to load</p>
              </div>
            ) : (
              <img
                src={images[currentImage]}
                alt={event.title || 'Event image'}
                className="w-full h-full object-cover"
                onError={handleImageError}
                loading="lazy"
              />
            )}
            {images.length > 1 && (
              <>
                <button
                  onClick={() => handleImageChange((currentImage - 1 + images.length) % images.length)}
                  className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/80 text-red-700 p-2 rounded-full hover:bg-white transition-all shadow-md hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-600"
                  aria-label="Previous image"
                >
                  &lt;
                </button>
                <button
                  onClick={() => handleImageChange((currentImage + 1) % images.length)}
                  className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/80 text-red-700 p-2 rounded-full hover:bg-white transition-all shadow-md hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-600"
                  aria-label="Next image"
                >
                  &gt;
                </button>
                <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleImageChange(index)}
                      className={`w-3 h-3 rounded-full transition-all ${currentImage === index ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/70'}`}
                      aria-label={`View image ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Content (Right) */}
          <div className="p-6 md:p-8 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {event.title || 'Untitled Event'}
              </h1>

              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center text-gray-700 bg-gray-50 px-3 py-2 rounded-lg">
                  <CalendarIcon className="h-5 w-5 mr-2 text-red-600" />
                  <span className="font-medium">{formatEventDate()}</span>
                </div>

              </div>

              <div className="prose max-w-none text-gray-700 mb-8">
                {event.description ? (
                  event.description.split('\n').map((p, i) => <p key={i} className="mb-4">{p}</p>)
                ) : (
                  <p className="text-gray-500 italic">No description provided.</p>
                )}
              </div>
            </div>

            {event.registration_link ? (
              <div className="flex flex-wrap gap-4">
                <a
                  href={event.registration_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
                >
                  Register Now
                </a>
                <button
                  onClick={() => navigator.clipboard.writeText(event.registration_link).then(() => alert('Link copied to clipboard!'))}
                  className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Copy Link
                </button>
              </div>
            ) : (
              <p className="text-gray-500 italic">No registration link available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetails;
