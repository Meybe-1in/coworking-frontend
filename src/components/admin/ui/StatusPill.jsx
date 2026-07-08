import "./styles/StatusPill.css";

const STATUS_CONFIG = {
  PENDING: {
    className: "status-pill--pending",
    label: "Pendiente",
  },
  PAID: {
    className: "status-pill--paid",
    label: "Pagado",
  },
  CANCELLED: {
    className: "status-pill--cancelled",
    label: "Cancelado",
  },
};

export default function StatusPill({
  status,
}) {
  const config =
    STATUS_CONFIG[status] || {
      className:
        "status-pill--default",
      label: status,
    };

  return (
    <span
      className={`status-pill ${config.className}`}
    >
      {config.label}
    </span>
  );
}