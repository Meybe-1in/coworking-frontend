import { useMemo, useState } from "react";
import AdminSection from "./AdminSection";
import useRefresh from "../hooks/useRefresh";
import useTableFilters from "../hooks/useTableFilters";
import DataTable from "./DataTable";
import { exportPaymentsCSV } from "../../../api/adminApi";
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
    reloadPayments
  );
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
    <AdminSection
      title="Pagos"
      totalCount={payments.length}
      filteredCount={filtered.length}
      filters={{
        search,
        setSearch,
        searchPlaceholder:
          "Buscar pago, reserva o sala...",
        statusFilter,
        setStatusFilter,
        statuses: PAYMENT_STATUSES,
        onRefresh: refresh,
        refreshing,
        onExport:
          handleExportPayments,
        exportLabel:
          "Exportar pagos CSV",
        Icon,
        ICONS,
      }}
      table={{
        loading,
        error,
        rows: filtered,
        cols: payCol,
        emptyMsg:
          "No hay pagos registrados",
      }}
    />
  );
}