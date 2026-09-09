import { useState, useCallback } from "react";
import useAdminResource from "./useAdminResource";
import { getAuditLogs, exportAuditLogsCSV } from "../../../api/auditApi";
import { downloadFile } from "../../../helpers/admin/downloadFile";

export default function useAuditLogs() {

    const [appliedFilters, setAppliedFilters] = useState({});
    const [exporting, setExporting] = useState(false);
    const [exportError, setExportError] = useState("");

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
            setExportError("");
            setPage(0);
        },
        [setPage]
    );

    const clearFilters = useCallback(() => {
        setAppliedFilters({});
        setExportError("");
        setPage(0);
    }, [setPage]);

    const exportCSV = useCallback(async () => {
        setExporting(true);
        setExportError("");
        try {
            const blob =
                await exportAuditLogsCSV(
                    appliedFilters
                );

            downloadFile(
                blob,
                "audit-logs.csv"
            );
        } catch (error) {
            setExportError("Error al exportar los registros de auditoría");
        } finally {
            setExporting(false);
        }
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
        exporting,
        exportError,
    };
}