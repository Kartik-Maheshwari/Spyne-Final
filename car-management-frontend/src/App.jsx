import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; // Ensure this import is correct
import Navbar from "./components/Navbar";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import CarList from "./components/Cars/CarList";
import CarForm from "./components/Cars/CarForm";
import CarDetail from "./components/Cars/CarDetail";
import NotFound from "./pages/NotFound";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <AuthProvider>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <h1 className="text-center mt-10">Welcome to Car Management</h1>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<CarList />} />
        <Route path="/cars/new" element={<CarForm />} />
        <Route path="/cars/:id" element={<CarDetail />} />
        <Route path="/cars/edit/:id" element={<CarForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
