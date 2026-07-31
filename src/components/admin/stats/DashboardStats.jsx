import { useNavigate } from "react-router-dom";
import StatCard from "./StatCard";
import Loader from "../ui/Loader";
import Err from "../ui/Err";

import DashboardReservationsChart from "./DashboardReservationsChart";
import { CHART_PERIODS } from "../../../helpers/admin/chartPeriods"; //import CHART_PERIODS from "../../../helpers/admin/chartPeriods";

import { fmt } from "../../../helpers/admin/formatters";
import "./DashboardStats.css";

export default function DashboardStats({
  stats,
  loading,
  error,

  chartData,
  chartLoading,
  chartError,

  period,
  setPeriod,

  ICONS,
  Icon,
}) {
  const navigate = useNavigate();

  if (loading) return <Loader />;

  if (error) return <Err msg={error} />;

  if (!stats) return null;

  const dashboardMetrics = [
    {
      label: "Ingresos totales",
      value: fmt(stats.totalRevenue),
      icon: ICONS.dollar,
      accent: "#10b981",
    },

    {
      label: "Total reservas",
      value: stats.totalReservations,
      icon: ICONS.list,
      accent: "#3b82f6",
    },

    {
      label: "Usuarios registrados",
      value: stats.totalUsers,
      icon: ICONS.users,
      accent: "#2563eb",
    },

    {
      label: "Salas registradas",
      value: stats.totalRooms,
      icon: ICONS.building,
      accent: "#7c3aed",
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
        dashboardMetrics,
        "dashboard-grid-4"
      )}

      <section className="dashboard-chart-grid">

        <DashboardReservationsChart
          title="Reservas"
          data={chartData}
          loading={chartLoading}
          error={chartError}
          period={period}
          setPeriod={setPeriod}
        />

      </section>

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