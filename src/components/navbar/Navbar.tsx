import React from "react";
import "./Navbar.scss";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Logo</div>
      <ul className="navbar-menu">
        <li className="navbar-item">
          <a href="#home">Home</a>
        </li>
        <li className="navbar-item">
          <a href="#about-us">About Me</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
