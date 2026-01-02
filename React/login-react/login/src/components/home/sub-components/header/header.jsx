import React from "react";
import "./header.css";

export const HomeHeader = () => {
  return (
    <header className="header-container">
      <div className="logo">AIRCNC</div>
      <ul className="nav-list">
        <li className="nav-item">Home</li>
        <li className="nav-item">Destinations</li>
        <li className="nav-item">Packages</li>
        <li className="nav-item">Blog</li>
        <li className="nav-item">About Us</li>
      </ul>
      <div className="search-container">
        <input type="search" placeholder="Search" className="search-input" />
        <button className="search-icon-button">
          <img
            src="src/assets/search.jpg"
            alt="search"
            className="search-icon"
          />
        </button>
      </div>
      <button className="book-now-button">Book Now</button>
    </header>
  );
};
