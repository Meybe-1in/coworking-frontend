import NavbarUser from "../../components/NavbarUser/NavbarUser";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRoomById, getCalendar } from "../../api/axiosConfig";
import { getBlockedHours, formatHour, generateHours } from "../../utils/timeSlots";
import { toUTC } from "../../utils/dateUtils";

export default function RoomDetailsPage() {

    //STATES
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [blockedHours, setBlockedHours] = useState(new Set());

    const incomingFilters = location.state?.filters;

    const now = new Date();
    const today = now.toISOString().split("T")[0];

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

        const firstAvailable = validHours.find(h => !h.disabled);
        if (!firstAvailable) return;

        const hour = parseInt(firstAvailable.value);

        setFilters(prev => {
            if (!validHours.some(h => h.value === prev.start && !h.disabled)) {
                return {
                    ...prev,
                    start: firstAvailable.value,
                    end: formatHour(hour + 1)
                };
            }
            return prev;
        });

    }, [filters.date, room, blockedHours]);

    // Cargar horas bloqueadas

    useEffect(() => {
        const loadReservations = async () => {
            try {
                const start = toUTC(safeFilters.date, "00:00");
                const end = toUTC(safeFilters.date, "23:59");

                const data = await getCalendar(start, end) || [];

                const roomReservations = Array.isArray(data)
                    ? data.filter(r => r.roomId === parseInt(id))
                    : [];
                const blocked = getBlockedHours(roomReservations, safeFilters.date);

                setBlockedHours(blocked);

            } catch (err) {
                console.error(err);
            }
        };

        loadReservations();
    }, [safeFilters.date, id]);

    // Ajustar horas si las bloqueadas afectan la selección actual
    useEffect(() => {
        if (!blockedHours.size) return;

        const availableStart = getStartHours().find(h => !h.disabled);

        if (!availableStart) return;

        setFilters(prev => {
            if (blockedHours.has(prev.start)) {
                const startHour = parseInt(availableStart.value);

                return {
                    ...prev,
                    start: availableStart.value,
                    end: formatHour(startHour + 1)
                };
            }
            return prev;
        });

    }, [blockedHours]);
    // -----------------------------
    // HELPERS
    // -----------------------------

    const getStartHours = () => {
        const now = new Date();

        const todayStr = now.toISOString().split("T")[0];

        let startHour = 7;

        if (safeFilters.date === todayStr) {
            startHour = Math.max(7, now.getHours() + 1);
        }

        const hours = generateHours(startHour, 19);

        return hours.map(h => ({
            value: h,
            disabled: blockedHours.has(h)
        }));
    };

    const getEndHours = () => {
        if (!filters.start) return [];

        const startHour = parseInt(filters.start.split(":")[0]);
        const hours = [];

        for (let h = startHour + 1; h <= 20; h++) {
            const hourStr = formatHour(h);

            // SI está bloqueada → se puede usar como FIN, pero no seguir
            if (blockedHours.has(hourStr)) {
                hours.push({
                    value: hourStr,
                    disabled: false
                });
                break;
            }

            hours.push({
                value: hourStr,
                disabled: false
            });
        }

        return hours;
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
                            src={room.imageUrl || salaImg}
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
                                            <option key={h.value} value={h.value} disabled={h.disabled}>
                                                {h.value} {h.disabled ? " (Ocupado)" : ""}
                                            </option>
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
                                            <option key={h.value} value={h.value} disabled={h.disabled}>
                                                {h.value} {h.disabled ? " (Ocupado)" : ""}
                                            </option>
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