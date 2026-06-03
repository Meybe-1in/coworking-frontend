import StatusPill from "../ui/StatusPill";

import {
  fmt,
  fmtDateTime,
} from "../../../helpers/admin/formatters";

export const paymentColumns = (reloadPayments) => [

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
    key: "reservationId",
    label: "Reserva",
    render: (r) =>
      `#${r.reservationId}`,
  },

  {
    key: "roomName",
    label: "Sala",
  },

  {
    key: "amount",
    label: "Monto",
    render: (r) => fmt(r.amount),
  },

  {
    key: "currency",
    label: "Moneda",
  },

  {
    key: "status",
    label: "Estado",
    render: (r) => (
      <StatusPill status={r.status} />
    ),
  },

  {
    key: "paidAt",
    label: "Pagado el",
    render: (r) =>
      fmtDateTime(r.paidAt),
  },
];