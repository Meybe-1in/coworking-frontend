import { formatRelativeDate } from "../../../helpers/admin/dateFormatter";

export const auditColumns = [
    {
        key: "adminName",
        label: "Administrador",
        render: (row) => row.adminName,
    },
    {
        key: "action",
        label: "Acción",
        render: (row) => row.action,
    },
    {
        key: "entityType",
        label: "Entidad",
        render: (row) => row.entityType,
    },
    {
        key: "entityId",
        label: "ID",
        render: (row) => row.entityId,
    },
    {
        key: "createdAt",
        label: "Fecha",
        render: (row) => formatRelativeDate(row.createdAt),
    },
];