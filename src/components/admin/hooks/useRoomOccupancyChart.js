import { useCallback, useEffect, useState } from "react";
import { getRoomOccupancyChart } from "../../../api/adminDashboardApi";

export default function useRoomOccupancyChart() {

    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loadChartData = useCallback(async () => {

        setLoading(true);
        setError(null);

        try {

            const data = await getRoomOccupancyChart();
            setChartData(data);

        } catch {

            setError("Error al cargar la ocupación de salas");

        } finally {

            setLoading(false);

        }

    }, []);

    useEffect(() => {
        loadChartData();
    }, [loadChartData]);

    return {
        chartData,
        loading,
        error,
        reloadChart: loadChartData,
    };

}