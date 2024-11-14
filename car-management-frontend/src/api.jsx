import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // Update with your backend URL
});

export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);
export const createCar = (data, token) =>
  API.post("/cars", data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
export const listCars = (token) =>
  API.get("/cars", { headers: { Authorization: `Bearer ${token}` } });
export const getCar = (id, token) =>
  API.get(`/cars/${id}`, { headers: { Authorization: `Bearer ${token}` } });
export const updateCar = (id, data, token) =>
  API.put(`/cars/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const deleteCar = (id, token) =>
  API.delete(`/cars/${id}`, { headers: { Authorization: `Bearer ${token}` } });
