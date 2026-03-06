import { useEffect, useState } from "react";
import NavbarUser from "../../components/NavbarUser/NavbarUser";
import SearchBar from "../../components/SearchBar/SearchBar";
import RoomCard from "../../components/RoomCard/RoomCard";
import { getRooms, getAvailableRooms } from "../../api/axiosConfig";

export default function UserDashboard() {
    const [rooms, setRooms] = useState([]);
    const [filtered, setFiltered] = useState([null]);
    const [loading, setLoading] = useState(true);
    const [suggestedRooms, setSuggestedRooms] = useState([]);

    useEffect(() => {
        getRooms()
            .then(data => setFiltered(Array.isArray(data) ? data : []))
            .catch(console.error);
    }, []);

    const handleSearch = async (filters) => {
        try {
            const available = await getAvailableRooms(filters);
            setFiltered(Array.isArray(available) ? available : []);
        } catch (err) {
            console.error(err);
            setFiltered([]);
        }
    };

    return (
        <div className="bg-slate-100 min-h-screen">
            <NavbarUser />

            <main className="pt-28 px-4 pb-16">
                <div className="max-w-7xl mx-auto flex flex-col gap-6">
                    <h1 className="text-3xl font-semibold">
                        Salas de reuniones y Coworking
                    </h1>

                    <SearchBar onSearch={handleSearch} />

                     <section className="flex flex-col gap-8">
                        {filtered.length > 0 ? (
                            filtered.map(room => (
                                <RoomCard key={room.id} room={room} />
                            ))
                        ) : (
                            <p className="text-center text-gray-500">
                                No hay salas disponibles
                            </p>
                        )}
                    </section>
                </div>
            </main>
        </div>
    );
}
