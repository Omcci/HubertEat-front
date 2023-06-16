import React, { useState } from "react";
import { NavLink } from "react-router-dom";
// import { ReactComponent as Hamburger } from "../../assets/icons/hamburger.svg";
// import { ReactComponent as Brand } from "../../assets/icons/logo.svg";
// import "./navbar.css";

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <NavLink to="/">
            <h1>Hubert Eats</h1>
          </NavLink>
        </div>
        <div className="menu-icon" onClick={handleShowNavbar}>
          <span></span>
          <span></span>
          <span></span>{" "}
        </div>
        <div className={`nav-elements  ${showNavbar && "active"}`}>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            {/* <li>
              <NavLink to="/recipes">Recipes</NavLink>
            </li> */}
            <li>
              <NavLink to="/menus">Menus</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
