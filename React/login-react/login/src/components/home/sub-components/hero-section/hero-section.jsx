import React from "react";
import "./hero-section.css";

export const HeroSection = () => {
  return (
    <div className="hero-section">
      <img src={"heroImage"} alt="hero" />
      <div className="hero-section-content">
        <h1>WANDERLUST</h1>
        <p>Discover the world's most beautiful destinations</p>
        <button>Plan your trip</button>
        <button>Explore destinations</button>
      </div>
    </div>
  );
};
