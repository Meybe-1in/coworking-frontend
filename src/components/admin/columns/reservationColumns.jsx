import StatusPill from "../ui/StatusPill";
import ReservationActions from "../reservations/ReservationActions";

import {
  fmt,
  fmtDate,
  fmtDateTime,
} from "../../../helpers/admin/formatters";

export const reservationColumns = (
  reloadReservations
) => [
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
    key: "username",
    label: "Usuario",
  },

  {
    key: "roomName",
    label: "Sala",
  },

  {
    key: "startAt",
    label: "Inicio",
    render: (r) =>
      fmtDateTime(r.startAt),
  },

  {
    key: "endAt",
    label: "Fin",
    render: (r) =>
      fmtDateTime(r.endAt),
  },

  {
    key: "price",
    label: "Precio",
    render: (r) => fmt(r.price),
  },

  {
    key: "status",
    label: "Estado",
    render: (r) => (
      <StatusPill status={r.status} />
    ),
  },

  {
    key: "createdAt",
    label: "Creada",
    render: (r) =>
      fmtDate(r.createdAt),
  },

  {
    key: "actions",
    label: "Acciones",
    render: (r) => (
      <ReservationActions
        reservation={r}
        reloadReservations={
          reloadReservations
        }
      />
    ),
  },
];