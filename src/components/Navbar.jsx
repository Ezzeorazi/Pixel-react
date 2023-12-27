import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-light fixed-top"
        id="mainNav"
      >
        <div className="container px-4 px-lg-5">
          <NavLink className="navbar-brand" to="/">
            <img
              src="img/logo-pixelmaker.png"
              className="img-logo"
              alt="LOGO"
            />
          </NavLink>
          <button
            className="navbar-toggler navbar-toggler-right"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            Menu
            <i className="fas fa-bars"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav ms-auto" style={{ fontSize: '16px' }}>
              <li className="nav-item">
                <NavLink className="nav-link font-weight-bold" to="/">
                  Sobre nosotros
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link font-weight-bold" to="/portfolio">
                  Portfolio
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
