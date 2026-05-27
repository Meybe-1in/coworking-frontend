export const fmt = (n) =>
  new Intl.NumberFormat("es-SV", {
    style: "currency",
    currency: "USD",
  }).format(n ?? 0);

export const fmtDate = (s) =>
  s
    ? new Date(s).toLocaleDateString("es-SV", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "—";

export const fmtDateTime = (s) =>
  s
    ? new Date(s).toLocaleString("es-SV", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "—";