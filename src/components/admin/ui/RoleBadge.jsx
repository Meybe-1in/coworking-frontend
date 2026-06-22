export default function RoleBadge({
  role,
}) {
  const config = {
    ROLE_ADMIN: {
      text: "Administrador",
      background: "#ede9fe",
      color: "#6d28d9",
    },
    ROLE_USER: {
      text: "Usuario",
      background: "#dbeafe",
      color: "#1d4ed8",
    },
  };

  const badge =
    config[role] || {
      text: role,
      background: "#f3f4f6",
      color: "#374151",
    };

  return (
    <span
      style={{
        padding: "4px 10px",
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 600,
        background: badge.background,
        color: badge.color,
      }}
    >
      {badge.text}
    </span>
  );
}