import { useEffect, useState } from "react";
import NavbarUser from "../../components/NavbarUser/NavbarUser";
import SearchBar from "../../components/SearchBar/SearchBar";
import RoomCard from "../../components/RoomCard/RoomCard";
import EmptyRoomsState from "../../components/ui/EmptyRoomsState";
import RoomCarousel from "../../components/RoomCard/RoomCarousel";
import { useLocation } from "react-router-dom";
import { getRooms, getRoomsAvailability } from "../../api/axiosConfig";

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
      const data = await getRooms();
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

  const handleSearch = async (filters) => {
    try {

      setFilters(filters);

      const [availabilityRooms, allRooms] = await Promise.all([
        getRoomsAvailability(filters),
        getRooms()
      ]);

      {

if (!availabilityRooms || availabilityRooms.length === 0) {

  let suggestions = [];

  try {

    const { people, ...rest } = filters;

    const relaxedAvailability = await getRoomsAvailability(rest);

    suggestions = relaxedAvailability.map(avRoom => {
      const fullData = allRooms.find(r => r.id === avRoom.id);

      return {
        ...fullData,
        ...avRoom
      };
    });

  } catch (error) {
    console.error("Error en sugerencias:", error);
  }
  if (suggestions.length === 0) {
    suggestions = allRooms.map(room => ({
      ...room,
      available: false 
    }));
  }


  suggestions = suggestions
    .sort(
      (a, b) =>
        Math.abs(a.capacity - filters.people) -
        Math.abs(b.capacity - filters.people)
    )
    .slice(0, 3);

  setFiltered([]);
  setSuggestedRooms(suggestions);
}else {
        const fullRooms = availabilityRooms.map(avRoom => {
          const fullData = allRooms.find(r => r.id === avRoom.id);

          return {
            ...fullData,   // description, features, etc
            ...avRoom      // available, etc
          };
        });

        setFiltered(fullRooms);
        setSuggestedRooms([]);

      }

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