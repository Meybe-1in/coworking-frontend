import React, { useEffect, useState } from "react";
import RoomCard from "./RoomCard";
import { getPublicRooms } from "../../api/roomApi";

export default function RoomList() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRooms = async () => {
      try {
        const data = await getPublicRooms();
        const sorted = [...data].sort((a, b) => a.capacity - b.capacity);
        setRooms(sorted);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadRooms();
  }, []);

  if (loading) return <p>Cargando salas...</p>;

  return (
    <div className="rooms-container">
      {rooms.map((room) => (
        <RoomCard
          key={room.id}
          room={room}
          status={room.available ? "Disponible" : "No disponible"}
        />
      ))}
    </div>
  );
}
