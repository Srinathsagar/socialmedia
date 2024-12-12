import React from "react";
import Navbar from "../components/Shared/Navbar";
import Feed from "../components/Feed/Feed";

const HomePage = () => {
  console.log("HomePage: Rendering home page.");

  return (
    <div>
      {/* Navigation bar at the top */}
      <Navbar />

      {/* Main feed section */}
      <main className="container mx-auto p-4">
        <Feed />
      </main>
    </div>
  );
};

export default HomePage;
