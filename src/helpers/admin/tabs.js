import { ICONS } from "./icons";

export const TABS = [
  {
    id: "dashboard",
    label: "Estadísticas",
    icon: ICONS.grid,
    path: "/admin/dashboard",
  },
  {
    id: "tables",
    label: "Tablas",
    icon: ICONS.list,
    children: [
      {
        id: "reservations",
        label: "Reservas",
        icon: ICONS.calendar,
        path: "/admin/reservations",
      },
      {
        id: "payments",
        label: "Pagos",
        icon: ICONS.credit,
        path: "/admin/payments",
      },

      {
        id: "rooms",
        label: "Salas",
        icon: ICONS.room,
        path: "/admin/rooms",
      },

      {
        id: "users",
        label: "Usuarios",
        icon: ICONS.users,
        path: "/admin/users",
      }
    ],
  },
];