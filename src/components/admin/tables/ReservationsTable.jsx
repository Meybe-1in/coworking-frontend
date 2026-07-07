import { useMemo, useState } from "react";
import AdminSection from "./AdminSection";
import useRefresh from "../hooks/useRefresh";
import useTableFilters from "../hooks/useTableFilters";
import DataTable from "./DataTable";
import { exportReservationsCSV } from "../../../api/adminApi";
import { downloadFile } from "../../../helpers/admin/downloadFile";

const STATUSES = [
  { value: "ALL", label: "Todos los estados" },
  { value: "PENDING", label: "Pendiente" },
  { value: "PAID", label: "Pagada" },
  { value: "CANCELLED", label: "Cancelada" },
  { value: "EXPIRED", label: "Expirada" },
];

export default function ReservationsTable({
  reservations,
  loading,
  error,
  reloadReservations,
  resCols,
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
    reloadReservations
  );

  const filtered = useMemo(() => {
    return reservations.filter((r) => {
      const term =
        search.toLowerCase().trim();

      const matchSearch =
        !term ||
        r.username
          ?.toLowerCase()
          .includes(term) ||
        r.roomName
          ?.toLowerCase()
          .includes(term);

      const matchStatus =
        statusFilter === "ALL" ||
        r.status === statusFilter;

      return (
        matchSearch &&
        matchStatus
      );
    });
  }, [
    reservations,
    search,
    statusFilter,
  ]);

  const handleExportReservations =
    async () => {
      try {
        const blob =
          await exportReservationsCSV();

        downloadFile(
          blob,
          "reservations.csv"
        );
      } catch (error) {
        console.error(
          "Error exportando reservas",
          error
        );
      }
    };

  return (
    <AdminSection
      title="Reservas"
      totalCount={reservations.length}
      filteredCount={filtered.length}
      filters={{
        search,
        setSearch,
        searchPlaceholder:
          "Buscar usuario o sala...",

        filters: [
          {
            key: "status",
            label: "Estado",
            value: statusFilter,
            onChange: setStatusFilter,
            options: STATUSES,
          },
        ],

        onRefresh: refresh,
        refreshing,

        onExport:
          handleExportReservations,
        exportLabel:
          "Exportar reservas CSV",

        Icon,
        ICONS,
      }}
      table={{
        loading,
        error,
        cols: resCols,
        rows: filtered,
        emptyMsg: "No hay reservas aún",
      }}
    />
  );
}