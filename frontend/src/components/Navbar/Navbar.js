import React, { useState } from "react";
import "./Navbar.css"; // Make sure to create a corresponding CSS file for styling

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="navbar">
      {/* Logo Section */}
      <div className="nav-logo">
        <img src="/logo.png" alt="Logo" />
      </div>

      {/* Hamburger Menu */}
      <div className="hamburger" onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      {/* Navigation Links Section */}
      <div className={`nav-links ${isOpen ? "active" : ""}`}>
        <a href="#home">Home</a>
        <a href="#community">Community</a>
        <a href="#events">Events</a>
        <a href="#blogs">Blogs</a>
        <a href="#about">About</a>
        {/* Join Waitlist Section (moved inside nav-links for mobile view) */}
        <div className="nav-join">
          <button>Join Waitlist</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
