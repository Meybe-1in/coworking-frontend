import React from "react";
import Navbar from "../../components/NavBar/Navbar";
import "./HomePage.css";
import HeroSection from "../../components/HeroSection/HeroSection";
import Features from "../../components/Features/Features";
import About from "../../components/About/About";
import Contact from "../../components/Contact/Contact";
import Footer from "../../components/Footer/Footer";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <div className="homepage-container">
        <HeroSection />
        <About />
        <Features />
        <Contact />
      </div>
    </>
  );
};

export default HomePage;
