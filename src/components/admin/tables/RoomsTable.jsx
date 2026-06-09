import { useMemo, useState } from "react";

import AdminTable from "./AdminTable";
import Loader from "../ui/Loader";
import Err from "../ui/Err";
import TableFilters from "../filters/TableFilters";

const STATUS_OPTIONS = [
  {
    value: "ALL",
    label: "Todas",
  },
  {
    value: "AVAILABLE",
    label: "Disponibles",
  },
  {
    value: "UNAVAILABLE",
    label: "No disponibles",
  },
];

export default function RoomsTable({
  rooms,
  loading,
  error,
  reloadRooms,
  roomCols,
  Icon,
  ICONS,
}) {
  const [search, setSearch] =
    useState("");

  const [statusFilter,
    setStatusFilter] =
    useState("ALL");

  const [refreshing,
    setRefreshing] =
    useState(false);

  const filtered = useMemo(() => {
    return rooms.filter((room) => {
      const term =
        search.toLowerCase().trim();

      const matchesSearch =
        !term ||
        room.name
          ?.toLowerCase()
          .includes(term) ||
        room.capacity
          ?.toString()
          .includes(term);

      const matchesStatus =
        statusFilter === "ALL" ||
        (statusFilter ===
          "AVAILABLE" &&
          room.available) ||
        (statusFilter ===
          "UNAVAILABLE" &&
          !room.available);

      return (
        matchesSearch &&
        matchesStatus
      );
    });
  }, [
    rooms,
    search,
    statusFilter,
  ]);

  const handleCreateRoom = () => {
    // Aquí iría la lógica para crear una nueva sala, como abrir un modal con un formulario
    alert("Crear nueva sala");
  };

  const handleRefresh =
    async () => {
      setRefreshing(true);

      await reloadRooms();

      setRefreshing(false);
    };

  return (
    <div>
      <TableFilters
        title="Salas"
        totalCount={rooms.length}
        filteredCount={
          filtered.length
        }
        search={search}
        setSearch={setSearch}
        searchPlaceholder="Buscar por nombre o capacidad..."
        statusFilter={statusFilter}
        setStatusFilter={
          setStatusFilter
        }
        statuses={STATUS_OPTIONS}
        onRefresh={handleRefresh}
        onCreate={handleCreateRoom}
        onExport={() =>
          alert("Exportar CSV")
        }
        refreshing={refreshing}
        Icon={Icon}
        ICONS={ICONS}
      />

      <div
        style={{
          background: "#fff",
          borderRadius: 14,
          border:
            "1px solid #f0f0f0",
          overflow: "hidden",
        }}
      >
        {loading && <Loader />}

        {error && (
          <Err msg={error} />
        )}

        {!loading &&
          !error && (
            <AdminTable
              cols={roomCols}
              rows={filtered}
              emptyMsg="No hay salas registradas"
            />
          )}
      </div>
    </div>
  );
}