import RoomActions from "../rooms/RoomActions";
import { idColumn } from "../../../helpers/admin/tableColumns";
import Badge from "../ui/Badge";

export const roomColumns = (handleEdit, handleDelete) => [
  idColumn,

  {
    key: "name",
    label: "Nombre",
  },

  {
    key: "capacity",
    label: "Capacidad",
    render: (r) =>
      `${r.capacity} personas`,
  },

  {
    key: "price",
    label: "Precio",
    render: (r) =>
      `$${r.price}`,
  },

  {
    key: "location",
    label: "Ubicación",
  },

  {
    key: "available",
    label: "Disponible",
    render: (r) => (
      <Badge
        active={r.available}
        activeText="Disponible"
        inactiveText="No disponible"
      />
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