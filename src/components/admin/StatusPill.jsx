const STATUS_CONFIG = {
  PENDING: {
    bg: "#fef3c7",
    color: "#d97706",
    label: "Pendiente",
  },
  PAID: {
    bg: "#dcfce7",
    color: "#16a34a",
    label: "Pagado",
  },
  CANCELLED: {
    bg: "#fee2e2",
    color: "#dc2626",
    label: "Cancelado",
  },
};

export default function StatusPill({ status }) {
  const config = STATUS_CONFIG[status] || {
    bg: "#f3f4f6",
    color: "#6b7280",
    label: status,
  };

  return (
    <span
      style={{
        background: config.bg,
        color: config.color,
        padding: "5px 10px",
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 600,
      }}
    >
      {config.label}
    </span>
  );
}