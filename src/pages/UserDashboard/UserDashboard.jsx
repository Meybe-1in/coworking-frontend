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

export default function UserDashboard() {

  const [filtered, setFiltered] = useState(null);
  const [suggestedRooms, setSuggestedRooms] = useState([]);
  const [filters, setFilters] = useState(null);
  const location = useLocation();

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
    const { date, start, end } = filters;

    const startTime = new Date(`${date}T${start}`).getTime();
    const endTime = new Date(`${date}T${end}`).getTime();
    const duration = endTime - startTime;

    // Filtrar reservas de esa sala
    const roomReservations = reservations
      .filter(r => r.roomName === room.name)
      .sort((a, b) => new Date(a.startAt) - new Date(b.startAt));

    let isAvailable = true;
    let nextAvailable = null;

    let canStart = startTime;

    for (let i = 0; i < roomReservations.length; i++) {
      const resStart = new Date(roomReservations[i].startAt).getTime();
      const resEnd = new Date(roomReservations[i].endAt).getTime();

      const canEnd = canStart + duration;
      //SE SOLAPA CON EL BLOQUE ACTUAL
      if (canStart < resEnd && canEnd > resStart) {
        isAvailable = false;

        // mover inicio al final de esta reserva
        canStart = resEnd;

        // reiniciar loop para validar contra TODAS otra vez
        i = -1;
      }
    }

    if (!isAvailable) {
      nextAvailable = new Date(canStart);
    }

    return { isAvailable, nextAvailable };
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

    const allRooms = Array.isArray(allRoomsRes)
      ? allRoomsRes
      : allRoomsRes?.data || [];

    const reservations = await getReservations();

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