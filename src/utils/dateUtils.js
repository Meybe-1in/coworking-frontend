import { DateTime } from "luxon";

export function toUTC(date, time) {
  return DateTime
    .fromISO(`${date}T${time}:00`, { zone: "America/El_Salvador" })
    .toUTC()
    .toISO();
}

export function toLocal(utcDate) {
  return DateTime
    .fromISO(utcDate, { zone: "utc" })
    .setZone("America/El_Salvador")
    .toFormat("yyyy-LL-dd HH:mm");
}