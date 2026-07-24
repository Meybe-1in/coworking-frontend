import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { scroller } from "react-scroll";

import "./Navbar.css"

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleScroll = (section) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        scroller.scrollTo(section, {
          smooth: true,
          duration: 600,
          offset: -80,
        });
      }, 100);
    } else {
      scroller.scrollTo(section, {
        smooth: true,
        duration: 600,
        offset: -80,
      });
    }
  };
  return (
    <nav className="navbar fixed-navbar">
      <div className="navbar-content">
        {/* LOGO */}
        <div
          className="navbar-logo"
          onClick={() => handleScroll("hero-container")}
        >
          <span className="logo-bold">Co</span>
          <span className="logo-light">Working</span>
        </div>
        {/* LINKS */}
        <ul className="navbar-links">
          <li onClick={() => handleScroll("hero-container")}>Home</li>
          <li onClick={() => handleScroll("about-container")}>Sobre nosotros</li>
          <li onClick={() => handleScroll("features")}>Servicios</li>
          <li onClick={() => handleScroll("contact-container")}>Contáctanos</li>
        </ul>
        {/* AUTH */}
        <div className="navbar-auth">
          <Link to="/login" className="signin">Iniciar sesión</Link>
          <Link to="/register" className="signup-btn">Registrarse</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;