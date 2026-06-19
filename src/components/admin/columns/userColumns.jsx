export const userColumns = [
  {
    key: "id",
    label: "#",
    render: (u) => (
      <span
        style={{
          color: "#d1d5db",
          fontFamily: "monospace",
        }}
      >
        #{u.id}
      </span>
    ),
  },

  {
    key: "username",
    label: "Usuario",
  },

  {
    key: "email",
    label: "Correo",
  },

  {
    key: "roles",
    label: "Rol",
    render: (u) =>
      u.roles.join(", "),
  },

  {
    key: "enabled",
    label: "Estado",
    render: (u) => (
      <span
        style={{
          padding: "4px 10px",
          borderRadius: 999,
          fontSize: 12,
          fontWeight: 600,
          background: u.enabled
            ? "#dcfce7"
            : "#fee2e2",
          color: u.enabled
            ? "#166534"
            : "#991b1b",
        }}
      >
        {u.enabled
          ? "Activo"
          : "Inactivo"}
      </span>
    ),
  },
];