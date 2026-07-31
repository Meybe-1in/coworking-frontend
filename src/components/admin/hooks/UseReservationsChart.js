import { useCallback, useEffect, useState } from "react";
import { getReservationsChart } from "../../../api/adminDashboardApi";
import CHART_PERIODS from "../../../helpers/admin/chartPeriods";

export default function useReservationsChart() {

    const [chartData, setChartData] = useState(null);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(null);

    const [period, setPeriod] = useState(CHART_PERIODS.WEEK);


    const loadChartData = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await getReservationsChart(period);

            setChartData(data);

        } catch {
            setError("Error al cargar la gráfica de reservas");

        } finally {
            setLoading(false);
        }

    }, [period]);


    useEffect(() => {
        loadChartData();
    }, [loadChartData]);


    return {
        chartData,
        loading,
        error,

        period,
        setPeriod,

        reloadChart: loadChartData,
    };
}