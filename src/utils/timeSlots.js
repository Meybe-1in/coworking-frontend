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
    const start = new Date(r.start);
    const end = new Date(r.end);

    let currentHour = start.getHours();
    const endHour = end.getHours();

    while (currentHour < endHour) {
      const hourStr = formatHour(currentHour);
      blocked.add(hourStr);
      currentHour++;
    }
  });

  return blocked;
};