import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <div className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Vibesnap</h1>
      <div>
        {user ? (
          <>
            <Link to="/profile" className="mr-4 text-blue-500">
              Profile
            </Link>
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/" className="text-blue-500">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
