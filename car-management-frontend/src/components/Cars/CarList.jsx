import React, { useEffect, useState } from "react";
import { listCars } from "../../api";
import { useAuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { SingleCar } from "./SingleCar";

const CarList = () => {
  const { auth } = useAuthContext();
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCars, setFilteredCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      const response = await listCars(auth.token);
      setCars(response.data);
      setFilteredCars(response.data); // Initialize filteredCars with all cars
    };
    fetchCars();
  }, [auth.token]);

  useEffect(() => {
    // Filter cars based on search term
    const results = cars.filter(
      (car) =>
        car.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (car.tags &&
          car.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          ))
    );
    setFilteredCars(results);
  }, [searchTerm, cars]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold text-gray-800">My Cars</h1>

      <Link
        to="/cars/new"
        className="bg-blue-500 text-white px-6 py-2 rounded-lg mt-6 inline-block font-semibold hover:bg-blue-600 transition duration-200"
      >
        Add New Car
      </Link>
      <div className="mt-4 mb-6 max-w-xl">
        <input
          type="text"
          placeholder="Search Cars..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Car List using Flex */}
      <div className="flex flex-wrap gap-8 justify-start">
        {filteredCars.length === 0 ? (
          <div className="w-full text-center text-xl text-gray-500">
            No cars found
          </div>
        ) : (
          filteredCars.map((car) => <SingleCar key={car._id} car={car} />)
        )}
      </div>
    </div>
  );
};

export default CarList;
