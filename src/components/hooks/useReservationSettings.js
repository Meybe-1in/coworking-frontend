import { useEffect, useState } from "react";

import { getReservationSettings } from "../../api/reservationSettings";

export default function useReservationSettings() {
    const [settings, setSettings] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadSettings = async () => {
        try {
            setLoading(true);
            setError("");

            const data = await getReservationSettings();

            setSettings(data);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Error al cargar la configuración de reservas"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadSettings();
    }, []);

    return {
        settings,
        loading,
        error,
        loadSettings,
    };
}