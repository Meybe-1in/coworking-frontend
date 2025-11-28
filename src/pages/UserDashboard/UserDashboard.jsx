import React, { useEffect, useState } from "react";
import NavbarUser from "../../components/NavbarUser/NavbarUser";
import SearchBar from "../../components/SearchBar/SearchBar";
import RoomCard from "../../components/RoomCard/RoomCard";
import "./UserDashboard.css";
import { getRooms, getReservations, getAvailableRooms } from "../../api/axiosConfig";

export default function UserDashboard() {
    const [rooms, setRooms] = useState([]);
    const [filtered, setFiltered] = useState([]);


    // Cargar salas iniciales
    useEffect(() => {
        const fetchData = async () => {
            try {
                const roomsData = await getRooms();
                setRooms(roomsData);
                setFiltered(roomsData);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    // Manejar búsqueda desde SearchBar
    const handleSearch = async (filters) => {
        try {
            const available = await getAvailableRooms(filters);
            setFiltered(available);
        } catch (err) {
            console.error("Error en búsqueda de salas disponibles", err);
        }
    };

    return (
        <div className="dashboard-container">
            <NavbarUser />
            <main className="dashboard-content">
                <h1 className="title">Salas de reuniones y Coworking</h1>
                <SearchBar onSearch={handleSearch} />
                <div className="rooms-list">
                    {filtered.map((room) => (
                        <RoomCard key={room.id} room={room} status="Disponible" />
                    ))}
                </div>
            </main>
        </div>
    );
}
