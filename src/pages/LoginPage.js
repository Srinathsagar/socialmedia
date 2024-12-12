import React from "react";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const { login } = useAuth();

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div>
        <h1 className="text-2xl font-bold mb-6">Welcome to Vibesnap</h1>
        <button
          onClick={login}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg"
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
