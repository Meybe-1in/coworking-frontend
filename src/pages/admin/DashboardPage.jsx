import DashboardStats from "../../components/admin/stats/DashboardStats";

import useAdminStats from "../../components/admin/hooks/useAdminStats";
import useReservationsChart from "../../components/admin/hooks/useReservationsChart";

import Icon from "../../components/admin/ui/Icon";
import { ICONS } from "../../helpers/admin/icons";

export default function DashboardPage() {
  const {
    stats,
    loading,
    error,
  } = useAdminStats();

  const {
    chartData,
    loading: chartLoading,
    error: chartError,
    period,
    setPeriod,
  } = useReservationsChart();

  return (
    <DashboardStats
      stats={stats}
      loading={loading}
      error={error}

      chartData={chartData}
      chartLoading={chartLoading}
      chartError={chartError}

      period={period}
      setPeriod={setPeriod}
      
      ICONS={ICONS}
      Icon={Icon}
    />
  );
}