import { useCallback, useEffect, useState } from "react";
import {
    Building2, Check, CheckCheck, CreditCard,
    RefreshCw, UserRoundX, Clock, X,
} from "lucide-react";
import {
    getAdminNotifications,
    getAdminUnreadNotificationCount,
    markAdminNotificationAsRead,
    markAllAdminNotificationsAsRead,
} from "../../../api/adminNotificationApi";
import "./AdminNotificationPanel.css";

const notificationIcons = {
    RESERVATION_EXPIRED: Clock,
    PAYMENT_FAILED: CreditCard,
    USER_BLOCKED: UserRoundX,
    ROOM_DELETED: Building2,
};

const formatDate = (date) => {
    if (!date) return "";

    return new Intl.DateTimeFormat("es-SV", {
        dateStyle: "short",
        timeStyle: "short",
    }).format(new Date(date));

};

export default function AdminNotificationPanel({
    onClose,
    onUnreadCountChange,
}) {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [markingAll, setMarkingAll] = useState(false);
    const [markingId, setMarkingId] = useState(null);

    const loadNotifications = useCallback(async (silent = false) => {
        if (!silent) {
            setLoading(true);
            setError(false);
        }

        try {
            const [data, unreadCount] = await Promise.all([
                getAdminNotifications(),
                getAdminUnreadNotificationCount(),
            ]);

            setNotifications(Array.isArray(data) ? data : []);
            onUnreadCountChange?.(Number(unreadCount) || 0);
            setError(false);
        } catch {
            if (!silent) setError(true);

        } finally {
            if (!silent) setLoading(false);
        }
    }, [onUnreadCountChange]);

    useEffect(() => {
        loadNotifications();
        const intervalId = window.setInterval(
            () => loadNotifications(true),
            15000);
        return () => window.clearInterval(intervalId);
    }, [loadNotifications]);

    const handleMarkAsRead = async (notification) => {
        if (notification.read || markingId !== null) return;

        setMarkingId(notification.id);

        try {
            await markAdminNotificationAsRead(notification.id);

            setNotifications((current) =>
                current.map((item) =>
                    item.id === notification.id
                        ? { ...item, read: true }
                        : item
                )
            );

            const unreadCount = await getAdminUnreadNotificationCount();
            onUnreadCountChange?.(Number(unreadCount));
        } catch {
            // El interceptor de Axios muestra el error de la petición.
        } finally {
            setMarkingId(null);
        }
    };

    const handleMarkAllAsRead = async () => {
        if (markingAll || notifications.every((item) => item.read)) return;

        setMarkingAll(true);

        try {
            await markAllAdminNotificationsAsRead();

            setNotifications((current) =>
                current.map((item) => ({ ...item, read: true }))
            );

            onUnreadCountChange?.(0);
        } catch {
            // El interceptor de Axios muestra el error de la petición.
        } finally {
            setMarkingAll(false);
        }
    };

    return (
        <section
            className="admin-notifications"
            aria-label="Centro de notificaciones"
        >
            <header className="admin-notifications__header">
                <div>
                    <h2>Notificaciones</h2>
                    <p>Eventos importantes del sistema</p>
                </div>

                <div className="admin-notifications__header-actions">
                    <button
                        type="button"
                        className="admin-notifications__icon-button"
                        onClick={() => loadNotifications()}
                        aria-label="Actualizar notificaciones"
                        disabled={loading}
                    >
                        <RefreshCw size={16} />
                    </button>

                    {onClose && (
                        <button
                            type="button"
                            className="admin-notifications__icon-button"
                            onClick={onClose}
                            aria-label="Cerrar notificaciones"
                        >
                            <X size={18} />
                        </button>
                    )}
                </div>
            </header>

            {!loading && !error && notifications.some((item) => !item.read) && (
                <div className="admin-notifications__toolbar">
                    <button
                        type="button"
                        onClick={() => handleMarkAllAsRead()}
                        disabled={markingAll}
                    >
                        <CheckCheck size={15} />
                        {markingAll
                            ? "Marcando..."
                            : "Marcar todas como leídas"}
                    </button>
                </div>
            )}

            <div className="admin-notifications__list">
                {loading ? (
                    <div className="admin-notifications__state">
                        Cargando notificaciones...
                    </div>
                ) : error ? (
                    <div className="admin-notifications__state">
                        <p>No se pudieron cargar las notificaciones.</p>
                        <button type="button" onClick={() => loadNotifications()}>
                            Intentar de nuevo
                        </button>
                    </div>
                ) : notifications.length === 0 ? (
                    <div className="admin-notifications__state">
                        <CheckCheck size={28} />
                        <p>No tienes notificaciones.</p>
                    </div>
                ) : (
                    notifications.map((notification) => {
                        const Icon =
                            notificationIcons[notification.type] || Clock;

                        return (
                            <article
                                key={notification.id}
                                className={[
                                    "admin-notifications__item",
                                    !notification.read
                                        ? "admin-notifications__item--unread"
                                        : "",
                                ]
                                    .filter(Boolean)
                                    .join(" ")}
                            >
                                <div className="admin-notifications__item-icon">
                                    <Icon size={18} />
                                </div>

                                <div className="admin-notifications__content">
                                    <h3>{notification.title}</h3>
                                    <p>{notification.message}</p>
                                    <time dateTime={notification.createdAt}>
                                        {formatDate(notification.createdAt)}
                                    </time>
                                </div>

                                {!notification.read && (
                                    <button
                                        type="button"
                                        className="admin-notifications__read-button"
                                        onClick={() =>
                                            handleMarkAsRead(notification)
                                        }
                                        disabled={markingId !== null}
                                        aria-label={`Marcar como leída: ${notification.title} `}
                                        title="Marcar como leída"
                                    >
                                        <Check size={16} />
                                    </button>
                                )}
                            </article>
                        );
                    })
                )}
            </div>
        </section>
    );

}
