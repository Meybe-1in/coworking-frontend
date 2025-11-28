import React from "react";
import "./RoomCard.css";
import Img from "../../assets/cub1.png"
const getStatusClass = (status) => {
  return status === "Disponible" ? "tag-available" : "tag-unavailable";
};

export default function RoomCard({ room }) {
  const features = room.features || [];
  const isAvailable = room.available;
  const status = isAvailable ? "Disponible" : "No disponible";
  const statusClass = isAvailable ? "tag-available" : "tag-unavailable";

  return (
    <div className="room-card">
      {/* HEADER */}
      <div className="room-card-header">
        <span className={`room-status ${statusClass}`}>{status}</span>
        <div className="room-price">
          <span className="price-value">${room.price}</span>
          <span className="price-unit">/h</span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="room-card-content">
        {/* LEFT SIDE - INFO */}
        <div className="room-info">
          <div className="room-title">
            <h3>{room.name}</h3>
            <p className="room-meta">
              {room.capacity} {room.capacity === 1 ? "Persona " : "Personas "} | {room.location}
            </p>
          </div>

          <p className="room-description">{room.description}</p>

          <div className="room-features">
            {features.map((f, i) => (
              <span key={i} className="room-feature-item">
                {f}
              </span>
            ))}
          </div>

          <button className="reserve-button" disabled={!isAvailable}>
            Solicita una reserva
          </button>
        </div>

        {/* RIGHT SIDE - IMAGE */}
        <div className="room-image-container">
          <img
            src={
              room.imageUrl
                ? `${import.meta.env.VITE_API_URL}${room.imageUrl}` // muestra la imagen del backend
                : Img // imagen por defecto si no tiene
                }
            alt={room.name}
          />
        </div>
      </div>
    </div>
  );
}
