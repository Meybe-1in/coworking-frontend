import { useCallback, useEffect, useState } from "react";
import { getRevenueChart } from "../../../api/adminDashboardApi";
import { CHART_PERIODS } from "../../../helpers/admin/chartPeriods";

export default function useRevenueChart() {

    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [period, setPeriod] = useState(
        CHART_PERIODS.YEAR.value
    );

    const loadChartData = useCallback(async () => {

        setLoading(true);
        setError(null);

        try {

            const data = await getRevenueChart(period);
            setChartData(data);

        } catch {

            setError("Error al cargar la gráfica de ingresos");

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