import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { auth, logout } = useAuthContext();

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between">
        <Link to="/" className="text-white text-lg">
          Car Management
        </Link>
        <div>
          {auth ? (
            <>
              <Link to="/dashboard" className="text-white mx-2">
                Dashboard
              </Link>
              <button onClick={logout} className="text-white">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white mx-2">
                Login
              </Link>
              <Link to="/signup" className="text-white mx-2">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
