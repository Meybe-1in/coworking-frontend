import {
  formatAuditAction,
  formatAuditEntity,
  formatAuditDate,
} from "../../../helpers/admin/auditFormatter";

export const auditColumns = [
  {
    key: "adminName",
    label: "Administrador",
    render: (row) => row.adminName,
  },
  {
    key: "action",
    label: "Acción",
    render: (row) => formatAuditAction(row.action),
  },
  {
    key: "entityType",
    label: "Entidad",
    render: (row) => formatAuditEntity(row.entityType),
  },
  {
    key: "entityId",
    label: "ID",
    render: (row) => row.entityId,
  },
  {
    key: "createdAt",
    label: "Fecha",
    render: (row) => formatAuditDate(row.createdAt),
  },
];