import React from "react";
import { useNavigate } from "react-router-dom";
import "./HeroSection.css";
import HeroImg from "../../assets/sala.png"

const HeroSection = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/Login"); // manda al login
  };

  return (
    <section className="hero-container">
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            <span>ESPACIO DE </span>
            <span className="bold">COWORKING</span>
            <span> <br />CERCA DE TI.</span>
          </h1>

          <div className="hero-description">
            <span className="text-light">
              Reserva espacios de{" "}
            </span>
            <span className="text-medium">
              coworking
            </span>
            <span className="text-light">
              {" "}por día o por hora. <br />
              Salas comunes, cabinas individuales con todas las<br />
              herramientas necesarias; disfruta de wifi rápido y <br />
              espacios acogedores.
            </span>
          </div>

          <button className="hero-button" onClick={handleClick}>
            Reservar ahora
          </button>
        </div>

        <div className="hero-image">
          <img
            src={HeroImg}
            alt="Coworking"
            className="hero-img"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
