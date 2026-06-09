import RoomActions from "../rooms/RoomActions";

export const roomColumns = (handleEdit, handleDelete) => [
  {
    key: "id",
    label: "#",
    render: (r) => (
      <span
        style={{
          color: "#d1d5db",
          fontFamily: "monospace",
        }}
      >
        #{r.id}
      </span>
    ),
  },

  {
    key: "name",
    label: "Nombre",
  },

  {
    key: "capacity",
    label: "Capacidad",
    render: (r) => `${r.capacity} personas`,
  },

  {
    key: "price",
    label: "Precio",
    render: (r) => `$${r.price}`,
  },

  {
    key: "location",
    label: "Ubicación",
  },

  {
    key: "available",
    label: "Disponible",
    render: (r) => (
      <span
        style={{
          padding: "4px 10px",
          borderRadius: 999,
          fontSize: 12,
          fontWeight: 600,
          background: r.available
            ? "#dcfce7"
            : "#fee2e2",
          color: r.available
            ? "#166534"
            : "#991b1b",
        }}
      >
        {r.available
          ? "Disponible"
          : "No disponible"}
      </span>
    ),
  },
  {
    key: "actions",
    label: "Acciones",
    render: (r) => (
      <RoomActions
        room={r}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    ),
  },
];