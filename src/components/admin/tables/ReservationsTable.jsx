import { useMemo, useState } from "react";
import AdminTable from "./AdminTable";
import Loader from "../ui/Loader";
import Err from "../ui/Err";
import TableFilters from "../filters/TableFilters";

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
  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("ALL");

  const [refreshing, setRefreshing] =
    useState(false);

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

  const handleRefresh =
    async () => {
      setRefreshing(true);
      await reloadReservations();
      setRefreshing(false);
    };

  return (
    <div>
      <TableFilters
        title="Reservas"
        totalCount={
          reservations.length
        }
        filteredCount={
          filtered.length
        }
        search={search}
        setSearch={setSearch}
        searchPlaceholder="Buscar usuario o sala..."
        statusFilter={statusFilter}
        setStatusFilter={
          setStatusFilter
        }
        statuses={STATUSES}
        onRefresh={handleRefresh}
        refreshing={refreshing}
        Icon={Icon}
        ICONS={ICONS}
      />

      <div
        style={{
          background: "#fff",
          borderRadius: 14,
          border: "1px solid #f0f0f0",
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
              cols={resCols}
              rows={filtered}
              emptyMsg="No hay reservas aún"
            />
          )}
      </div>
    </div>
  );
}