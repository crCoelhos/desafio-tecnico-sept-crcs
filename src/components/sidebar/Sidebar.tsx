import React, { useState } from "react";
import "./Sidebar.scss";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : "collapsed"}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        {isOpen ? "Collapse" : "Expand"}
      </button>
      <ul className="sidebar-menu">
        <li className="sidebar-item">
          <span className="sidebar-item-content">Option</span>{" "}
          <span className="badge">1</span>
        </li>
        <li className="sidebar-item">
          <span className="sidebar-item-content">Option</span>{" "}
          <span className="badge">2</span>
        </li>
        <li className="sidebar-item">
          <span className="sidebar-item-content">Option</span>
          <span className="badge">3</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
