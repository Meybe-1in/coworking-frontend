import { useMemo, useState } from "react";
import AdminTable from "./AdminTable";
import Loader from "../ui/Loader";
import Err from "../ui/Err";
import TableFilters from "../filters/TableFilters";
import {exportPaymentsCSV} from "../../../api/adminApi";
import { downloadFile } from "../../../helpers/admin/downloadFile";

const PAYMENT_STATUSES = [
  { value: "ALL", label: "Todos los estados" },
  { value: "PENDING", label: "Pendiente" },
  { value: "SUCCEEDED", label: "Pagado" },
  { value: "FAILED", label: "Fallido" },
];

export default function PaymentsTable({
  payments,
  loading,
  error,
  reloadPayments,
  payCol,
  Icon,
  ICONS,
}) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("ALL");

  const [refreshing, setRefreshing] =
    useState(false);

  const filtered = useMemo(() => {
    return payments.filter((payment) => {
      const term =
        search.toLowerCase().trim();

      const matchesSearch =
        !term ||
        payment.id
          ?.toString()
          .includes(term) ||
        payment.reservationId
          ?.toString()
          .includes(term) ||
        payment.roomName
          ?.toLowerCase()
          .includes(term);

      const matchesStatus =
        statusFilter === "ALL" ||
        payment.status === statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );
    });
  }, [
    payments,
    search,
    statusFilter,
  ]);

  const handleRefresh =
    async () => {
      setRefreshing(true);

      await reloadPayments();

      setRefreshing(false);
    };

  const handleExportPayments =
  async () => {
    try {
      const blob =
        await exportPaymentsCSV();
      downloadFile(blob, "payments.csv");
    } catch (err) {
      console.error(
        "Error al exportar pagos:",
        err
      );
    }
  };

  return (
    <div>
      <TableFilters
        title="Pagos"
        totalCount={payments.length}
        filteredCount={filtered.length}
        search={search}
        setSearch={setSearch}
        searchPlaceholder="Buscar pago, reserva o sala..."
        statusFilter={statusFilter}
        setStatusFilter={
          setStatusFilter
        }
        statuses={PAYMENT_STATUSES}
        onRefresh={handleRefresh}
        refreshing={refreshing}
        onExport={handleExportPayments}
        exportLabel="Exportar pagos CSV"
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
              cols={payCol}
              rows={filtered}
              emptyMsg="No hay pagos registrados"
            />
          )}
      </div>
    </div>
  );
}