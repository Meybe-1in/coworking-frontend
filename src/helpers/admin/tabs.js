import { ICONS } from "./icons";

export const TABS = [
  {
    id: "stats",
    label: "Estadísticas",
    icon: ICONS.grid,
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
      },
      {
        id: "payments",
        label: "Pagos",
        icon: ICONS.credit,
      },

      {
        id: "rooms",
        label: "Salas",
        icon: ICONS.room,
      }
    ],
  },
];