import { useState } from "react";

const LabCard = ({ lab }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = lab.images.length > 0 ? lab.images.map((image) =>  import.meta.env.VITE_BACKEND + image) : [""];
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
          alt={lab.lab_name}
        />
        {images.length > 1 && (
          <>
            <button onClick={prevImage} className="absolute top-1/2 left-2 bg-gray-800 text-white p-2 rounded-full">◀</button>
            <button onClick={nextImage} className="absolute top-1/2 right-2 bg-gray-800 text-white p-2 rounded-full">▶</button>
          </>
        )}
      </div>
      <div className="flex-1">
        <h3 className="text-2xl font-semibold text-red-700">{lab.lab_name}</h3>
        <p className="text-gray-600 mt-2">{lab.description}</p>
        <p className="text-gray-800 mt-2"><strong>Budget : </strong> {lab.budget || "No Budget Data Available"}</p>
        <p className="text-gray-800 mt-2"><strong>Specifications : </strong> {lab.specifications || "No Specifications data Available"}</p>
        <p className="text-gray-800 mt-2"><strong>Capacity:</strong> {lab.capacity}</p>
        <p className="text-gray-800"><strong>Equipment:</strong> {lab.equipment}</p>
        <p className="text-gray-800 mt-2"><strong>Labs Conducted : </strong> {lab.conducted_labs ? lab.conducted_labs.split(",").map((lab) => <li>{lab}</li> ) : "No Labs available"}</p>
      
      </div>
    </div>
  );
};

export default LabCard;
