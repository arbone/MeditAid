import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css"; // Assicurati di avere questo file di stile

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="navbar-logo">The Meditation App</span>
      </div>
      <div className="navbar-right">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/timer" className="nav-link">Timer</Link>
      </div>
    </nav>
  );
};

export default Navbar;