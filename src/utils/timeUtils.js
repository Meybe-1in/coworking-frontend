export const getAvailabilityMessage = (nextAvailable) => {
    if (!nextAvailable) return null;

    const now = new Date().getTime();
    const next = new Date(nextAvailable).getTime();

    const diffMinutes = Math.floor((next - now) / (1000 * 60));

    if (diffMinutes <= 15) {
        return "Se libera pronto";
    }

    if (diffMinutes <= 60) {
        return `Disponible en ${diffMinutes} min`;
    }

    return `Disponible desde ${new Date(nextAvailable).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    })}`;
};

export const getMessageColor = (nextAvailable) => {
    const now = new Date().getTime();
    const next = new Date(nextAvailable).getTime();
    const diffMinutes = (next - now) / (1000 * 60);

    if (diffMinutes <= 15) return "text-orange-500";
    if (diffMinutes <= 60) return "text-yellow-500";
    return "text-gray-600";
};

export const getButtonText = (isAvailable, room) => {
    if (isAvailable) return "Reservar ahora";

    if (!room.nextAvailable) return "No disponible";

    const now = new Date().getTime();
    const next = new Date(room.nextAvailable).getTime();
    const diffMinutes = (next - now) / (1000 * 60);

    if (diffMinutes <= 60) return "Reservar pronto";

    return "Ver horarios disponibles";
};