import NavbarUser from "../../components/NavbarUser/NavbarUser";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { getRoomById } from "../../api/roomApi";
import { getCalendar } from "../../api/reservationApi";
import useReservationSettings from "../../components/hooks/useReservationSettings";
import {
    getBlockedHours,
    formatHour,
    getStartHoursBySettings,
    getEndHoursBySettings,
} from "../../utils/timeSlots";
import { toUTC } from "../../utils/dateUtils";

export default function RoomDetailsPage() {
    const {
        settings,
        loading: settingsLoading,
        error: settingsError,
    } = useReservationSettings();

    // STATES
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const [blockedHours, setBlockedHours] = useState(new Set());
    const [room, setRoom] = useState(null);

    const incomingFilters = location.state?.filters;

    const now = new Date();
    const today = now.toISOString().split("T")[0];

    const defaultFilters = {
        date: today,
        start: "",
        end: "",
        people: 1,
    };

    const [filters, setFilters] = useState({
        ...defaultFilters,
        ...incomingFilters,
    });

    const safeFilters = {
        date: filters?.date || defaultFilters.date,
        start: filters?.start || defaultFilters.start,
        end: filters?.end || defaultFilters.end,
        people: filters?.people || defaultFilters.people,
    };

    // -----------------------------
    // EFFECTS
    // -----------------------------

    // Cargar sala
    useEffect(() => {
        const loadRoom = async () => {
            try {
                const data = await getRoomById(id);
                setRoom(data);
            } catch (error) {
                console.error("Error al cargar la sala:", error);
            }
        };

        loadRoom();
    }, [id]);

    // Cargar horas bloqueadas
    useEffect(() => {
        const loadReservations = async () => {
            if (!safeFilters.date) return;

            try {
                const start = toUTC(
                    safeFilters.date,
                    "00:00"
                );

                const end = toUTC(
                    safeFilters.date,
                    "23:59"
                );

                const data =
                    await getCalendar(start, end) || [];

                const roomReservations = Array.isArray(data)
                    ? data.filter(
                        (reservation) =>
                            reservation.roomId === parseInt(id, 10)
                    )
                    : [];

                const blocked = getBlockedHours(
                    roomReservations,
                    safeFilters.date
                );

                setBlockedHours(blocked);
            } catch (error) {
                console.error(
                    "Error al cargar reservaciones:",
                    error
                );

                setBlockedHours(new Set());
            }
        };

        loadReservations();
    }, [safeFilters.date, id]);

    // -----------------------------
    // HELPERS
    // -----------------------------

    const getStartHours = () => {
        if (!settings || !safeFilters.date) {
            return [];
        }

        const hours = getStartHoursBySettings(
            settings,
            safeFilters.date,
            today
        );

        return hours.map((hour) => ({
            value: hour,
            disabled: blockedHours.has(hour),
        }));
    };

    const getEndHours = () => {
        if (!settings || !safeFilters.start) {
            return [];
        }

        /*
         * IMPORTANTE:
         * Aquí NO aplicamos maxReservationHours.
         *
         * El selector debe mostrar todo el horario
         * hasta la hora de cierre.
         */
        const hours = getEndHoursBySettings(
            safeFilters.start,
            settings
        );

        return hours.map((hour) => ({
            value: hour,
            disabled: false,
        }));
    };

    const getFirstEndForStart = (start) => {
        if (!start || !settings) {
            return "";
        }

        const endHours = getEndHoursBySettings(
            start,
            settings
        );

        return endHours[0] || "";
    };

    /*
     * Inicializar y corregir automáticamente
     * fecha / inicio / fin.
     *
     * Casos:
     *
     * 1. Entrar desde carrusel sin filtros.
     * 2. Hoy ya terminó.
     * 3. Hora seleccionada está ocupada.
     * 4. Sala ocupada 08:00 - 10:00
     *    => selecciona 10:00 - 11:00.
     * 5. Cambio de fecha.
     */
    useEffect(() => {
        if (!settings || !room || !safeFilters.date) {
            return;
        }

        const availableHours = getStartHoursBySettings(
            settings,
            safeFilters.date,
            today
        );

        /*
         * Si estamos en hoy y ya no existen
         * horas de inicio disponibles, pasamos a mañana.
         */
        if (
            safeFilters.date === today &&
            availableHours.length === 0
        ) {
            const tomorrow = new Date();

            tomorrow.setDate(
                tomorrow.getDate() + 1
            );

            const tomorrowDate =
                tomorrow.toISOString().split("T")[0];

            setFilters((prev) => ({
                ...prev,
                date: tomorrowDate,
                start: "",
                end: "",
            }));

            return;
        }

        /*
         * Marcamos las horas ocupadas.
         */
        const hoursWithAvailability =
            availableHours.map((hour) => ({
                value: hour,
                disabled: blockedHours.has(hour),
            }));

        /*
         * Primera hora libre.
         */
        const firstAvailable =
            hoursWithAvailability.find(
                (hour) => !hour.disabled
            );

        /*
         * Si no hay ninguna hora libre,
         * evitamos dejar valores inválidos.
         */
        if (!firstAvailable) {
            setFilters((prev) => ({
                ...prev,
                start: "",
                end: "",
            }));

            return;
        }

        setFilters((prev) => {
            /*
             * Revisamos si la hora actual sigue siendo válida.
             */
            const currentStartIsValid =
                hoursWithAvailability.some(
                    (hour) =>
                        hour.value === prev.start &&
                        !hour.disabled
                );

            /*
             * Si la hora actual es válida,
             * solamente completamos el FIN si está vacío.
             */
            if (currentStartIsValid) {
                if (!prev.end) {
                    return {
                        ...prev,
                        end: getFirstEndForStart(
                            prev.start
                        ),
                    };
                }

                return prev;
            }

            /*
             * Si no es válida:
             *
             * Ejemplo:
             * 08:00 ocupado
             * 09:00 ocupado
             * 10:00 libre
             *
             * => 10:00 - 11:00
             */
            return {
                ...prev,
                start: firstAvailable.value,
                end: getFirstEndForStart(
                    firstAvailable.value
                ),
            };
        });
    }, [
        settings,
        room,
        safeFilters.date,
        blockedHours,
        today,
    ]);

    // -----------------------------
    // HANDLERS
    // -----------------------------

    const handleChange = (e) => {
        const { name, value } = e.target;

        let updated = {
            ...filters,
            [name]: value,
        };

        /*
         * Al cambiar inicio,
         * seleccionamos automáticamente
         * la primera hora de finalización.
         */
        if (name === "start") {
            const endHours =
                getEndHoursBySettings(
                    value,
                    settings
                );

            updated.end =
                endHours[0] || "";
        }

        /*
         * Al cambiar fecha,
         * dejamos que el efecto encuentre
         * la primera hora disponible.
         */
        if (name === "date") {
            updated.start = "";
            updated.end = "";
        }

        setFilters(updated);
    };

    const getHours = () => {
        if (
            !safeFilters.start ||
            !safeFilters.end
        ) {
            return 0;
        }

        const start = parseInt(
            safeFilters.start.split(":")[0],
            10
        );

        const end = parseInt(
            safeFilters.end.split(":")[0],
            10
        );

        if (
            Number.isNaN(start) ||
            Number.isNaN(end)
        ) {
            return 0;
        }

        return Math.max(
            0,
            end - start
        );
    };

    const calculateTotal = () => {
        if (!room) {
            return 0;
        }

        return getHours() * room.price;
    };

    const goToCheckout = () => {
        /*
         * Evitar enviar una reserva
         * sin horario.
         */
        if (
            !safeFilters.start ||
            !safeFilters.end
        ) {
            Swal.fire({
                icon: "warning",
                title: "Horario no disponible",
                text: "Selecciona un horario válido para continuar.",
                confirmButtonText: "Entendido",
            });

            return;
        }

        const startHour = parseInt(
            safeFilters.start.split(":")[0],
            10
        );

        const endHour = parseInt(
            safeFilters.end.split(":")[0],
            10
        );

        const reservationHours =
            endHour - startHour;

        /*
         * El máximo configurado solamente
         * se valida aquí.
         *
         * NO limita el selector.
         */
        if (
            reservationHours >
            settings.maxReservationHours
        ) {
            Swal.fire({
                icon: "warning",
                title: "Duración máxima excedida",
                text: `No se puede reservar una sala por más de ${settings.maxReservationHours} horas.`,
                confirmButtonText: "Entendido",
            });

            return;
        }

        if (reservationHours <= 0) {
            Swal.fire({
                icon: "warning",
                title: "Horario inválido",
                text: "La hora de finalización debe ser posterior a la hora de inicio.",
                confirmButtonText: "Entendido",
            });

            return;
        }

        navigate("/checkout", {
            state: {
                room: {
                    id: room.id,
                    name: room.name,
                    price: room.price,
                },
                filters: safeFilters,
            },
        });
    };

    // -----------------------------
    // UI STATES
    // -----------------------------

    if (settingsLoading || !settings) {
        return (
            <p>
                Cargando configuración de reservas...
            </p>
        );
    }

    if (settingsError) {
        return (
            <p className="text-red-600">
                No se pudo cargar la configuración
                de reservas.
            </p>
        );
    }

    if (!room) {
        return <p>Cargando...</p>;
    }

    const startHours = getStartHours();
    const endHours = getEndHours();

    const hours = getHours();

    // -----------------------------
    // UI
    // -----------------------------

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
                                    ? room.imageUrl
                                    : null
                            }
                            className="w-full h-96 object-cover rounded-2xl"
                            alt={room.name}
                        />

                        <div className="flex items-center justify-between mt-4">

                            {/* IZQUIERDA Name */}
                            <h1 className="text-3xl font-bold">
                                {room.name}
                            </h1>

                            {/* DERECHA Name */}
                            <div className="flex gap-4 text-gray-600 text-sm">
                                <span>
                                    {room.capacity} personas•
                                </span>

                                <span>
                                    {room.location}•
                                </span>

                                <span>
                                    ${room.price} USD
                                </span>
                            </div>

                        </div>

                        <div className="bg-white shadow rounded-xl p-6 boder">

                            <h2 className="text-lg font-semibold mb-4">
                                Lo que ofrece esta sala
                            </h2>

                            <div className="grid grid-cols-2 gap-3">
                                {room.features?.map(
                                    (f, i) => (
                                        <div
                                            key={i}
                                            className="flex items-center gap-2 text-gray-700"
                                        >
                                            ✔ {f}
                                        </div>
                                    )
                                )}
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
                                ${room.price} USD por{" "}
                                {getHours()}{" "}
                                {getHours() === 1
                                    ? "hora"
                                    : "horas"}
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

                            {/* INICIO Y FIN BARRA */}
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
                                        {startHours.map(
                                            (h) => (
                                                <option
                                                    key={h.value}
                                                    value={h.value}
                                                    disabled={
                                                        h.disabled
                                                    }
                                                >
                                                    {h.value}{" "}
                                                    {h.disabled
                                                        ? " (Ocupado)"
                                                        : ""}
                                                </option>
                                            )
                                        )}
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
                                        {endHours.map(
                                            (h) => (
                                                <option
                                                    key={h.value}
                                                    value={h.value}
                                                    disabled={
                                                        h.disabled
                                                    }
                                                >
                                                    {h.value}{" "}
                                                    {h.disabled
                                                        ? " (Ocupado)"
                                                        : ""}
                                                </option>
                                            )
                                        )}
                                    </select>

                                </div>

                            </div>

                        </div>

                        {/* Máximo permitido */}
                        <p className="text-xs text-gray-500 -mt-2">
                            Duración máxima permitida:{" "}
                            <span className="font-semibold text-gray-700">
                                {settings.maxReservationHours} horas
                            </span>
                        </p>

                        <button
                            onClick={goToCheckout}
                        >
                            Reservar
                        </button>

                        {/* Mensaje original */}
                        <div
                            className="
                                inline-flex items-center gap-2 px-3 py-1
                                bg-blue-50 text-blue-600 rounded-full text-sm
                                animate-pulse
                                w-fit
                            "
                        >
                            Reserva flexible · Aún no se te cobrará nada
                        </div>

                    </div>

                </div>
            </main>
        </div>
    );
}