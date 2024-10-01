import React, { useState } from "react";
import "./Sidebar.scss";
import {
  ArchiveIcon,
  ArrowLeftToLine,
  ArrowRightToLine,
  HomeIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : "collapsed"}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        {isOpen ? (
          <ArrowLeftToLine className="colapse-button" />
        ) : (
          <ArrowRightToLine className="colapse-button" />
        )}
      </button>
      <ul className="sidebar-menu">
        <li className="sidebar-item">
          <Link to={"/"} className="sidebarLink">
            <span className="sidebar-item-content">Home</span>
            <span className="badge">
              <HomeIcon></HomeIcon>
            </span>
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to={"/archived-services"} className="sidebarLink">
            <span className="sidebar-item-content">OS Arquivada</span>{" "}
            <span className="badge">
              <ArchiveIcon></ArchiveIcon>
            </span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
