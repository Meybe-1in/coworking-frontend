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
        path: "/admin/reservations",
      },
      {
        id: "payments",
        label: "Pagos",
        path: "/admin/payments",
      },

      {
        id: "rooms",
        label: "Salas",
        path: "/admin/rooms",
      },

      {
        id: "users",
        label: "Usuarios",
        path: "/admin/users",
      }
    ],
  },

  {
    id: "reports",
    label: "Reportes",
    icon: ICONS.book,
    children: [
      {
        id: "report-reservations",
        label: "Reservas",
        path: "/admin/reports/reservations",
      },
      {
        id: "report-financial",
        label: "Financiero",
        path: "/admin/reports/financial",
      },
      {
        id: "report-room-usage",
        label: "Uso de salas",
        path: "/admin/reports/room-usage",
      },
    ],
  },
];