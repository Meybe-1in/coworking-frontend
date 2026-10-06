import { useEffect, useState } from "react";
import NavbarUser from "../../components/NavbarUser/NavbarUser";
import SearchBar from "../../components/SearchBar/SearchBar";
import RoomCard from "../../components/RoomCard/RoomCard";
import EmptyRoomsState from "../../components/ui/EmptyRoomsState";
import RoomCarousel from "../../components/RoomCard/RoomCarousel";
import { useLocation } from "react-router-dom";
import { adjustDateIfPastClosing } from "../../utils/timeUtils";
import { getPublicRooms, getRoomsAvailability } from "../../api/roomApi";

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
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const loadAllRooms = async () => {
    try {
      const data = await getPublicRooms();

      setFiltered(
        Array.isArray(data)
          ? data
          : []
      );
    } catch (err) {
      console.error(err);
      setFiltered([]);
    }
  };

  const handleShowAll = () => {
    setFilters(null);
    setSuggestedRooms([]);
    loadAllRooms();
  };

  const handleSearch = async (searchFilters) => {
    try {
      const adjustedFilters =
        adjustDateIfPastClosing(searchFilters);

      setFilters(adjustedFilters);
      setSuggestedRooms([]);

      const response =
        await getRoomsAvailability(adjustedFilters);

      const availabilityRooms =
        Array.isArray(response)
          ? response
          : response?.data || [];

      setFiltered(availabilityRooms);
    } catch (err) {
      console.error(err);

      setFiltered([]);
      setSuggestedRooms([]);
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

          {filtered && !filters && (
            <RoomCarousel rooms={filtered} />
          )}

          <section className="flex flex-col gap-8">

            {filters &&
              filtered &&
              filtered.length > 0 && (
                filtered.map(room => (
                  <RoomCard
                    key={room.id}
                    room={room}
                    filters={filters}
                    preview={false}
                  />
                ))
              )}

            {filters &&
              filtered &&
              filtered.length === 0 && (
                <EmptyRoomsState
                  people={filters.people}
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