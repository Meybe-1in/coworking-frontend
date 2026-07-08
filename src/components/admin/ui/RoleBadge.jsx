import "./styles/RoleBadge.css";

const ROLE_CONFIG = {
  ROLE_ADMIN: {
    text: "Administrador",
    className: "role-badge--admin",
  },

  ROLE_USER: {
    text: "Usuario",
    className: "role-badge--user",
  },
};

export default function RoleBadge({
  role,
}) {
  const config =
    ROLE_CONFIG[role] || {
      text: role,
      className: "role-badge--default",
    };

  return (
    <span
      className={`role-badge ${config.className}`}
    >
      {config.text}
    </span>
  );
}