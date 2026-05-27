import StatCard from "./StatCard";

export default function DashboardStats({
  stats,
  loading,
  error,
  setTab,
  Loader,
  Err,
  ICONS,
  fmt,
  Icon,
}) {
  return (
    <div>
      <h1
        style={{
          fontSize: 20,
          fontWeight: 700,
          marginBottom: 4,
        }}
      >
        Dashboard
      </h1>

      <p
        style={{
          fontSize: 13,
          color: "#9ca3af",
          marginBottom: 24,
        }}
      >
        Resumen general del sistema
      </p>

      {loading && <Loader />}

      {error && <Err msg={error} />}

      {stats && (
        <>
          {/* Revenue row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 14,
              marginBottom: 14,
            }}
          >
            <StatCard
              label="Ingresos totales"
              value={fmt(stats.totalRevenue)}
              icon={ICONS.dollar}
              accent="#10b981"
            />

            <StatCard
              label="Ingresos del mes"
              value={fmt(stats.monthlyRevenue)}
              icon={ICONS.dollar}
              accent="#6366f1"
            />
          </div>

          {/* Reservations row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 14,
            }}
          >
            <StatCard
              label="Total reservas"
              value={stats.totalReservations}
              icon={ICONS.list}
              accent="#3b82f6"
            />

            <StatCard
              label="Activas (pagadas)"
              value={stats.activeReservations}
              icon={ICONS.check}
              accent="#10b981"
            />

            <StatCard
              label="Pendientes"
              value={stats.pendingReservations}
              icon={ICONS.clock}
              accent="#f59e0b"
            />

            <StatCard
              label="Canceladas"
              value={stats.cancelledReservations}
              icon={ICONS.ban}
              accent="#ef4444"
            />
          </div>

          {stats.expiredReservations > 0 && (
            <div
              style={{
                marginTop: 14,
                maxWidth: 260,
              }}
            >
              <StatCard
                label="Expiradas"
                value={stats.expiredReservations}
                icon={ICONS.clock}
                accent="#9ca3af"
              />
            </div>
          )}

          {/* Quick actions */}
          <div
            style={{
              marginTop: 28,
              background: "#fff",
              border: "1px solid #f0f0f0",
              borderRadius: 14,
              padding: "20px 24px",
            }}
          >
            <p
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: "#9ca3af",
                letterSpacing: ".5px",
                textTransform: "uppercase",
                marginBottom: 14,
              }}
            >
              Acceso rápido
            </p>

            <div
              style={{
                display: "flex",
                gap: 10,
              }}
            >
              {[
                {
                  label: "Ver reservas",
                  tab: "reservations",
                  icon: ICONS.list,
                },
                {
                  label: "Ver pagos",
                  tab: "payments",
                  icon: ICONS.credit,
                },
              ].map((a) => (
                <button
                  key={a.tab}
                  onClick={() => setTab(a.tab)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "9px 16px",
                    borderRadius: 8,
                    border: "1px solid #e5e7eb",
                    background: "#fff",
                    cursor: "pointer",
                    fontSize: 13.5,
                    fontWeight: 500,
                    color: "#374151",
                    transition: "all .12s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background =
                      "#f9fafb";
                    e.currentTarget.style.borderColor =
                      "#d1d5db";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background =
                      "#fff";
                    e.currentTarget.style.borderColor =
                      "#e5e7eb";
                  }}
                >
                  <Icon d={a.icon} size={15} />
                  {a.label}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}