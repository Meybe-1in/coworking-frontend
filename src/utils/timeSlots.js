import {DateTime} from "luxon";
export const formatHour = (hour) =>
  `${String(hour).padStart(2, "0")}:00`;

export const generateHours = (start, end) =>
  Array.from(
    { length: end - start + 1 },
    (_, i) => formatHour(start + i)
  );

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