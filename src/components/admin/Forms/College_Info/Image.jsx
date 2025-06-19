import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../../../../Context/Context";

function UpdateImage() {
  const [selectedImage, setSelectedImage]= useState("");
  const [selectedKey, setSelectedKey] = useState("");
  const [value, setValue] = useState("");
  const {collegeImages} = useContext(Context);
  const handleSubmit = async (e) => {
    try {
      
      e.preventDefault();
      const formData = new FormData();
      formData.append("imageName", selectedImage.image_name);
      formData.append("image", e.target.image.files[0]);
      const response = await fetch(`${import.meta.env.VITE_BACKEND}images/`, {
        method: "PUT",
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        alert("College information updated successfully");
        setValue("");
        setSelectedKey("");
        alert("Please refresh the page to see the changes");
      } else {
        alert("Error updating college information");
      }
    } catch (error) {
      console.log("Error in updating images : ", error);
      
    }
  };

  useEffect(()=>{
    setSelectedImage(collegeImages[selectedKey]);
  },[selectedKey]);
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden p-6 sm:p-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-800">
          Update College Image Information
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-4 gap-6 items-center">
          <label
            htmlFor="name"
            className="block text-md font-medium text-center"
          >
            Select Image To Change
          </label>
          <select
            id="imageName"
            name="imageName"
            onChange={(e) => setSelectedKey(e.target.value)}
            className="w-full px-4 py-3 col-span-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
          >
            <option value="" selected disabled>Select Image</option>
            {collegeImages && collegeImages.map((image, index) => (
              <option key={image.id} value={index} className="capitalize">
                {image.image_name.split("_").join(" ")}
              </option>
            ))}
          </select>
        </div>
          {(selectedKey && selectedImage) && (
        <>
            <div className="grid grid-cols-4 gap-6 items-center">
            <h3
            className="block text-md font-medium text-center"
            >Image to be Replaced</h3>
            <img src={import.meta.env.VITE_BACKEND+selectedImage.image_path} 
            className="w-[50%] px-4 py-3 col-span-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
            />
            </div>
            <div className="grid grid-cols-4 gap-6 items-center">
          <label htmlFor="image" className="block text-md font-medium text-center">
            Faculty Image
          </label>
          <input
            type="file"
            name="image"
            id="image"
            accept="image/*"
            className="w-full text-gray-700 bg-white border border-gray-300 rounded-lg py-2 px-4 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-red-600 file:text-white hover:file:bg-red-700 transition"
          />
        {/* </div> */}
            </div>
        </>
          )}

        <div className="flex justify-end space-x-3 pt-2">
          <button
            type="reset"
            className="px-5 py-2.5 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-200"
          >
            Reset
          </button>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-200 transform hover:-translate-y-0.5"
          >
            Update Image
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateImage;
