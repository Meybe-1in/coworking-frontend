import React from "react";
import { FaWifi, FaUsers, FaUserLock, FaBriefcase, FaIdCard, FaCoffee } from "react-icons/fa";
import "./Features.css";

const features = [
  { icon: <FaWifi />, title: "Wi-Fi rápido", desc: "Conéctate sin interrupciones y trabaja con total fluidez." },
  { icon: <FaUsers />, title: "Salas compartidas", desc: "Espacios modernos y climatizados ideales para colaborar." },
  { icon: <FaUserLock />, title: "Salas individuales privadas", desc: "Concentrate en un ambiente cómodo y tranquilo." },
  { icon: <FaBriefcase />, title: "Oficinas para trabajo", desc: "Disfruta un entorno profesional totalmente equipado." },
  { icon: <FaIdCard />, title: "Membresías disponibles", desc: "Elige el plan que mejor se adapte a ti." },
  { icon: <FaCoffee />, title: "Café gratis", desc: "Disfruta una taza mientras trabajas." },
];

const Features = () => {
  return (
    <section className="features" id="features">
      <div className="features-container">
        <h3 className="feature-title">Nuestras ventajas</h3>
        <div className="features-grid">
          {features.map((f, i) => (
            <div key={i} className="feature-card">
              <div className="feature-header">
                <span className="feature-icon">{f.icon}</span>
                <h4>{f.title}</h4>
              </div>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
