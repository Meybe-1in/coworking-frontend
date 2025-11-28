import React from 'react';
import './NavbarUser.css'; // Importamos el archivo de estilos
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

export default function NavbarUser() {

  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUsername(decoded.username);

      } catch (error) {
        console.error("Token invalido", error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <nav className="navbar-user">
      <div className="navbar-container">
         <div className="navbar-logo">
                  <span className="logo-bold">Co</span>
                      <span className="logo-light">Working</span>
                </div>
        <div className="navbar-links">
          <span className="navbar-link link-calendar">Calendario</span>
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