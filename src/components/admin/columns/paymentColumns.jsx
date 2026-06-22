import StatusPill from "../ui/StatusPill";

import {
  fmt,
  fmtDateTime,
} from "../../../helpers/admin/formatters";
import { idColumn } from "../../../helpers/admin/tableColumns";

export const paymentColumns = (reloadPayments) => [

  idColumn,

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