import { useMemo, useState } from "react";
import DataTable from "./DataTable";
import AdminSection from "./AdminSection";
import useRefresh from "../hooks/useRefresh";
import useTableFilters from "../hooks/useTableFilters";
import CreateRoomModal from "../rooms/CreateRoomModal";

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
  const {
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
  } = useTableFilters();

  const {
    refreshing,
    refresh,
  } = useRefresh(
    reloadRooms
  );

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

  const [showCreateModal,
    setShowCreateModal] =
    useState(false);

  const handleCreateRoom = () => {
    setShowCreateModal(true);
  };

  return (
    <div>
      <AdminSection
        title="Salas"
        totalCount={rooms.length}
        filteredCount={
          filtered.length
        }
        filters={{
          search,
          setSearch,
          searchPlaceholder: "Buscar por nombre o capacidad...",
          statusFilter,
          setStatusFilter,
          statuses: STATUS_OPTIONS,
          onRefresh: refresh,
          onCreate: handleCreateRoom,
          refreshing,
          exportLabel: "Exportar CSV",
          Icon,
          ICONS,
        }}
        table={{
          loading,
          error,
          cols: roomCols,
          rows: filtered,
          emptyMsg: "No se encontraron salas.",
        }}
      />

      {/* Modals */}
      <CreateRoomModal
        open={showCreateModal}
        onClose={() =>
          setShowCreateModal(false)
        }
        reloadRooms={reloadRooms}
      />
    </div>
  );
}