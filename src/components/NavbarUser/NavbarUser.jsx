import React from 'react';
import './NavbarUser.css'; // Importamos el archivo de estilos
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";

export default function NavbarUser() {

  const [username, setUsername] = useState("Usuario");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");

    if (storedUsername) {
     setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    
    navigate("/login");
  };

  return (
    <nav className="navbar-user">
      <div className="navbar-container">
         <div className="navbar-logo">
                  <span className="logo-bold">Co</span>
                      <span className="logo-light">Working</span>
                </div>
        <div className="navbar-links">
          <span onClick={() => navigate("/calendar")}>Calendario</span>
          <span className="navbar-link link-reserve">Reservar Sala</span>
        </div>
        <div className="navbar-actions">
          <span className="navbar-username">{username}</span>
          <button className="navbar-logout-btn" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </div>
    </nav>
  );
}