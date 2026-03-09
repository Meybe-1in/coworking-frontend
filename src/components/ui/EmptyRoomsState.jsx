import { useEffect, useState } from "react";
import RoomCard from "../RoomCard/RoomCard";

export default function EmptyRoomsState({ people, suggestedRooms, onShowAll }) {

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(true), 50);
        return () => clearTimeout(timer);
    }, []);

    const peopleNumber = Number(people);
    const peopleText = peopleNumber === 1 ? "persona" : "personas";

    return (
        <div
            className={`
                w-full bg-white shadow-md rounded-xl p-10 text-center
                transform transition-all duration-500
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
            `}
        >

            {/* Título */}
            <h2 className="text-2xl font-semibold text-gray-800">
                No encontramos salas para {people} {peopleText}
            </h2>

            {/* Badge */}
            <div className="
                inline-flex items-center gap-2 mt-4 px-3 py-1 
                bg-blue-50 text-blue-600 rounded-full text-sm
                animate-pulse
            ">
                Sugerencias cercanas a tu búsqueda
            </div>

            {/* Salas sugeridas */}
            {suggestedRooms.length > 0 && (
                <div className="mt-10 grid md:grid-cols-2 gap-6">
                    {suggestedRooms.map((room, index) => (
                        <div
                            key={room.id}
                            className="
                                transform transition-all duration-500
                                hover:-translate-y-1 hover:shadow-lg
                            "
                            style={{
                                animation: `fadeUp 0.5s ease forwards`,
                                animationDelay: `${index * 0.1}s`
                            }}
                        >
                            <RoomCard room={room} />
                        </div>
                    ))}
                </div>
            )}

            {/* Botón */}
            <div className="mt-12">
                <button
                    onClick={onShowAll}
                    className="
                        px-6 py-3 border border-gray-300 rounded-xl
                        text-gray-700 font-medium
                        hover:bg-gray-100 hover:shadow
                        transition-all duration-300
                    "
                >
                    Ver todas las salas
                </button>
            </div>

        </div>
    );
}