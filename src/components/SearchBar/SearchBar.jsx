import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useReservationSettings from "../hooks/useReservationSettings";

import {
  getHourFromTime,
  getNextFullHour,
  formatHour,
  getStartHoursBySettings,
  getEndHoursBySettings,
} from "../../utils/timeSlots";

export default function SearchBar({ onSearch, filters }) {
  const {
    settings,
    loading: settingsLoading,
    error: settingsError,
  } = useReservationSettings();

  const [localFilters, setLocalFilters] = useState({
    date: "",
    start: "",
    end: "",
    people: "1",
    autoAdjusted: false,
  });

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const now = new Date();
  const today = formatDate(now);

  useEffect(() => {
    if (filters) {
      setLocalFilters({
        date: filters.date || "",
        start: filters.start || "",
        end: filters.end || "",
        people: filters.people || "1",
        autoAdjusted: filters.autoAdjusted || false,
      });
    }
  }, [filters]);

  useEffect(() => {
    if (!settings || filters?.date) return;

    const openingHour = getHourFromTime(settings.openingTime);
    const closingHour = getHourFromTime(settings.closingTime);

    const nextHour = getNextFullHour(now);

    let defaultDate = today;
    let startHour = Math.max(openingHour, nextHour);
    let autoAdjusted = false;

    if (startHour >= closingHour) {
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);

      defaultDate = formatDate(tomorrow);
      startHour = openingHour;
      autoAdjusted = true;
    }

    setLocalFilters((prev) => ({
      ...prev,
      date: defaultDate,
      start: formatHour(startHour),
      end: formatHour(
        Math.min(
          startHour + 1,
          closingHour,
          startHour + settings.maxReservationHours
        )
      ),
      autoAdjusted,
    }));
  }, [settings, filters]);

  const getStartHours = () => {
    if (!settings || !localFilters.date) return [];

    return getStartHoursBySettings(
      settings,
      localFilters.date,
      today
    );
  };

  const getEndHours = () => {
    if (!settings || !localFilters.start) return [];

    return getEndHoursBySettings(
      localFilters.start,
      settings
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    let updated = {
      ...localFilters,
      [name]: value,
    };

    if (name === "start") {
      const endHours = getEndHoursBySettings(
        value,
        settings
      );

      updated.end = endHours[0] || "";
    }

    if (name === "date") {
      const startHours = getStartHoursBySettings(
        settings,
        value,
        today
      );

      const firstHour = startHours[0];

      updated.start = firstHour || "";
      updated.end = firstHour
        ? getEndHoursBySettings(firstHour, settings)[0] || ""
        : "";

      updated.autoAdjusted = false;
    }

    setLocalFilters(updated);
  };

  const handleSearch = () => {
    if (
      !localFilters.date ||
      !localFilters.start ||
      !localFilters.end ||
      localFilters.start >= localFilters.end
    ) {
      Swal.fire({
        icon: "warning",
        title: "Horario inválido",
        text: "Selecciona un horario válido para realizar la reserva.",
      });
      return;
    }

    const startHour = parseInt(
      localFilters.start.split(":")[0],
      10
    );

    const endHour = parseInt(
      localFilters.end.split(":")[0],
      10
    );

    const reservationHours = endHour - startHour;

    if (reservationHours > settings.maxReservationHours) {
      Swal.fire({
        icon: "warning",
        title: "Duración máxima excedida",
        text: `No se puede reservar una sala por más de ${settings.maxReservationHours} horas.`,
      });
      return;
    }

    onSearch(localFilters);
  };

  const inputClass =
    "h-10 rounded bg-gray-200 text-center text-lg font-medium focus:outline focus:outline-sky-500";

  if (settingsLoading) {
    return (
      <section className="bg-white shadow-lg rounded-lg p-4 sm:p-6">
        <p className="text-gray-600">
          Cargando configuración de reservas...
        </p>
      </section>
    );
  }

  if (settingsError || !settings) {
    return (
      <section className="bg-white shadow-lg rounded-lg p-4 sm:p-6">
        <p className="text-red-600">
          No se pudo cargar la configuración de reservas.
        </p>
      </section>
    );
  }

  return (
    <section className="bg-white shadow-lg rounded-lg p-4 sm:p-6">
      <div className="bg-sky-500 text-white px-6 py-2 rounded-t-md w-fit text-xl font-medium">
        Iniciar Reserva
      </div>

      {localFilters.autoAdjusted && (
        <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-md mt-4">
          Las reservas para hoy han finalizado. Mostrando
          disponibilidad para mañana.
        </div>
      )}

      <div
        className="
          mt-4 grid gap-4
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-5
          items-end
        "
      >
        {/* Fecha */}
        <div className="flex flex-col gap-1">
          <label className="font-medium">Fecha</label>

          <input
            type="date"
            name="date"
            value={localFilters.date}
            min={today}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        {/* Hora inicio */}
        <div className="flex flex-col gap-1">
          <label className="font-medium">Hora Inicio</label>

          <select
            name="start"
            value={localFilters.start}
            onChange={handleChange}
            className={inputClass}
          >
            {getStartHours().map((hour) => (
              <option key={hour} value={hour}>
                {hour}
              </option>
            ))}
          </select>
        </div>

        {/* Hora fin */}
        <div className="flex flex-col gap-1">
          <label className="font-medium">Hora Fin</label>

          <select
            name="end"
            value={localFilters.end}
            onChange={handleChange}
            className={inputClass}
          >
            {getEndHours().map((hour) => (
              <option key={hour} value={hour}>
                {hour}
              </option>
            ))}
          </select>
        </div>

        {/* Personas */}
        <div className="flex flex-col gap-1">
          <label className="font-medium">Personas</label>

          <input
            type="number"
            name="people"
            min="1"
            value={localFilters.people}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        {/* Botón */}
        <button
          onClick={handleSearch}
          className="
            h-10 flex items-center justify-center
            border-2 border-sky-500 text-sky-500
            font-bold rounded
            hover:bg-sky-500 hover:text-white transition
          "
        >
          Buscar Sala
        </button>
      </div>
    </section>
  );
}