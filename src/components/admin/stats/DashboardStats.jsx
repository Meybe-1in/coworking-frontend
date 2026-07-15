import StatCard from "./StatCard";
import Loader from "../ui/Loader";
import Err from "../ui/Err";
import { fmt } from "../../../helpers/admin/formatters";
import "./DashboardStats.css";
export default function DashboardStats({
  stats,
  loading,
  error,
  setTab,
  ICONS,
  Icon,
}) {
  if (loading) return <Loader />;

  if (error) return <Err msg={error} />;

  return (
    <div>
      <h1 className="dashboard-title">
        Dashboard
      </h1>

      <p className="dashboard-subtitle">
        Resumen general del sistema
      </p>

      {stats && (
        <>
          <div className="dashboard-grid-2">
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

          <div className="dashboard-grid-4">
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
            <div className="dashboard-expired">
              <StatCard
                label="Expiradas"
                value={stats.expiredReservations}
                icon={ICONS.clock}
                accent="#9ca3af"
              />
            </div>
          )}

          <div className="dashboard-quick-access">
            <p className="dashboard-quick-access-title">
              Acceso rápido
            </p>

            <div className="dashboard-quick-access-actions">
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
                {
                  label: "Ver salas",
                  tab: "rooms",
                  icon: ICONS.room,
                },
              ].map((a) => (
                <button
                  key={a.tab}
                  onClick={() => setTab(a.tab)}
                  className="dashboard-quick-access-btn"
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