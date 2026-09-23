import { DateTime } from "luxon";

export const formatHour = (hour) =>
  `${String(hour).padStart(2, "0")}:00`;

export const generateHours = (start, end) =>
  Array.from(
    { length: end - start + 1 },
    (_, i) => formatHour(start + i)
  );

// Obtiene la hora numérica desde una configuración HH:mm:ss
export const getHourFromTime = (time) => {
  if (!time) return null;

  return parseInt(time.split(":")[0], 10);
};

// Obtiene la siguiente hora completa disponible
export const getNextFullHour = (date = new Date()) => {
  const currentHour = date.getHours();

  if (date.getMinutes() > 0 || date.getSeconds() > 0) {
    return currentHour + 1;
  }

  return currentHour;
};

// Genera las horas de inicio permitidas
export const getStartHoursBySettings = (settings, date, today) => {
  if (!settings) return [];

  const openingHour = getHourFromTime(settings.openingTime);
  const closingHour = getHourFromTime(settings.closingTime);

  if (openingHour === null || closingHour === null) {
    return [];
  }

  let startHour = openingHour;

  if (date === today) {
    startHour = Math.max(
      openingHour,
      getNextFullHour()
    );
  }

  const lastStartHour = closingHour - 1;

  if (startHour > lastStartHour) {
    return [];
  }

  return generateHours(startHour, lastStartHour);
};

// Genera las horas de finalización según duración máxima
export const getEndHoursBySettings = (start, settings) => {
  if (!start || !settings) return [];

  const closingHour = getHourFromTime(settings.closingTime);

  if (closingHour === null) {
    return [];
  }

  const startHour = parseInt(start.split(":")[0], 10);

  if (startHour >= closingHour) {
    return [];
  }

  return generateHours(
    startHour + 1,
    closingHour
  );
};

// Convierte reservas en horas bloqueadas
export const getBlockedHours = (reservations, selectedDate) => {
  const blocked = new Set();

  reservations.forEach(r => {
    const start = DateTime.fromISO(r.start, { zone: "utc" })
      .setZone("America/El_Salvador");

    const end = DateTime.fromISO(r.end, { zone: "utc" })
      .setZone("America/El_Salvador");

    if (start.toISODate() !== selectedDate) return;

    let currentHour = start.hour;
    const endHour = end.hour;

    while (currentHour < endHour) {
      blocked.add(formatHour(currentHour));
      currentHour++;
    }
  });

  return blocked;
};