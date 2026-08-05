import DashboardStats from "../../components/admin/stats/DashboardStats";

import useAdminStats from "../../components/admin/hooks/useAdminStats";
import useReservationsChart from "../../components/admin/hooks/useReservationsChart";
import useRevenueChart from "../../components/admin/hooks/useRevenueChart";
import useRoomOccupancyChart from "../../components/admin/hooks/useRoomOccupancyChart";
import useRecentActivity from "../../components/admin/hooks/useRecentActivity";

import Icon from "../../components/admin/ui/Icon";
import { ICONS } from "../../helpers/admin/icons";

export default function DashboardPage() {
  // Estadísticas generales
  const {
    stats,
    loading,
    error,
  } = useAdminStats();

  // Reservas
  const {
    chartData,
    loading: chartLoading,
    error: chartError,
    period,
    setPeriod,
  } = useReservationsChart();

  // Ingresos
  const {
    chartData: revenueChartData,
    loading: revenueChartLoading,
    error: revenueChartError,
    period: revenuePeriod,
    setPeriod: setRevenuePeriod,
  } = useRevenueChart();

  // Ocupación de salas
  const {
    chartData: roomOccupancyData,
    loading: roomOccupancyLoading,
    error: roomOccupancyError,
  } = useRoomOccupancyChart();

  // Actividad reciente
  const {
    activities,
    loading: activitiesLoading,
    error: activitiesError,
  } = useRecentActivity();

  return (
    <DashboardStats
      stats={stats}
      loading={loading}
      error={error}

      reservationChartData={chartData}
      reservationChartLoading={chartLoading}
      reservationChartError={chartError}
      reservationPeriod={period}
      setReservationPeriod={setPeriod}

      revenueChartData={revenueChartData}
      revenueChartLoading={revenueChartLoading}
      revenueChartError={revenueChartError}
      revenuePeriod={revenuePeriod}
      setRevenuePeriod={setRevenuePeriod}

      roomOccupancyData={roomOccupancyData}
      roomOccupancyLoading={roomOccupancyLoading}
      roomOccupancyError={roomOccupancyError}

      recentActivities={activities}
      recentActivitiesLoading={activitiesLoading}
      recentActivitiesError={activitiesError}

      ICONS={ICONS}
      Icon={Icon}
    />
  );
}