import useAdminResource from "./useAdminResource";
import { getAuditLogs } from "../../../api/auditApi";

export default function useAuditLogs() {
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
        getAuditLogs,
        "Error al cargar los registros de auditoría"
    );

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
    };
}