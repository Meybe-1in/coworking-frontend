import AuditTable from "../../components/admin/tables/AuditTable";
import useAuditLogs from "../../components/admin/hooks/useAuditLogs";

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
  } = useAuditLogs();

  return (
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
      reloadAuditLogs={reloadAuditLogs}
    />
  );
}