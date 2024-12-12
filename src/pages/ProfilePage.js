import React from "react";
import { useAuth } from "../context/AuthContext";

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1>{user?.displayName}</h1>
      <p>{user?.email}</p>
    </div>
  );
};

export default ProfilePage;
