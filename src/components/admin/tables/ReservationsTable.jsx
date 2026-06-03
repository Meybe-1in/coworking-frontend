import AdminTable from "./AdminTable";
import Loader from "../ui/Loader";
import Err from "../ui/Err";
import { useMemo, useState } from "react";

const STATUSES = [
  { value: "ALL",       label: "Todos los estados" },
  { value: "PENDING",   label: "Pendiente"         },
  { value: "PAID",      label: "Pagada"             },
  { value: "CANCELLED", label: "Cancelada"          },
  { value: "EXPIRED",   label: "Expirada"           },
];

const CONTROL_HEIGHT = 36;

const inputStyle = {
  height: CONTROL_HEIGHT,
  lineHeight: `${CONTROL_HEIGHT}px`,
  padding: "0 12px",
  border: "1px solid #e5e7eb",
  borderRadius: 8,
  fontSize: 13.5,
  background: "#fff",
  color: "#374151",
  outline: "none",
  boxSizing: "border-box",
  fontFamily: "inherit",
  display: "block",
};

const buttonStyle = {
  height: CONTROL_HEIGHT,
  padding: "0 14px",
  border: "1px solid #e5e7eb",
  borderRadius: 8,
  fontSize: 13.5,
  background: "#fff",
  color: "#374151",
  outline: "none",
  boxSizing: "border-box",
  fontFamily: "inherit",
  fontWeight: 500,
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  flexShrink: 0,
  margin: 0,
  WebkitAppearance: "none",
  appearance: "none",
};

export default function ReservationsTable({
  reservations,
  loading,
  error,
  reloadReservations,
  resCols,
  Icon,
  ICONS,
}) {
  const [search, setSearch]             = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [refreshing, setRefreshing]     = useState(false);

  const filtered = useMemo(() => {
    return reservations.filter((r) => {
      const term = search.toLowerCase().trim();
      const matchSearch =
        !term ||
        r.username?.toLowerCase().includes(term) ||
        r.roomName?.toLowerCase().includes(term);
      const matchStatus =
        statusFilter === "ALL" || r.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [reservations, search, statusFilter]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await reloadReservations();
    setRefreshing(false);
  };

  return (
    <div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      {/* ── Header ── */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 12,
        marginBottom: 20,
      }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, margin: 0, lineHeight: 1.2 }}>
            Reservas
          </h1>
          <p style={{ fontSize: 13, color: "#9ca3af", margin: "3px 0 0" }}>
            Mostrando {filtered.length} de {reservations.length} reservas
          </p>
        </div>

        {/* ── All three controls in one flex row, aligned center ── */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}>
          {/* Search input */}
          <input
            type="text"
            placeholder="Buscar usuario o sala…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ ...inputStyle, width: 220 }}
            onFocus={e => { e.target.style.borderColor = "#9ca3af"; }}
            onBlur={e  => { e.target.style.borderColor = "#e5e7eb"; }}
          />

          {/* Status select */}
          <div style={{ position: "relative", height: CONTROL_HEIGHT, display: "flex", alignItems: "center" }}>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{
                ...inputStyle,
                minWidth: 160,
                paddingRight: 30,
                appearance: "none",
                WebkitAppearance: "none",
                cursor: "pointer",
              }}
              onFocus={e => { e.target.style.borderColor = "#9ca3af"; }}
              onBlur={e  => { e.target.style.borderColor = "#e5e7eb"; }}
            >
              {STATUSES.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
            {/* Custom chevron */}
            <svg
              viewBox="0 0 10 6" width="10" height="6"
              style={{
                position: "absolute", right: 10, top: "50%",
                transform: "translateY(-50%)", pointerEvents: "none",
                fill: "none", stroke: "#9ca3af", strokeWidth: 1.6,
                strokeLinecap: "round", strokeLinejoin: "round",
              }}
            >
              <path d="M1 1l4 4 4-4" />
            </svg>
          </div>

          {/* Refresh button */}
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            style={{ ...buttonStyle, opacity: refreshing ? 0.6 : 1 }}
            onMouseEnter={e => { if (!refreshing) e.currentTarget.style.background = "#f9fafb"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#fff"; }}
          >
            <span style={{
              display: "inline-flex",
              alignItems: "center",
              animation: refreshing ? "spin 1s linear infinite" : "none",
            }}>
              <Icon d={ICONS.refresh} size={14} />
            </span>
            Actualizar
          </button>
        </div>
      </div>

      {/* ── Table card ── */}
      <div style={{
        background: "#fff",
        borderRadius: 14,
        border: "1px solid #f0f0f0",
        overflow: "hidden",
      }}>
        {loading && <Loader />}
        {error   && <Err msg={error} />}
        {!loading && !error && (
          <AdminTable
            cols={resCols}
            rows={filtered}
            emptyMsg="No hay reservas aún"
          />
        )}
      </div>
    </div>
  );
}