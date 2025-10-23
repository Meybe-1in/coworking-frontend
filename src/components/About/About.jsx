import React from "react";
import "./About.css";
import AboutImg from "../../assets/about.png";

const About = () => {
    return (
        <section className="about-container">
            <div className="about-content">
                <div className="about-image">
                    <img
                        src={AboutImg}
                        alt="Coworking"
                        className="about-img"
                    />
                </div>

                <div className="about-description">
                    <h2 className="about-heading">Sobre Nosotros</h2>
                    <p className="about-text">
                        Trabaja, conéctate y crece en un ambiente diseñado para ti. Somos un espacio de coworking creado para quienes buscan{" "}
                        <strong>productividad, comodidad y flexibilidad</strong>.
                    </p>
                    <p className="about-text">
                        Ofrecemos cubículos individuales y salas de reuniones que puedes reservar fácilmente por hora o por día. Encuentra un entorno moderno, con Wi-Fi rápido y espacios para colaborar o relajarte.
                    </p>
                    <p className="about-footer">
                        <em>Tu jornada, tu ritmo, tu espacio.</em>
                    </p>
                </div>


            </div>
        </section>
    );
};

export default About;
