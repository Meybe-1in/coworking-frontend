import { useEffect, useState } from "react";

import useAdminSettings from "../hooks/useAdminSettings";
import Loader from "../ui/Loader";
import Err from "../ui/Err";

import "./AdminSettings.css";

export default function AdminSettings() {
    const {
        settings,
        loading,
        error,
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

    useEffect(() => {
        if (!settings) return;

        setForm({
            openingTime: settings.openingTime || "",
            closingTime: settings.closingTime || "",
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

    if (loading) return <Loader />;

    if (error) return <Err msg={error} />;

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

            <div className="admin-settings__sections">

                <section className="admin-settings__card">
                    <div className="admin-settings__card-header">
                        <h2>Configuración de reservas</h2>

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
                                type="time"
                                value={form.openingTime}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        openingTime:
                                            e.target.value,
                                    })
                                }
                            />
                        </div>

                        <div className="admin-settings__field">
                            <label htmlFor="closingTime">
                                Hora de cierre
                            </label>

                            <input
                                id="closingTime"
                                type="time"
                                value={form.closingTime}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        closingTime:
                                            e.target.value,
                                    })
                                }
                            />
                        </div>

                        <div className="admin-settings__field">
                            <label htmlFor="maxReservationHours">
                                Duración máxima de reserva
                            </label>

                            <input
                                id="maxReservationHours"
                                type="number"
                                min="1"
                                value={
                                    form.maxReservationHours
                                }
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        maxReservationHours:
                                            e.target.value,
                                    })
                                }
                            />

                            <span>
                                Horas
                            </span>
                        </div>

                        <div className="admin-settings__field">
                            <label htmlFor="pendingExpirationMinutes">
                                Expiración de reservas pendientes
                            </label>

                            <input
                                id="pendingExpirationMinutes"
                                type="number"
                                min="1"
                                value={
                                    form.pendingExpirationMinutes
                                }
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        pendingExpirationMinutes:
                                            e.target.value,
                                    })
                                }
                            />

                            <span>
                                Minutos
                            </span>
                        </div>
                    </div>
                </section>

                <section className="admin-settings__card">
                    <div className="admin-settings__card-header">
                        <h2>Información institucional</h2>

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
                                type="text"
                                value={form.institutionName}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        institutionName:
                                            e.target.value,
                                    })
                                }
                            />
                        </div>

                        <div className="admin-settings__field">
                            <label htmlFor="institutionEmail">
                                Correo institucional
                            </label>

                            <input
                                id="institutionEmail"
                                type="email"
                                value={form.institutionEmail}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        institutionEmail:
                                            e.target.value,
                                    })
                                }
                            />
                        </div>

                        <div className="admin-settings__field">
                            <label htmlFor="institutionPhone">
                                Teléfono institucional
                            </label>

                            <input
                                id="institutionPhone"
                                type="tel"
                                value={form.institutionPhone}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        institutionPhone:
                                            e.target.value,
                                    })
                                }
                            />
                        </div>

                        <div className="admin-settings__field admin-settings__field--full">
                            <label htmlFor="institutionAddress">
                                Dirección institucional
                            </label>

                            <textarea
                                id="institutionAddress"
                                value={form.institutionAddress}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        institutionAddress:
                                            e.target.value,
                                    })
                                }
                                rows="3"
                            />
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}