import React from "react";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import "./Navbar.css"

const Navbar = () => {
  return (
    <nav className="navbar fixed-navbar">
      <div className="navbar-content">
        <div className="navbar-logo">
          <span className="logo-bold">Co</span>
          
          <ScrollLink
              to="hero-container" // debe coincidir con el id del div destino
              smooth={true}
              duration={600}
              offset={-80} // ajusta según el alto del navbar
            >
              <span className="logo-light">Working</span>
            </ScrollLink>
        </div>

        <ul className="navbar-links">
          <li>
            <ScrollLink
              to="hero-container" // debe coincidir con el id del div destino
              smooth={true}
              duration={600}
              offset={-80} // ajusta según el alto del navbar
            >
              Home
            </ScrollLink>
          </li>
          <li>
            <ScrollLink
              to="about-container" // debe coincidir con el id del div destino
              smooth={true}
              duration={600}
              offset={-80} // ajusta según el alto del navbar
            >
              Sobre nosotros
            </ScrollLink>
          </li>
          <li>
            <ScrollLink
              to="features" 
              smooth={true}
              duration={600}
              offset={-80}
            >
              Servicios
            </ScrollLink>
          </li>
          <li>
            <ScrollLink
              to="contact-container" 
              smooth={true}
              duration={600}
              offset={-80}
            >
              Contáctanos
            </ScrollLink>
          </li>
        </ul>
        <div className="navbar-auth">
          <Link to="/Login" className="signin">Iniciar sesión</Link>
          <Link to="/register" className="signup-btn">Registrarse</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;