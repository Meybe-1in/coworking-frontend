export function toUTC(date, time) {
  const local = new Date(`${date}T${time}`);
  return local.toISOString();
}

export function toLocal(utcDate) {
  return new Date(utcDate).toLocaleString();
}