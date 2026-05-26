import { useState, useEffect } from "react";
import { getAdminStats, getAllReservations, getAllPayments } from "../../api/adminApi";

// ─── Icons (inline SVG, no extra dep) ────────────────────────────────────────
const Icon = ({ d, size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);
const ICONS = {
  grid:    "M3 3h7v7H3zm11 0h7v7h-7zM3 14h7v7H3zm11 0h7v7h-7z",
  list:    "M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01",
  credit:  "M2 7a2 2 0 012-2h16a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V7zm0 5h20",
  check:   "M20 6L9 17l-5-5",
  x:       "M18 6L6 18M6 6l12 12",
  clock:   "M12 2a10 10 0 100 20A10 10 0 0012 2zm0 6v4l3 3",
  dollar:  "M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6",
  refresh: "M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15",
  eye:     "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zm11-3a3 3 0 100 6 3 3 0 000-6z",
  ban:     "M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636",
};

// ─── Status pill ──────────────────────────────────────────────────────────────
const STATUS_STYLES = {
  PAID:      { bg: "#d1fae5", color: "#065f46", label: "Pagada" },
  ACTIVE:    { bg: "#d1fae5", color: "#065f46", label: "Activa" },
  PENDING:   { bg: "#fef3c7", color: "#92400e", label: "Pendiente" },
  CANCELLED: { bg: "#fee2e2", color: "#991b1b", label: "Cancelada" },
  EXPIRED:   { bg: "#f3f4f6", color: "#6b7280", label: "Expirada" },
  COMPLETED: { bg: "#dbeafe", color: "#1e40af", label: "Completada" },
  FAILED:    { bg: "#fee2e2", color: "#991b1b", label: "Fallida" },
};
const StatusPill = ({ status }) => {
  const s = STATUS_STYLES[status] ?? { bg: "#f3f4f6", color: "#374151", label: status };
  return (
    <span style={{
      background: s.bg, color: s.color,
      padding: "3px 10px", borderRadius: 99,
      fontSize: 12, fontWeight: 600, letterSpacing: ".3px",
      display: "inline-block"
    }}>{s.label}</span>
  );
};

// ─── Stat card ────────────────────────────────────────────────────────────────
const StatCard = ({ label, value, icon, accent }) => (
  <div style={{
    background: "#fff", borderRadius: 14, padding: "22px 24px",
    border: "1px solid #f0f0f0", boxShadow: "0 1px 3px rgba(0,0,0,.05)",
    display: "flex", alignItems: "flex-start", gap: 16,
    transition: "box-shadow .15s",
  }}
    onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,.09)"}
    onMouseLeave={e => e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,.05)"}
  >
    <div style={{
      width: 42, height: 42, borderRadius: 10,
      background: accent + "18", color: accent,
      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
    }}>
      <Icon d={icon} size={20} />
    </div>
    <div>
      <div style={{ fontSize: 23, fontWeight: 700, color: "#111", lineHeight: 1.1 }}>{value}</div>
      <div style={{ fontSize: 12.5, color: "#9ca3af", marginTop: 3, fontWeight: 500 }}>{label}</div>
    </div>
  </div>
);

// ─── Generic Table ────────────────────────────────────────────────────────────
const Table = ({ cols, rows, emptyMsg = "Sin datos" }) => (
  <div style={{ overflowX: "auto" }}>
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13.5 }}>
      <thead>
        <tr>
          {cols.map(c => (
            <th key={c.key} style={{
              textAlign: "left", padding: "10px 14px",
              color: "#9ca3af", fontWeight: 600, fontSize: 11.5,
              letterSpacing: ".6px", textTransform: "uppercase",
              borderBottom: "1px solid #f3f4f6", whiteSpace: "nowrap"
            }}>{c.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.length === 0 ? (
          <tr><td colSpan={cols.length} style={{ padding: "32px 0", textAlign: "center", color: "#d1d5db", fontSize: 14 }}>{emptyMsg}</td></tr>
        ) : rows.map((row, i) => (
          <tr key={i}
            style={{ borderBottom: "1px solid #f9fafb" }}
            onMouseEnter={e => e.currentTarget.style.background = "#fafafa"}
            onMouseLeave={e => e.currentTarget.style.background = ""}
          >
            {cols.map(c => (
              <td key={c.key} style={{ padding: "11px 14px", color: "#374151", verticalAlign: "middle" }}>
                {c.render ? c.render(row) : (row[c.key] ?? "—")}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// ─── Tab nav ──────────────────────────────────────────────────────────────────
const TABS = [
  { id: "stats",        label: "Dashboard",   icon: ICONS.grid },
  { id: "reservations", label: "Reservas",    icon: ICONS.list },
  { id: "payments",     label: "Pagos",       icon: ICONS.credit },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const fmt = (n) => new Intl.NumberFormat("es-SV", { style: "currency", currency: "USD" }).format(n ?? 0);
const fmtDate = (s) => s ? new Date(s).toLocaleDateString("es-SV", { day: "2-digit", month: "short", year: "numeric" }) : "—";
const fmtDateTime = (s) => s ? new Date(s).toLocaleString("es-SV", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }) : "—";

// ─── Main component ───────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const [tab, setTab] = useState("stats");
  const [stats, setStats] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState({});
  const [error, setError] = useState({});

  const load = async (key, fn, setter) => {
    setLoading(l => ({ ...l, [key]: true }));
    setError(e => ({ ...e, [key]: null }));
    try {
      const data = await fn();
      setter(data);
    } catch (err) {
      setError(e => ({ ...e, [key]: "Error al cargar datos" }));
    } finally {
      setLoading(l => ({ ...l, [key]: false }));
    }
  };

  useEffect(() => { load("stats", getAdminStats, setStats); }, []);
  useEffect(() => {
    if (tab === "reservations" && reservations.length === 0)
      load("reservations", getAllReservations, setReservations);
    if (tab === "payments" && payments.length === 0)
      load("payments", getAllPayments, setPayments);
  }, [tab]);

  // ── Reservation columns
  const resCols = [
    { key: "id",        label: "#",          render: r => <span style={{ color: "#d1d5db", fontFamily: "monospace" }}>#{r.id}</span> },
    { key: "username",  label: "Usuario" },
    { key: "roomName",  label: "Sala" },
    { key: "startAt",   label: "Inicio",     render: r => fmtDateTime(r.startAt) },
    { key: "endAt",     label: "Fin",        render: r => fmtDateTime(r.endAt) },
    { key: "price",     label: "Precio",     render: r => fmt(r.price) },
    { key: "status",    label: "Estado",     render: r => <StatusPill status={r.status} /> },
    { key: "createdAt", label: "Creada",     render: r => fmtDate(r.createdAt) },
  ];

  // ── Payment columns
  const payCol = [
    { key: "id",            label: "#",          render: r => <span style={{ color: "#d1d5db", fontFamily: "monospace" }}>#{r.id}</span> },
    { key: "reservationId", label: "Reserva",    render: r => `#${r.reservationId}` },
    { key: "roomName",      label: "Sala" },
    { key: "amount",        label: "Monto",      render: r => fmt(r.amount) },
    { key: "currency",      label: "Moneda" },
    { key: "status",        label: "Estado",     render: r => <StatusPill status={r.status} /> },
    { key: "paidAt",        label: "Pagado el",  render: r => fmtDateTime(r.paidAt) },
  ];

  // ── Render helpers
  const Loader = () => (
    <div style={{ textAlign: "center", padding: "48px 0", color: "#d1d5db" }}>
      <div style={{ fontSize: 13 }}>Cargando…</div>
    </div>
  );
  const Err = ({ msg }) => (
    <div style={{ padding: "32px", textAlign: "center", color: "#ef4444", fontSize: 13.5 }}>{msg}</div>
  );

  return (
    <div style={{
      minHeight: "100vh", background: "#f9fafb",
      fontFamily: "'DM Sans', system-ui, sans-serif",
      color: "#111"
    }}>
      {/* Google font */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');`}</style>

      {/* Header */}
      <header style={{
        background: "#fff", borderBottom: "1px solid #f0f0f0",
        padding: "0 32px", display: "flex", alignItems: "center",
        height: 60, gap: 12, position: "sticky", top: 0, zIndex: 10
      }}>
        <div style={{
          width: 28, height: 28, borderRadius: 7,
          background: "#111", display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          <Icon d={ICONS.grid} size={14} style={{ color: "#fff", stroke: "#fff" }} />
        </div>
        <span style={{ fontWeight: 700, fontSize: 15, letterSpacing: "-.2px" }}>Admin</span>
        <span style={{
          marginLeft: "auto", fontSize: 12, color: "#9ca3af",
          background: "#f3f4f6", padding: "3px 10px", borderRadius: 99, fontWeight: 500
        }}>Panel de Control</span>
      </header>

      <div style={{ display: "flex", minHeight: "calc(100vh - 60px)" }}>
        {/* Sidebar */}
        <aside style={{
          width: 200, background: "#fff", borderRight: "1px solid #f0f0f0",
          padding: "24px 12px", flexShrink: 0, display: "flex", flexDirection: "column", gap: 4
        }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "9px 14px", borderRadius: 9, border: "none", cursor: "pointer",
              background: tab === t.id ? "#f3f4f6" : "transparent",
              color: tab === t.id ? "#111" : "#6b7280",
              fontWeight: tab === t.id ? 600 : 500,
              fontSize: 13.5, textAlign: "left", width: "100%",
              transition: "all .12s"
            }}>
              <Icon d={t.icon} size={16} />
              {t.label}
            </button>
          ))}
        </aside>

        {/* Content */}
        <main style={{ flex: 1, padding: "28px 32px", maxWidth: 1100 }}>

          {/* ── DASHBOARD ── */}
          {tab === "stats" && (
            <div>
              <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Dashboard</h1>
              <p style={{ fontSize: 13, color: "#9ca3af", marginBottom: 24 }}>Resumen general del sistema</p>

              {loading.stats && <Loader />}
              {error.stats   && <Err msg={error.stats} />}
              {stats && (
                <>
                  {/* Revenue row */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                    <StatCard label="Ingresos totales"   value={fmt(stats.totalRevenue)}   icon={ICONS.dollar}  accent="#10b981" />
                    <StatCard label="Ingresos del mes"   value={fmt(stats.monthlyRevenue)} icon={ICONS.dollar}  accent="#6366f1" />
                  </div>
                  {/* Reservations row */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
                    <StatCard label="Total reservas"    value={stats.totalReservations}     icon={ICONS.list}    accent="#3b82f6" />
                    <StatCard label="Activas (pagadas)" value={stats.activeReservations}    icon={ICONS.check}   accent="#10b981" />
                    <StatCard label="Pendientes"        value={stats.pendingReservations}   icon={ICONS.clock}   accent="#f59e0b" />
                    <StatCard label="Canceladas"        value={stats.cancelledReservations} icon={ICONS.ban}     accent="#ef4444" />
                  </div>
                  {stats.expiredReservations > 0 && (
                    <div style={{ marginTop: 14, maxWidth: 260 }}>
                      <StatCard label="Expiradas" value={stats.expiredReservations} icon={ICONS.clock} accent="#9ca3af" />
                    </div>
                  )}

                  {/* Quick actions */}
                  <div style={{
                    marginTop: 28, background: "#fff", border: "1px solid #f0f0f0",
                    borderRadius: 14, padding: "20px 24px"
                  }}>
                    <p style={{ fontSize: 12, fontWeight: 600, color: "#9ca3af", letterSpacing: ".5px", textTransform: "uppercase", marginBottom: 14 }}>Acceso rápido</p>
                    <div style={{ display: "flex", gap: 10 }}>
                      {[
                        { label: "Ver reservas",  tab: "reservations", icon: ICONS.list   },
                        { label: "Ver pagos",     tab: "payments",     icon: ICONS.credit },
                      ].map(a => (
                        <button key={a.tab} onClick={() => setTab(a.tab)} style={{
                          display: "flex", alignItems: "center", gap: 8,
                          padding: "9px 16px", borderRadius: 8, border: "1px solid #e5e7eb",
                          background: "#fff", cursor: "pointer", fontSize: 13.5,
                          fontWeight: 500, color: "#374151", transition: "all .12s"
                        }}
                          onMouseEnter={e => { e.currentTarget.style.background = "#f9fafb"; e.currentTarget.style.borderColor = "#d1d5db"; }}
                          onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.borderColor = "#e5e7eb"; }}
                        >
                          <Icon d={a.icon} size={15} />{a.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* ── RESERVAS ── */}
          {tab === "reservations" && (
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                <div>
                  <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 2 }}>Reservas</h1>
                  <p style={{ fontSize: 13, color: "#9ca3af" }}>{reservations.length} reservas en total</p>
                </div>
                <button onClick={() => load("reservations", getAllReservations, setReservations)}
                  style={{
                    display: "flex", alignItems: "center", gap: 7,
                    padding: "8px 14px", border: "1px solid #e5e7eb",
                    borderRadius: 8, background: "#fff", cursor: "pointer",
                    fontSize: 13, fontWeight: 500, color: "#6b7280"
                  }}>
                  <Icon d={ICONS.refresh} size={14} /> Actualizar
                </button>
              </div>
              <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #f0f0f0", overflow: "hidden" }}>
                {loading.reservations && <Loader />}
                {error.reservations   && <Err msg={error.reservations} />}
                {!loading.reservations && !error.reservations &&
                  <Table cols={resCols} rows={reservations} emptyMsg="No hay reservas aún" />
                }
              </div>
            </div>
          )}

          {/* ── PAGOS ── */}
          {tab === "payments" && (
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                <div>
                  <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 2 }}>Pagos</h1>
                  <p style={{ fontSize: 13, color: "#9ca3af" }}>{payments.length} transacciones</p>
                </div>
                <button onClick={() => load("payments", getAllPayments, setPayments)}
                  style={{
                    display: "flex", alignItems: "center", gap: 7,
                    padding: "8px 14px", border: "1px solid #e5e7eb",
                    borderRadius: 8, background: "#fff", cursor: "pointer",
                    fontSize: 13, fontWeight: 500, color: "#6b7280"
                  }}>
                  <Icon d={ICONS.refresh} size={14} /> Actualizar
                </button>
              </div>
              <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #f0f0f0", overflow: "hidden" }}>
                {loading.payments && <Loader />}
                {error.payments   && <Err msg={error.payments} />}
                {!loading.payments && !error.payments &&
                  <Table cols={payCol} rows={payments} emptyMsg="No hay pagos registrados" />
                }
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}