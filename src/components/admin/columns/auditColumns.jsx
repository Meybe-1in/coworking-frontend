import {
  formatAuditAction,
  formatAuditEntity,
  formatAuditDate,
  getAuditActionClass,
} from "../../../helpers/admin/auditFormatter";

import "../ui/styles/AuditBadge.css";

export const auditColumns = [
  {
    key: "adminName",
    label: "Administrador",
    render: (row) => row.adminName,
  },
  {
    key: "action",
    label: "Acción",
    render: (row) => (
      <span className={getAuditActionClass(row.action)}>
        {formatAuditAction(row.action)}
      </span>
    ),
  },
  {
    key: "entityType",
    label: "Entidad",
    render: (row) => (
      <span className="audit-entity">
        {formatAuditEntity(row.entityType)}
      </span>
    ),
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