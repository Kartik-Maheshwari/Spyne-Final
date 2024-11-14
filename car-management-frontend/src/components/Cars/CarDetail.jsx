import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getCar, deleteCar } from "../../api";
import { useAuthContext } from "../../context/AuthContext";

const CarDetail = () => {
  const { id } = useParams();
  const { auth } = useAuthContext();
  const [car, setCar] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCar = async () => {
      const response = await getCar(id, auth.token);
      console.log("Car detail", response.data);
      setCar(response.data);
    };
    fetchCar();
  }, [id, auth.token]);

  const handleDelete = async () => {
    await deleteCar(id, auth.token);
    navigate("/dashboard"); // Redirect after deletion
  };

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  if (!car) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="container mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg max-w-4xl">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="text-blue-500 hover:text-blue-700 mb-4 inline-flex items-center"
      >
        <svg
          className="w-5 h-5 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back
      </button>

      <h2 className="text-4xl font-semibold text-gray-800 mb-6">{car.title}</h2>
      <p className="text-lg text-gray-600 mb-6">{car.description}</p>

      {/* Image Carousel */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {car.images.length > 0 ? (
          car.images.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={image}
                alt={`Car Image ${index}`}
                className="w-full h-64 object-cover rounded-lg shadow-md transition duration-300 hover:scale-105"
              />
            </div>
          ))
        ) : (
          <div className="w-full text-center text-xl text-gray-500">
            No images available
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="mt-6 flex space-x-4 justify-start">
        <Link
          to={`/cars/edit/${car._id}`}
          className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-6 rounded-lg transition duration-200"
        >
          Edit
        </Link>
        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-lg transition duration-200"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default CarDetail;