import { useCallback, useEffect, useState } from "react";
import { getRecentActivities } from "../../../api/adminDashboardApi";

export default function useRecentActivity() {

    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loadActivities = useCallback(async () => {

        setLoading(true);
        setError(null);

        try {

            const data = await getRecentActivities();
            setActivities(data);

        } catch {

            setError("Error al cargar las actividades recientes");

        } finally {

            setLoading(false);

        }

    }, []);

    useEffect(() => {
        loadActivities();
    }, [loadActivities]);

    return {
        activities,
        loading,
        error,
        reloadActivities: loadActivities,
    };

}