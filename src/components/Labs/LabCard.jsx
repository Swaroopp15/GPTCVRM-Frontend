import { motion } from "framer-motion";
import { useState } from "react";

const LabCard = ({ lab, index }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = lab.images.length > 0 ? lab.images.map((image) => import.meta.env.VITE_BACKEND + image) : [""];
  
  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="w-full bg-white shadow-xl rounded-2xl overflow-hidden flex flex-col md:flex-row"
    >
      <div className="relative w-full md:w-2/5 h-64 md:h-auto">
        <img
          className="w-full h-full object-cover"
          src={images[currentImage]}
          alt={lab.lab_name}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://via.placeholder.com/800x500?text=Lab+Image";
          }}
        />
        {images.length > 1 && (
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImage(idx)}
                className={`w-3 h-3 rounded-full ${currentImage === idx ? 'bg-red-600' : 'bg-white bg-opacity-50'}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <div className="flex space-x-2">
            <button 
              onClick={prevImage}
              className="p-2 bg-white/80 rounded-full text-gray-800 hover:bg-white transition-colors"
              aria-label="Previous image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            <button 
              onClick={nextImage}
              className="p-2 bg-white/80 rounded-full text-gray-800 hover:bg-white transition-colors"
              aria-label="Next image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <div className="w-full md:w-3/5 p-6 md:p-8">
        <h3 className="text-2xl font-bold text-red-700 mb-3">{lab.lab_name}</h3>
        
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Description</h4>
            <p className="text-gray-700 mt-1">{lab.description || "No description available"}</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Budget</h4>
              <p className="text-gray-700 mt-1">{lab.budget || "Not specified"}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Capacity</h4>
              <p className="text-gray-700 mt-1">{lab.capacity || "Not specified"}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Equipment</h4>
              <p className="text-gray-700 mt-1">{lab.equipment || "Not specified"}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Specifications</h4>
              <p className="text-gray-700 mt-1">{lab.specifications || "Not specified"}</p>
            </div>
          </div>
          
          {lab.conducted_labs && (
            <div>
              <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Labs Conducted</h4>
              <ul className="mt-2 space-y-1">
                {lab.conducted_labs.split(",").map((conductedLab, idx) => (
                  <li key={idx} className="flex items-start">
                    <svg className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-700">{conductedLab.trim()}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default LabCard;