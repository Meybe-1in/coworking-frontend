import { useState, useCallback } from "react";
import useAdminResource from "./useAdminResource";
import { getAuditLogs, exportAuditLogsCSV } from "../../../api/auditApi";
import { downloadFile } from "../../../helpers/admin/downloadFile";

export default function useAuditLogs() {

    const [appliedFilters, setAppliedFilters] = useState({});

    const fetchAuditLogs = useCallback(
        (page, size) => getAuditLogs(
            page,
            size,
            appliedFilters
        ),
        [appliedFilters]
    );

    const {
        data,
        loading,
        error,
        page,
        size,
        totalPages,
        totalElements,
        setPage,
        setSize,
        reload,
    } = useAdminResource(
        fetchAuditLogs,
        "Error al cargar los registros de auditoría"
    );

    const applyFilters = useCallback(
        (filters) => {
            setAppliedFilters(filters);
            setPage(0);
        },
        [setPage]
    );

    const clearFilters = useCallback(() => {
        setAppliedFilters({});
        setPage(0);
    }, [setPage]);

    const exportCSV = useCallback(async () => {
        const blob =
            await exportAuditLogsCSV(
                appliedFilters
            );

        downloadFile(
            blob,
            "audit-logs.csv"
        );
    }, [appliedFilters]);

    return {
        auditLogs: data,
        loading,
        error,
        page,
        size,
        totalPages,
        totalElements,
        setPage,
        setSize,
        reloadAuditLogs: reload,
        appliedFilters,
        applyFilters,
        clearFilters,
        exportCSV,
    };
}