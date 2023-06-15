// import React, { useState } from "react";
// import { NavLink } from "react-router-dom";

// function Navbar() {
//   const [showNav, setShowNav] = useState(false)

//   const handleShowNavbar = () => {
//     setShowNav(!showNav)
//   }
//   return (
//     // <div className='navbar'>
//     // <Link to="/" onClick={() => {
//     //     setActive("");
//     //     window.scrollTo(0,0)
//     //     }}>
//     // <h1>Huber Eats</h1>
//     <nav className="navbar">
//       <div className="container">
//         <NavLink to="/">
//           <p>Hubert Eats</p>
//         </NavLink>{" "}
//       </div>
//       <div className="menu-icon" onClick={handleShowNavbar}>
//         <Hamburger/>
//       </div>
//       <div className={`nav-elements ${showNav ? "show" : ""}`}>
//         <ul>
//           <li>
//             <NavLink to="/" activeClassName="active">Home</NavLink>
//           </li>
//           <li>
//             <NavLink to="/recipes" activeClassName="active">Recipes</NavLink>
//           </li>
//           <li>
//             <NavLink to="/menus" activeClassName="active">Menus</NavLink>
//           </li>
//         </ul>
//       </div>

//     </nav>

//     // </Link>
//     // </div>
//   );
// }

// export default Navbar;

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
          <p>Hubert Eats</p>
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
