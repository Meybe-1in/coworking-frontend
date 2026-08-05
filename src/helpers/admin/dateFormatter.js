export function formatRelativeDate(date) {

    const now = new Date();
    const activityDate = new Date(date);

    const diff =
        Math.floor(
            (now - activityDate) / 1000
        );

    if (diff < 60) {
        return "Hace unos segundos";
    }

    if (diff < 3600) {
        return `Hace ${Math.floor(diff / 60)} minutos`;
    }

    if (diff < 86400) {
        return `Hace ${Math.floor(diff / 3600)} horas`;
    }

    return activityDate.toLocaleDateString(
        "es-ES",
        {
            day: "numeric",
            month: "short",
            hour: "2-digit",
            minute: "2-digit",
        }
    );
}