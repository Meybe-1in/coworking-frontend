export function formatAuditAction(action) {
  const actions = {
    ROOM_CREATED: "Sala creada",
    ROOM_UPDATED: "Sala actualizada",
    ROOM_DELETED: "Sala eliminada",
    USER_ACTIVATED: "Usuario activado",
    USER_DEACTIVATED: "Usuario desactivado",
    RESERVATION_CANCELLED: "Reserva cancelada",
  };

  return actions[action] || action;
}

export function formatAuditEntity(entityType) {
  const entities = {
    ROOM: "Sala",
    USER: "Usuario",
    RESERVATION: "Reserva",
  };

  return entities[entityType] || entityType;
}

export function formatAuditDate(date) {
  if (!date) return "-";

  return new Date(date).toLocaleString("es-SV", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}