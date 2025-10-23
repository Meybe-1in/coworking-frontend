import React from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaFacebookF, FaInstagram } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* UBICACIÓN */}
        <div className="footer-section">
          <h3>Ubicación</h3>
          <p><FaMapMarkerAlt className="footer-icon" /> San Salvador, El Salvador</p>
          <p>Av. Las Magnolias #123</p>
        </div>

        {/* CONTACTO */}
        <div className="footer-section">
          <h3>Contáctanos</h3>
          <p><FaPhoneAlt className="footer-icon" /> +503 1234-5678</p>
          <p><FaEnvelope className="footer-icon" /> coworking@email.com</p>
          <div className="footer-socials">
            <a href="#" aria-label="Facebook"><FaFacebookF /></a>
            <a href="#" aria-label="Instagram"><FaInstagram /></a>
          </div>
        </div>

        {/* LEGALES */}
        <div className="footer-section">
          <h3>Legales</h3>
          <p><a href="/terms">Términos y Condiciones</a></p>
          <p><a href="/privacy">Política de Privacidad</a></p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} CoWorking. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
