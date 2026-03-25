import { describe, it, expect } from "vitest";
import { formatHour, generateHours, getBlockedHours } from "./timeSlots";

describe("timeSlots utils", () => {

  // -----------------------------
  // formatHour
  // -----------------------------
  it("formatea correctamente la hora", () => {
    expect(formatHour(7)).toBe("07:00");
    expect(formatHour(10)).toBe("10:00");
  });

  // -----------------------------
  // generateHours
  // -----------------------------
  it("genera rango de horas correctamente", () => {
    const hours = generateHours(7, 9);

    expect(hours).toEqual([
      "07:00",
      "08:00",
      "09:00"
    ]);
  });

  // -----------------------------
  // getBlockedHours
  // -----------------------------
  it("bloquea correctamente horas entre start y end", () => {
    const reservations = [
      {
        // 10:00 - 12:00 en El Salvador
        start: "2026-03-24T16:00:00.000Z",
        end: "2026-03-24T18:00:00.000Z"
      }
    ];

    const blocked = getBlockedHours(reservations, "2026-03-24");

    expect(blocked.has("10:00")).toBe(true);
    expect(blocked.has("11:00")).toBe(true);
    expect(blocked.has("12:00")).toBe(false); // FIN no se bloquea
  });

  it("respeta zona horaria de El Salvador", () => {
    const reservations = [
      {
        start: "2026-03-24T16:00:00.000Z", // 10:00 SV
        end: "2026-03-24T18:00:00.000Z"   // 12:00 SV
      }
    ];

    const blocked = getBlockedHours(reservations, "2026-03-24");

    expect(blocked.has("10:00")).toBe(true);
    expect(blocked.has("11:00")).toBe(true);
  });

  it("bloquea correctamente reservas solapadas", () => {
    const reservations = [
      {
        // 10-12 SV
        start: "2026-03-24T16:00:00.000Z",
        end: "2026-03-24T18:00:00.000Z"
      },
      {
        // 11-13 SV
        start: "2026-03-24T17:00:00.000Z",
        end: "2026-03-24T19:00:00.000Z"
      }
    ];

    const blocked = getBlockedHours(reservations, "2026-03-24");

    expect(blocked.has("10:00")).toBe(true);
    expect(blocked.has("11:00")).toBe(true);
    expect(blocked.has("12:00")).toBe(true);
  });

  it("maneja múltiples bloques separados correctamente", () => {
    const reservations = [
      {
        // 08-09
        start: "2026-03-24T14:00:00.000Z",
        end: "2026-03-24T15:00:00.000Z"
      },
      {
        // 15-17
        start: "2026-03-24T21:00:00.000Z",
        end: "2026-03-24T23:00:00.000Z"
      }
    ];

    const blocked = getBlockedHours(reservations, "2026-03-24");

    expect(blocked.has("08:00")).toBe(true);
    expect(blocked.has("15:00")).toBe(true);
    expect(blocked.has("16:00")).toBe(true);

    expect(blocked.has("10:00")).toBe(false); // libre
  });

  it("respeta correctamente los límites de horario", () => {
    const reservations = [
      {
        // 07-08
        start: "2026-03-24T13:00:00.000Z",
        end: "2026-03-24T14:00:00.000Z"
      },
      {
        // 19-20
        start: "2026-03-25T01:00:00.000Z",
        end: "2026-03-25T02:00:00.000Z"
      }
    ];

    const blocked = getBlockedHours(reservations, "2026-03-24");

    expect(blocked.has("07:00")).toBe(true);
    expect(blocked.has("19:00")).toBe(true);
    expect(blocked.has("20:00")).toBe(false); // nunca se bloquea fin
  });
});