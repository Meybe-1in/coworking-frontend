import AuditTable from "../../components/admin/tables/AuditTable";
import useAuditLogs from "../../components/admin/hooks/useAuditLogs";
import AuditFilters from "../../components/admin/filters/AuditFilters";

export default function AuditPage() {
  const {
    auditLogs,
    loading,
    error,
    page,
    size,
    totalPages,
    totalElements,
    setPage,
    setSize,
    reloadAuditLogs,
    appliedFilters,
    applyFilters,
    clearFilters,
    exportCSV,
    exporting,
    exportError,
  } = useAuditLogs();

  return (
    <>
      <AuditFilters
        auditLogs={auditLogs}
        totalElements={totalElements}
        loading={loading}
        reloadAuditLogs={reloadAuditLogs}
        appliedFilters={appliedFilters}
        applyFilters={applyFilters}
        clearFilters={clearFilters}
        exportCSV={exportCSV}
        exporting={exporting}
        exportError={exportError}
      />

      <AuditTable
        auditLogs={auditLogs}
        loading={loading}
        error={error}
        page={page}
        size={size}
        totalPages={totalPages}
        totalElements={totalElements}
        setPage={setPage}
        setSize={setSize}
      />
    </>
  );
}