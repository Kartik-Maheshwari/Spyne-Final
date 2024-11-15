import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const CarForm = () => {
  const { auth, baseURL } = useAuthContext();
  const navigate = useNavigate();
  const { id } = useParams(); // Get car ID from URL if editing

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]); // Store URLs of existing images

  // Fetch existing car data if in edit mode
  useEffect(() => {
    if (id) {
      const fetchCar = async () => {
        const response = await axios.get(`${baseURL}/cars/${id}`, {
          headers: { Authorization: `Bearer ${auth.token}` },
        });
        const car = response.data;
        console.log("Car:", car.images);

        setTitle(car.title);
        setDescription(car.description);
        setTags(car.tags.join(", ")); // Convert tags to a comma-separated string
        setExistingImages(car.images); // Set existing images if any
      };
      fetchCar();
    }
  }, [id, auth.token]);

  // Handle image removal
  const handleImageRemove = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  // Handle new image selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("tags", tags.split(","));

    // Append new images only if any are selected
    if (images.length > 0) {
      images.forEach((image) => {
        formData.append("images", image);
      });
    }

    // Append existing images as part of the form data (if any)
    if (existingImages.length > 0) {
      formData.append("existingImages", JSON.stringify(existingImages));
    }

    // Send request to backend
    if (id) {
      await updateCar(id, formData, auth.token); // Call updateCar API
    } else {
      await createCar(formData, auth.token); // Call createCar API for new cars
    }

    navigate("/dashboard"); // Redirect after submission
  };

  const createCar = async (formData, token) => {
    try {
      const response = await axios.post(`${baseURL}/cars`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Car created successfully:", response.data);
      return response.data; // Return response data for further use
    } catch (error) {
      console.error("Error creating car:", error);
      throw new Error("Failed to create car");
    }
  };

  // Function to handle car update
  const updateCar = async (id, formData, token) => {
    try {
      const response = await axios.put(`${baseURL}/cars/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Car updated successfully:", response.data);
      return response.data; // Return response data for further use
    } catch (error) {
      console.error("Error updating car:", error);
      throw new Error("Failed to update car");
    }
  };

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-gray-50 p-6 rounded-lg shadow-lg">
      <button
        onClick={handleBack}
        className="text-blue-600 hover:text-blue-800 mb-4"
      >
        &larr; Back
      </button>
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">
        {id ? "Edit Car" : "Add New Car"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="title"
            className="block text-lg font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            placeholder="Car title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-lg font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            placeholder="Car description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="tags"
            className="block text-lg font-medium text-gray-700"
          >
            Tags (comma separated)
          </label>
          <input
            type="text"
            id="tags"
            placeholder="e.g. SUV, sports"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Display existing images */}
        {existingImages.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mt-4">
            {existingImages.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image}
                  alt={`Existing car ${index}`}
                  className="h-20 w-20 object-cover rounded-lg shadow-sm"
                />
                <button
                  type="button"
                  onClick={() =>
                    setExistingImages(
                      existingImages.filter((_, i) => i !== index)
                    )
                  }
                  className="absolute top-0 right-0 text-white bg-red-500 rounded-full p-1"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Real-time image preview */}
        <div className="flex flex-wrap gap-4 mt-4">
          {images.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={URL.createObjectURL(image)}
                alt={`Preview ${index}`}
                className="h-20 w-20 object-cover rounded-lg shadow-sm"
              />
              <button
                type="button"
                onClick={() => handleImageRemove(index)}
                className="absolute top-0 right-0 text-white bg-red-500 rounded-full p-1"
              >
                &times;
              </button>
            </div>
          ))}
          <label
            htmlFor="image-upload"
            className="w-20 h-20 flex justify-center items-center bg-gray-200 rounded-lg cursor-pointer shadow-md hover:bg-gray-300"
          >
            <span className="text-xl text-gray-600">+</span>
          </label>
          <input
            id="image-upload"
            type="file"
            multiple
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg hover:bg-blue-700 transition duration-200"
        >
          {id ? "Update Car" : "Add Car"}
        </button>
      </form>
    </div>
  );
};

export default CarForm;
