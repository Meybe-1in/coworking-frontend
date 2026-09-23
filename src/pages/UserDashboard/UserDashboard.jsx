import { useEffect, useState } from "react";
import NavbarUser from "../../components/NavbarUser/NavbarUser";
import SearchBar from "../../components/SearchBar/SearchBar";
import RoomCard from "../../components/RoomCard/RoomCard";
import EmptyRoomsState from "../../components/ui/EmptyRoomsState";
import RoomCarousel from "../../components/RoomCard/RoomCarousel";
import { useLocation } from "react-router-dom";
import { adjustDateIfPastClosing } from "../../utils/timeUtils";
import { getPublicRooms, getRoomsAvailability } from "../../api/roomApi";
import { getReservations } from "../../api/reservationApi";
import useReservationSettings from "../../components/hooks/useReservationSettings";

export default function UserDashboard() {

  const [filtered, setFiltered] = useState(null);
  const [suggestedRooms, setSuggestedRooms] = useState([]);
  const [filters, setFilters] = useState(null);
  const location = useLocation();
  const { settings } = useReservationSettings();

  useEffect(() => {
    loadAllRooms();
  }, []);

  useEffect(() => {
    if (location.state?.reset) {
      handleShowAll();

      window.history.replaceState({}, document.title); // Limpia el state para evitar re-ejecutar al volver a la página 
    }
  }, [location.state]);

  const loadAllRooms = async () => {
    try {
      const data = await getPublicRooms();
      setFiltered(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setFiltered([]);
    }
  };

  const handleShowAll = () => {
    setFilters(null);
    loadAllRooms();
  };

  const getNextAvailableTime = (room, reservations, filters) => {
    if (!settings) {
      return {
        isAvailable: true,
        nextAvailable: null
      };
    }

    const { date, start, end } = filters;

    const closingHour = parseInt(
      settings.closingTime.split(":")[0],
      10
    );

    const startHour = parseInt(start.split(":")[0], 10);
    const endHour = parseInt(end.split(":")[0], 10);

    const durationHours = endHour - startHour;

    if (durationHours <= 0) {
      return {
        isAvailable: false,
        nextAvailable: null
      };
    }

    // Solo las reservas PENDING y PAID bloquean la sala.
    const roomReservations = reservations
      .filter(
        (reservation) =>
          reservation.roomName === room.name &&
          ["PENDING", "PAID"].includes(reservation.status)
      )
      .sort(
        (a, b) =>
          new Date(a.startAt) - new Date(b.startAt)
      );

    let candidateHour = startHour;

    while (candidateHour + durationHours <= closingHour) {
      const candidateStart = new Date(
        `${date}T${String(candidateHour).padStart(2, "0")}:00:00`
      ).getTime();

      const candidateEnd = new Date(
        `${date}T${String(candidateHour + durationHours).padStart(2, "0")}:00:00`
      ).getTime();

      const hasConflict = roomReservations.some((reservation) => {
        const reservationStart =
          new Date(reservation.startAt).getTime();

        const reservationEnd =
          new Date(reservation.endAt).getTime();

        return (
          candidateStart < reservationEnd &&
          candidateEnd > reservationStart
        );
      });

      if (!hasConflict) {
        return {
          isAvailable: candidateHour === startHour,
          nextAvailable:
            candidateHour === startHour
              ? null
              : new Date(candidateStart)
        };
      }

      candidateHour++;
    }

    // No hay otro horario disponible dentro del horario de operación.
    return {
      isAvailable: false,
      nextAvailable: null
    };
  };

  const handleSearch = async (filters) => {
    try {
      const adjustedFilters = adjustDateIfPastClosing(filters);
      setFilters(adjustedFilters);

      const [availabilityRoomsRes, allRoomsRes] = await Promise.all([
        getRoomsAvailability(adjustedFilters),
        getPublicRooms()
      ]);

      // RESPUESTAS
      const availabilityRooms = Array.isArray(availabilityRoomsRes)
        ? availabilityRoomsRes
        : availabilityRoomsRes?.data || [];

      console.log(
        "DETALLE DISPONIBLES:",
        JSON.stringify(availabilityRooms, null, 2)
      );

      const allRooms = Array.isArray(allRoomsRes)
        ? allRoomsRes
        : allRoomsRes?.data || [];

      const reservations = await getReservations();
      console.log("RESERVAS:", JSON.stringify(reservations, null, 2));

      // NO HAY DISPONIBLES
      if (availabilityRooms.length === 0) {
        const suggestions = allRooms
          .sort(
            (a, b) =>
              Math.abs(a.capacity - filters.people) -
              Math.abs(b.capacity - filters.people)
          )
          .slice(0, 4)
          .map(room => {
            const { isAvailable, nextAvailable } = getNextAvailableTime(
              room,
              reservations,
              adjustedFilters
            );

            return {
              ...room,
              isAvailable,
              nextAvailable
            };
          });

        setFiltered([]);
        setSuggestedRooms(suggestions);
        return;
      }

      // HAY DISPONIBLES
      const fullRooms = availabilityRooms.map(avRoom => {
        const fullData = allRooms.find(r => r.id === avRoom.id);

        if (!fullData) return null;

        const { isAvailable, nextAvailable } = getNextAvailableTime(
          fullData,
          reservations,
          adjustedFilters
        );

        return {
          ...fullData,
          ...avRoom,
          isAvailable,
          nextAvailable
        };
      }).filter(Boolean); // elimina nulls

      setFiltered(fullRooms);
      setSuggestedRooms([]);

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


          <SearchBar
            onSearch={handleSearch}
            filters={filters}
          />
          {/* Carrusel de sugerencias */}

          {filtered && !filters && (
            <RoomCarousel rooms={filtered} />
          )}

          {/* RESULTADOS */}

          <section className="flex flex-col gap-8">

            {filters && filtered && filtered.length > 0 && (
              filtered.map(room => (
                <RoomCard
                  key={room.id}
                  room={room}
                  filters={filters}
                  preview={false}
                />
              ))
            )}

            {filters && filtered && filtered.length === 0 && (
              <EmptyRoomsState
                people={filters?.people}
                suggestedRooms={suggestedRooms}
                onShowAll={handleShowAll}
                filters={filters}
              />
            )}

          </section>

        </div>
      </main>

    </div>
  );
}