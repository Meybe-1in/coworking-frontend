import React from "react";
import "./Contact.css";
import API from "../../api/axiosConfig";

const Contact = () => {
  return (
    <section className="contact-container" id="contact">
      <div className="contact-container">
        <h2 className="contact-title">Contáctanos</h2>

        <div className="contact-content">
          {/* Columna Izquierda: Información */}
          <div className="contact-info">
            <h3 className="contact-heading">Ubicación</h3>
            <p>Nos encontramos en: <strong>San Salvador, El Salvador</strong></p>
            <p>Horarios:<strong> Lunes a sábado: 7:00 a.m. – 8:00 p.m.</strong></p>
            <p>Domingos: <strong>Cerrado</strong></p>

            {/* Mapa */}
            <iframe
              title="map"
              className="contact-map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3876.4744103645183!2d-89.21819132490558!3d13.692940086734881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f6330b4c839d6a5%3A0x9fbb3e2a5ab68c36!2sSan%20Salvador!5e0!3m2!1ses-419!2ssv!4v1698246372904!5m2!1ses-419!2ssv"
              loading="lazy"
            ></iframe>
          </div>

          {/* Columna Derecha: Formulario */}
          <div className="contact-form">
            <h3 className="contact-heading">Escríbenos</h3>
            <form>
              <input type="text" placeholder="Nombre" required />
              <input type="email" placeholder="Correo electrónico" required />
              <textarea placeholder="Mensaje" rows="5" required></textarea>
              <button type="submit" className="contact-button">Enviar mensaje</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
