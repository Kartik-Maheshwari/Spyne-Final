import React from "react";
import { Link } from "react-router-dom";

export const SingleCar = ({ car }) => {
  return (
    <div className="flex-none w-full sm:w-1/2 lg:w-1/3 xl:w-1/4">
      {/* Car Card */}
      <div className="border border-gray-200 rounded-lg shadow-lg overflow-hidden">
        {/* Car Image */}
        <img
          src={car.images[0] || "default-image.jpg"}
          alt={car.title}
          className="w-full h-48 object-cover"
        />

        {/* Car Title */}
        <div className="p-4">
          <h3 className="text-xl font-semibold text-gray-800">{car.title}</h3>
          <p className="text-sm text-gray-600 mt-2">
            {car.description.slice(0, 100)}...
          </p>

          {/* View Details Link */}
          <Link
            to={`/cars/${car._id}`}
            className="inline-block mt-4 text-blue-500 hover:text-blue-600 font-semibold"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};
