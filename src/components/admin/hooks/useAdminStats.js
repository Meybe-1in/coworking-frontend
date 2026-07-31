import { useEffect, useState } from "react";

import { getAdminStats }
  from "../../../api/adminDashboardApi";

export default function useAdminStats() {
  const [stats, setStats] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState(null);

  const loadStats = async () => {
    setLoading(true);
    setError(null);

    try {
      const data =
        await getAdminStats();

      setStats(data);
    } catch {
      setError(
        "Error al cargar estadísticas"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  return {
    stats,
    loading,
    error,
    reloadStats: loadStats,
  };
}