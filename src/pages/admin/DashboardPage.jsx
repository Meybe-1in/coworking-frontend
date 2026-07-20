import DashboardStats from "../../components/admin/stats/DashboardStats";

import useAdminStats from "../../components/admin/hooks/useAdminStats";

import Icon from "../../components/admin/ui/Icon";
import { ICONS } from "../../helpers/admin/icons";

export default function DashboardPage() {
  const {
    stats,
    loading,
    error,
  } = useAdminStats();

  return (
    <DashboardStats
      stats={stats}
      loading={loading}
      error={error}
      ICONS={ICONS}
      Icon={Icon}
    />
  );
}