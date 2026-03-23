import NavbarUser from "../../components/NavbarUser/NavbarUser";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRoomById } from "../../api/axiosConfig";
import Img from "../../assets/sala.png";

export default function RoomDetailsPage() {

    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const incomingFilters = location.state?.filters;

    const now = new Date();
    const today = now.toISOString().split("T")[0];

    const formatHour = (hour) =>
        `${String(hour).padStart(2, "0")}:00`;

    const getInitialStartHour = () => {
        const currentHour = now.getHours();
        const nextHour = now.getMinutes() > 0
            ? currentHour + 1
            : currentHour;

        return Math.max(7, nextHour);
    };

    const initialStartHour = getInitialStartHour();

    // STATE
    const [room, setRoom] = useState(null);

    const defaultFilters = {
    date: today,
    start: formatHour(initialStartHour),
    end: formatHour(initialStartHour + 1),
    people: 1
};

const [filters, setFilters] = useState({
    ...defaultFilters,
    ...incomingFilters
});

const safeFilters = {
    date: filters?.date || defaultFilters.date,
    start: filters?.start || defaultFilters.start,
    end: filters?.end || defaultFilters.end,
    people: filters?.people || defaultFilters.people
};

    // -----------------------------
    // EFFECTS
    // -----------------------------

    // Cargar sala
    useEffect(() => {
        const loadRoom = async () => {
            const data = await getRoomById(id);
            setRoom(data);
        };
        loadRoom();
    }, [id]);

    // Validar horas cuando cambia fecha
    useEffect(() => {
        if (!room) return;

        const validHours = getStartHours();
        if (!validHours.length) return;

        const hour = parseInt(validHours[0].split(":")[0]);

        setFilters(prev => {
            if (!validHours.includes(prev.start)) {
                return {
                    ...prev,
                    start: validHours[0],
                    end: formatHour(hour + 1)
                };
            }
            return prev;
        });

    }, [filters.date, room]);

    // -----------------------------
    // HELPERS
    // -----------------------------

    const generateHours = (start, end) =>
        Array.from(
            { length: end - start + 1 },
            (_, i) => formatHour(start + i)
        );

    const getStartHours = () => {
        const now = new Date();
        const selectedDate = new Date(safeFilters.date);

        let startHour = 7;

        if (selectedDate.toDateString() === now.toDateString()) {
            const nextHour =
                now.getMinutes() > 0
                    ? now.getHours() + 1
                    : now.getHours();

            startHour = Math.max(7, nextHour);
        }

        return generateHours(startHour, 19);
    };

    const getEndHours = () => {
        if (!filters.start) return [];
        const startHour =
            parseInt(filters.start.split(":")[0]) + 1;

        return generateHours(startHour, 20);
    };

    const getHours = () => {
        const start = parseInt(safeFilters.start);
        const end = parseInt(safeFilters.end);

        return Math.max(0, end - start);
    };

    const calculateTotal = () => {
        return getHours() * room.price;
    };



    // -----------------------------
    // HANDLERS
    // -----------------------------

    const handleChange = (e) => {
        const { name, value } = e.target;

        let updated = { ...filters, [name]: value };

        if (name === "start") {
            const startHour = parseInt(value);
            updated.end = formatHour(startHour + 1);
        }

        setFilters(updated);
    };

    const goToCheckout = () => {
        navigate("/checkout", {
            state: { room, filters }
        });
    };

    // -----------------------------
    // UI
    // -----------------------------

    if (!room) return <p>Cargando...</p>;
    const startHours = getStartHours();
    const endHours = getEndHours();
    const hours =
        parseInt(safeFilters.end) - parseInt(safeFilters.start);

    return (
        <div className="bg-slate-100 min-h-screen">
            <NavbarUser />

            <main className="pt-28 max-w-6xl mx-auto px-4 pb-16">
                <div className="grid md:grid-cols-[2fr_1fr] gap-12">

                    {/* IZQUIERDA */}
                    <div className="flex flex-col gap-8">

                        <img
                            src={
                                room.imageUrl
                                    ? `${import.meta.env.VITE_API_URL}${room.imageUrl}`
                                    : Img
                            }
                            className="w-full h-96 object-cover rounded-2xl"
                        />


                        <div className="flex items-center justify-between mt-4">

                            {/* IZQUIERDA Name */}
                            <h1 className="text-3xl font-bold">
                                {room.name}
                            </h1>

                            {/* DERECHA  Name */}
                            <div className="flex gap-4 text-gray-600 text-sm">
                                <span>{room.capacity} personas•</span>
                                <span>{room.location}•</span>
                                <span>${room.price} USD</span>
                            </div>

                        </div>



                        <div className="bg-white shadow rounded-xl p-6 boder">

                            <h2 className="text-lg font-semibold mb-4">
                                Lo que ofrece esta sala
                            </h2>

                            <div className="grid grid-cols-2 gap-3">
                                {room.features?.map((f, i) => (
                                    <div key={i} className="flex items-center gap-2 text-gray-700">
                                        ✔ {f}
                                    </div>
                                ))}
                            </div>

                        </div>

                        <div className="bg-white shadow rounded-xl p-6 boder">

                            <h2 className="text-lg font-semibold mb-3">
                                Descripción
                            </h2>

                            <p className="text-gray-700 leading-relaxed">
                                {room.description}
                            </p>
                        </div>
                    </div>


                    {/* DERECHA */}
                    <div className="bg-white shadow-xl rounded-2xl p-6 h-fit flex flex-col gap-6 sticky top-28">

                        <div className="flex justify-between items-center text-sm">

                            <span className="text-gray-600">
                                ${room.price} USD por {getHours()} {getHours() === 1 ? "hora" : "horas"}
                            </span>

                            <span className="font-semibold text-lg">
                                ${calculateTotal()}
                            </span>

                        </div>

                        <div className="border rounded-2xl overflow-hidden bg-white">

                            {/* FECHA BARRA */}
                            <div className="p-4 border-b flex flex-col gap-1">
                                <label className="text-xs text-gray-500 font-medium">
                                    FECHA
                                </label>

                                <input
                                    type="date"
                                    name="date"
                                    value={safeFilters.date}
                                    min={today}
                                    onChange={handleChange}
                                    className="outline-none text-lg font-medium"
                                />
                            </div>

                            {/* INICIO Y FIN BARRA*/}
                            <div className="grid grid-cols-2">

                                {/* INICIO */}
                                <div className="p-4 flex flex-col gap-1 border-r">
                                    <label className="text-xs text-gray-500 font-medium">
                                        INICIO
                                    </label>

                                    <select
                                        name="start"
                                        value={safeFilters.start}
                                        onChange={handleChange}
                                        className="outline-none text-lg font-medium bg-transparent"
                                    >
                                        {startHours.map(h => (
                                            <option key={h}>{h}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* FIN */}
                                <div className="p-4 flex flex-col gap-1">
                                    <label className="text-xs text-gray-500 font-medium">
                                        FIN
                                    </label>

                                    <select
                                        name="end"
                                        value={safeFilters.end}
                                        onChange={handleChange}
                                        className="outline-none text-lg font-medium bg-transparent"
                                    >
                                        {endHours.map(h => (
                                            <option key={h}>{h}</option>
                                        ))}
                                    </select>
                                </div>

                            </div>

                        </div>

                        <button onClick={goToCheckout}>
                            Reservar
                        </button>

                        <div className="
                            inline-flex items-center gap-2 px-3 py-1 
                            bg-blue-50 text-blue-600 rounded-full text-sm
                            animate-pulse   
                            w-fit
                            ">
                            Reserva flexible · Aún no se te cobrará nada
                        </div>
                    </div>

                </div>
            </main >
        </div >
    );
}