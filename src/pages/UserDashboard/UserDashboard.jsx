import { useEffect, useState } from "react";
import NavbarUser from "../../components/NavbarUser/NavbarUser";
import SearchBar from "../../components/SearchBar/SearchBar";
import RoomCard from "../../components/RoomCard/RoomCard";
import EmptyRoomsState from "../../components/ui/EmptyRoomsState";

import { getRooms, getRoomsAvailability } from "../../api/axiosConfig";

export default function UserDashboard() {

  const [filtered, setFiltered] = useState(null);
  const [suggestedRooms, setSuggestedRooms] = useState([]);
  const [filters, setFilters] = useState(null);

  useEffect(() => {
    loadAllRooms();
  }, []);

  const loadAllRooms = async () => {
    try {
      const data = await getRooms();
      setFiltered(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setFiltered([]);
    }
  };

  const handleSearch = async (filters) => {
    try {

      setFilters(filters);

      const rooms = await getRoomsAvailability(filters);

      if (!rooms || rooms.length === 0) {

        const allRooms = await getRooms();

        const suggestions = allRooms
          .sort(
            (a, b) =>
              Math.abs(a.capacity - filters.people) -
              Math.abs(b.capacity - filters.people)
          )
          .slice(0, 3);

        setFiltered([]);
        setSuggestedRooms(suggestions);

      } else {

        setFiltered(rooms);
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

          {/* RESULTADOS */}

          <section className="flex flex-col gap-8">

            {filtered && filtered.length > 0 && (
              filtered.map(room => (
                <RoomCard key={room.id} room={room} />
              ))
            )}

            {filtered && filtered.length === 0 && (
              <EmptyRoomsState
                people={filters?.people}
                suggestedRooms={suggestedRooms}
                onShowAll={loadAllRooms}
              />
            )}

          </section>

        </div>
      </main>

    </div>
  );
}