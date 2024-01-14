import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  useEffect(() => {
    const navbarShrink = () => {
      const navbarCollapsible = document.getElementById("mainNav");
      if (window.scrollY === 0) {
        navbarCollapsible.classList.remove("navbar-shrink");
      } else {
        navbarCollapsible.classList.add("navbar-shrink");
      }
    };

    // Shrink the navbar when page is scrolled
    window.addEventListener("scroll", navbarShrink);
    return () => window.removeEventListener("scroll", navbarShrink);
  }, []);
  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-light fixed-top"
        id="mainNav"
      >
        <div className="container px-4 px-lg-5">
          <NavLink className="navbar-brand m-0" to="/">
            <img
              src="img/logo-pixelmaker.png"
              className="img-logo"
              alt="LOGO"
            />
          </NavLink>
          <div className="d-flex align-items-start">
            <NavLink to="/en" className="btn-eng">Eng</NavLink>
          </div>
          
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded={!isNavCollapsed ? true : false}
            aria-label="Toggle navigation"
            onClick={handleNavCollapse}
          >
            Menu
            <i className="fas fa-bars"></i>
          </button>
          <div
            className={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`}
            id="navbarResponsive"
          >
            <ul className="navbar-nav ms-auto" style={{ fontSize: "16px" }}>
              <li className="nav-item">
                <NavLink className="nav-link font-weight-bold" to="/">
                  Sobre nosotros
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link font-weight-bold" to="/portfolio">
                  Portafolio
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link font-weight-bold" to="/planes">
                  Planes
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link font-weight-bold" to="/contact">
                  Contacto
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
