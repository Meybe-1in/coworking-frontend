import { useNavigate } from "react-router-dom";
import StatCard from "./StatCard";
import Loader from "../ui/Loader";
import Err from "../ui/Err";
import { fmt } from "../../../helpers/admin/formatters";
import "./DashboardStats.css";

export default function DashboardStats({
  stats,
  loading,
  error,
  ICONS,
  Icon,
}) {
  const navigate = useNavigate();

  if (loading) return <Loader />;

  if (error) return <Err msg={error} />;

  if (!stats) return null;

  const financeMetrics = [
    {
      label: "Ingresos totales",
      value: fmt(stats.totalRevenue),
      icon: ICONS.dollar,
      accent: "#10b981",
    },
    {
      label: "Ingresos del mes",
      value: fmt(stats.monthlyRevenue),
      icon: ICONS.dollar,
      accent: "#6366f1",
    },
  ];

  const reservationMetrics = [
    {
      label: "Total reservas",
      value: stats.totalReservations,
      icon: ICONS.list,
      accent: "#3b82f6",
    },
    {
      label: "Pagadas",
      value: stats.activeReservations,
      icon: ICONS.check,
      accent: "#10b981",
    },
    {
      label: "Pendientes",
      value: stats.pendingReservations,
      icon: ICONS.clock,
      accent: "#f59e0b",
    },
    {
      label: "Canceladas",
      value: stats.cancelledReservations,
      icon: ICONS.ban,
      accent: "#ef4444",
    },
    {
      label: "Reservas hoy",
      value: stats.todayReservations,
      icon: ICONS.calendar,
      accent: "#0284c7",
    },
    {
      label: "Reservas del mes",
      value: stats.monthReservations,
      icon: ICONS.calendarCheck,
      accent: "#4f46e5",
    },
  ];

  if (stats.expiredReservations > 0) {
    reservationMetrics.push({
      label: "Expiradas",
      value: stats.expiredReservations,
      icon: ICONS.clock,
      accent: "#9ca3af",
    });
  }

  const userMetrics = [
    {
      label: "Usuarios registrados",
      value: stats.totalUsers,
      icon: ICONS.users,
      accent: "#2563eb",
    },
    {
      label: "Usuarios activos",
      value: stats.activeUsers,
      icon: ICONS.user,
      accent: "#16a34a",
    },
    {
      label: "Usuarios deshabilitados",
      value: stats.disabledUsers,
      icon: ICONS.ban,
      accent: "#dc2626",
    },
  ];

  const roomMetrics = [
    {
      label: "Salas registradas",
      value: stats.totalRooms,
      icon: ICONS.building,
      accent: "#7c3aed",
    },
    {
      label: "Salas disponibles",
      value: stats.availableRooms,
      icon: ICONS.check,
      accent: "#059669",
    },
    {
      label: "Salas no disponibles",
      value: stats.unavailableRooms,
      icon: ICONS.clock,
      accent: "#ea580c",
    },
  ];

  const renderSection = (title, metrics, columns = "dashboard-grid-4") => (
    <section className="dashboard-section">
      <div className="dashboard-section-header">
        <h2>{title}</h2>
      </div>

      <div className={columns}>
        {metrics.map((metric) => (
          <StatCard
            key={metric.label}
            {...metric}
          />
        ))}
      </div>
    </section>
  );

  return (
    <div>
      <h1 className="dashboard-title">
        Dashboard
      </h1>

      <p className="dashboard-subtitle">
        Resumen general del sistema
      </p>

      {renderSection(
        "",
        financeMetrics,
        "dashboard-grid-2"
      )}

      {renderSection(
        "Reservas",
        reservationMetrics
      )}

      {renderSection(
        "Usuarios",
        userMetrics
      )}

      {renderSection(
        "Salas",
        roomMetrics
      )}

      <div className="dashboard-quick-access">
        <p className="dashboard-quick-access-title">
          Acceso rápido
        </p>

        <div className="dashboard-quick-access-actions">
          {[
            {
              label: "Ver reservas",
              path: "/admin/reservations",
              icon: ICONS.list,
            },
            {
              label: "Ver pagos",
              path: "/admin/payments",
              icon: ICONS.credit,
            },
            {
              label: "Ver salas",
              path: "/admin/rooms",
              icon: ICONS.room,
            },
          ].map((action) => (
            <button
              key={action.path}
              onClick={() => navigate(action.path)}
              className="dashboard-quick-access-btn"
            >
              <Icon
                d={action.icon}
                size={15}
              />

              {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}