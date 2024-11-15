import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const navigate = useNavigate();
  const baseURL = "https://spyne-assignment-backend.onrender.com/api";
  // const baseURL = "http://localhost:5000/api";

  useEffect(() => {
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth) {
      setAuth(JSON.parse(storedAuth));
    }
  }, []);

  const logout = () => {
    setAuth(null);
    localStorage.removeItem("auth");
    toast.success("Logout successful!");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, logout, baseURL }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => React.useContext(AuthContext);
