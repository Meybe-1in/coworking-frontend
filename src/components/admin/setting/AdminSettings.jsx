import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import useAdminSettings from "../hooks/useAdminSettings";
import Loader from "../ui/Loader";
import Err from "../ui/Err";

import "./AdminSettings.css";

export default function AdminSettings() {
    const {
        settings,
        loading,
        saving,
        error,
        saveSettings,
    } = useAdminSettings();

    const [form, setForm] = useState({
        openingTime: "",
        closingTime: "",
        maxReservationHours: "",
        pendingExpirationMinutes: "",
        institutionName: "",
        institutionEmail: "",
        institutionPhone: "",
        institutionAddress: "",
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (!settings) return;

        setForm({
            openingTime: settings.openingTime
                ? settings.openingTime.slice(0, 5)
                : "",
            closingTime: settings.closingTime
                ? settings.closingTime.slice(0, 5)
                : "",
            maxReservationHours:
                settings.maxReservationHours ?? "",
            pendingExpirationMinutes:
                settings.pendingExpirationMinutes ?? "",
            institutionName:
                settings.institutionName || "",
            institutionEmail:
                settings.institutionEmail || "",
            institutionPhone:
                settings.institutionPhone || "",
            institutionAddress:
                settings.institutionAddress || "",
        });
    }, [settings]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm((current) => ({
            ...current,
            [name]: value,
        }));

        setErrors((current) => ({
            ...current,
            [name]: "",
            general: "",
        }));
    };

    const validate = () => {
        const newErrors = {};

        if (!form.openingTime) {
            newErrors.openingTime =
                "La hora de apertura es obligatoria.";
        }

        if (!form.closingTime) {
            newErrors.closingTime =
                "La hora de cierre es obligatoria.";
        }

        if (
            form.openingTime &&
            form.closingTime &&
            form.openingTime >= form.closingTime
        ) {
            newErrors.closingTime =
                "La hora de cierre debe ser posterior a la hora de apertura.";
        }

        if (
            !form.maxReservationHours ||
            Number(form.maxReservationHours) <= 0
        ) {
            newErrors.maxReservationHours =
                "La duración máxima debe ser mayor que 0.";
        }

        if (
            !form.pendingExpirationMinutes ||
            Number(form.pendingExpirationMinutes) <= 0
        ) {
            newErrors.pendingExpirationMinutes =
                "El tiempo de expiración debe ser mayor que 0.";
        }

        if (!form.institutionName.trim()) {
            newErrors.institutionName =
                "El nombre institucional es obligatorio.";
        }

        if (
            form.institutionEmail &&
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                form.institutionEmail
            )
        ) {
            newErrors.institutionEmail =
                "Ingresa un correo electrónico válido.";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validate()) {
            return;
        }

        const payload = {
            openingTime: form.openingTime,
            closingTime: form.closingTime,
            maxReservationHours:
                Number(form.maxReservationHours),
            pendingExpirationMinutes:
                Number(form.pendingExpirationMinutes),
            institutionName:
                form.institutionName.trim(),
            institutionEmail:
                form.institutionEmail.trim(),
            institutionPhone:
                form.institutionPhone.trim(),
            institutionAddress:
                form.institutionAddress.trim(),
        };

        try {
            await saveSettings(payload);

            await Swal.fire({
                icon: "success",
                title: "Configuración actualizada",
                text: "Los cambios se guardaron correctamente.",
                confirmButtonText: "Aceptar",
            });
        } catch {
            await Swal.fire({
                icon: "error",
                title: "Error al guardar",
                text:
                    "No fue posible actualizar la configuración. Inténtalo nuevamente.",
                confirmButtonText: "Aceptar",
            });
        }
    };

    if (loading) {
        return <Loader />;
    }

    if (error && !settings) {
        return <Err msg={error} />;
    }

    return (
        <div className="admin-settings">
            <div className="admin-settings__header">
                <div>
                    <h1>Configuración general</h1>

                    <p>
                        Administra los parámetros generales
                        del sistema.
                    </p>
                </div>
            </div>

            <form
                className="admin-settings__form"
                onSubmit={handleSubmit}
            >
                <div className="admin-settings__sections">

                    <section className="admin-settings__card">
                        <div className="admin-settings__card-header">
                            <h2>
                                Configuración de reservas
                            </h2>

                            <p>
                                Define los horarios y límites
                                aplicados a las reservas.
                            </p>
                        </div>

                        <div className="admin-settings__grid">
                            <div className="admin-settings__field">
                                <label htmlFor="openingTime">
                                    Hora de apertura
                                </label>

                                <input
                                    id="openingTime"
                                    name="openingTime"
                                    type="time"
                                    value={form.openingTime}
                                    onChange={handleChange}
                                />

                                {errors.openingTime && (
                                    <span className="admin-settings__error">
                                        {errors.openingTime}
                                    </span>
                                )}
                            </div>

                            <div className="admin-settings__field">
                                <label htmlFor="closingTime">
                                    Hora de cierre
                                </label>

                                <input
                                    id="closingTime"
                                    name="closingTime"
                                    type="time"
                                    value={form.closingTime}
                                    onChange={handleChange}
                                />

                                {errors.closingTime && (
                                    <span className="admin-settings__error">
                                        {errors.closingTime}
                                    </span>
                                )}
                            </div>

                            <div className="admin-settings__field">
                                <label htmlFor="maxReservationHours">
                                    Duración máxima de reserva
                                </label>

                                <input
                                    id="maxReservationHours"
                                    name="maxReservationHours"
                                    type="number"
                                    min="1"
                                    value={
                                        form.maxReservationHours
                                    }
                                    onChange={handleChange}
                                />

                                <span>Horas</span>

                                {errors.maxReservationHours && (
                                    <span className="admin-settings__error">
                                        {
                                            errors.maxReservationHours
                                        }
                                    </span>
                                )}
                            </div>

                            <div className="admin-settings__field">
                                <label htmlFor="pendingExpirationMinutes">
                                    Expiración de reservas pendientes
                                </label>

                                <input
                                    id="pendingExpirationMinutes"
                                    name="pendingExpirationMinutes"
                                    type="number"
                                    min="1"
                                    value={
                                        form.pendingExpirationMinutes
                                    }
                                    onChange={handleChange}
                                />

                                <span>Minutos</span>

                                {errors.pendingExpirationMinutes && (
                                    <span className="admin-settings__error">
                                        {
                                            errors.pendingExpirationMinutes
                                        }
                                    </span>
                                )}
                            </div>
                        </div>
                    </section>

                    <section className="admin-settings__card">
                        <div className="admin-settings__card-header">
                            <h2>
                                Información institucional
                            </h2>

                            <p>
                                Información que identifica a la
                                organización dentro del sistema.
                            </p>
                        </div>

                        <div className="admin-settings__grid">
                            <div className="admin-settings__field admin-settings__field--full">
                                <label htmlFor="institutionName">
                                    Nombre institucional
                                </label>

                                <input
                                    id="institutionName"
                                    name="institutionName"
                                    type="text"
                                    value={
                                        form.institutionName
                                    }
                                    onChange={handleChange}
                                />

                                {errors.institutionName && (
                                    <span className="admin-settings__error">
                                        {errors.institutionName}
                                    </span>
                                )}
                            </div>

                            <div className="admin-settings__field">
                                <label htmlFor="institutionEmail">
                                    Correo institucional
                                </label>

                                <input
                                    id="institutionEmail"
                                    name="institutionEmail"
                                    type="email"
                                    value={
                                        form.institutionEmail
                                    }
                                    onChange={handleChange}
                                />

                                {errors.institutionEmail && (
                                    <span className="admin-settings__error">
                                        {errors.institutionEmail}
                                    </span>
                                )}
                            </div>

                            <div className="admin-settings__field">
                                <label htmlFor="institutionPhone">
                                    Teléfono institucional
                                </label>

                                <input
                                    id="institutionPhone"
                                    name="institutionPhone"
                                    type="tel"
                                    value={
                                        form.institutionPhone
                                    }
                                    onChange={handleChange}
                                />

                                {errors.institutionPhone && (
                                    <span className="admin-settings__error">
                                        {errors.institutionPhone}
                                    </span>
                                )}
                            </div>

                            <div className="admin-settings__field admin-settings__field--full">
                                <label htmlFor="institutionAddress">
                                    Dirección institucional
                                </label>

                                <textarea
                                    id="institutionAddress"
                                    name="institutionAddress"
                                    value={
                                        form.institutionAddress
                                    }
                                    onChange={handleChange}
                                    rows="3"
                                />
                                {errors.institutionAddress && (
                                    <span className="admin-settings__error">
                                        {errors.institutionAddress}
                                    </span>
                                )}
                            </div>
                        </div>
                    </section>

                    <div className="admin-settings__actions">
                        <button
                            type="submit"
                            className="admin-settings__save"
                            disabled={saving}
                        >
                            {saving
                                ? "Guardando..."
                                : "Guardar cambios"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}