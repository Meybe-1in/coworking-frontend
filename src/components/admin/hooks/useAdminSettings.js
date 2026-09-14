import { useEffect, useState } from "react";

import {
    getAdminSettings,
    updateAdminSettings,
} from "../../../api/adminSettings";

export default function useAdminSettings() {
    const [settings, setSettings] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const loadSettings = async () => {
        try {
            setLoading(true);
            setError("");

            const data = await getAdminSettings();

            setSettings(data);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Error al cargar la configuración"
            );
        } finally {
            setLoading(false);
        }
    };

    const saveSettings = async (settingsData) => {
        try {
            setSaving(true);
            setError("");

            const data = await updateAdminSettings(settingsData);

            setSettings(data);

            return data;
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Error al actualizar la configuración"
            );

            throw error;
        } finally {
            setSaving(false);
        }
    };

    useEffect(() => {
        loadSettings();
    }, []);

    return {
        settings,
        loading,
        saving,
        error,
        loadSettings,
        saveSettings,
    };
}