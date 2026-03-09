import { useEffect, useState } from "react";
import NavbarUser from "../../components/NavbarUser/NavbarUser";
import SearchBar from "../../components/SearchBar/SearchBar";
import RoomCard from "../../components/RoomCard/RoomCard";
import { getRooms, getRoomsAvailability } from "../../api/axiosConfig";

export default function UserDashboard() {
    const [rooms, setRooms] = useState([]);
    const [filtered, setFiltered] = useState([null]);
    const [loading, setLoading] = useState(true);
    const [suggestedRooms, setSuggestedRooms] = useState([]);

    useEffect(() => {
        loadRooms();
    }, []);

    const loadRooms = async () => {
        try {
            const data = await getRooms();
            setRooms(data);
            setFiltered(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (filters) => {
        try {
            const data = await getRoomsAvailability(filters);

            if (data.length === 0) {

                const suggestions = rooms
                    .sort((a, b) =>
                        Math.abs(a.capacity - filters.people) -
                        Math.abs(b.capacity - filters.people)
                    )
                    .slice(0, 2);

                setSuggestedRooms(suggestions);
            } else {
                setSuggestedRooms([]);
            }

            setFiltered(data);

        } catch (err) {
            console.error(err);
            setFiltered([]);
        }
    };

    const roomsToShow = filtered !== null ? filtered : rooms;

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
                        {loading ? (
                            <p className="text-center text-lg text-gray-600">
                            </p>
                        ) : roomsToShow.length > 0 ? (
                            roomsToShow.map(room => (
                                <RoomCard key={room.id} room={room} />
                            ))
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-xl font-semibold text-gray-600">
                                    No hay salas disponibles para esa capacidad
                                </p>
                                {suggestedRooms.length > 0 && (
                                    <div className="mt-6">
                                        <p className="text-lg font-medium text-gray-700 mb-4">  
                                            Salas sugeridas:
                                        </p>
                                        <div className="flex flex-col gap-4">
                                            {suggestedRooms.map(room => (
                                                <RoomCard key={room.id} room={room} />
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <button
                                    onClick={() => {
                                        setFiltered(null);
                                        setSuggestedRooms([]);
                                    }}
                                    className="mt-4 px-6 py-2 bg-sky-500 text-white rounded-lg"
                                >
                                    Ver todas las salas
                                </button>
                            </div>
                        )}
                    </section>
                </div>
            </main>
        </div>
    );
}
