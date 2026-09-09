import DataTable from "../tables/DataTable";

import { auditColumns } from "../columns/auditColumns";

export default function AuditTable({
    auditLogs,
    loading,
    error,
    page,
    size,
    totalPages,
    totalElements,
    setPage,
    setSize,
}) {
    return (
        <DataTable
            loading={loading}
            error={error}
            cols={auditColumns}
            rows={auditLogs}
            emptyMsg="No hay registros de auditoría"
            page={page}
            size={size}
            totalPages={totalPages}
            totalElements={totalElements}
            onPageChange={setPage}
            onSizeChange={setSize}
        />
    );
}