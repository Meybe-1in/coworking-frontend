import TableFilters from "../filters/TableFilters";
import DataTable from "../tables/DataTable";

import Icon from "../ui/Icon";
import { ICONS } from "../../../helpers/admin/icons";

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
    reloadAuditLogs,
}) {
    return (
        <>
            <TableFilters
                title="Auditoría"
                totalCount={totalElements}
                filteredCount={totalElements}
                onRefresh={reloadAuditLogs}
                Icon={Icon}
                ICONS={ICONS}
            />

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
        </>
    );
}