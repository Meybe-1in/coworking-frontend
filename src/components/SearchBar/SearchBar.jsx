import { useState } from "react";

export default function SearchBar({ onSearch }) {

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const now = new Date();
  const currentHour = now.getHours();

  const todayR = formatDate(now);

  // Si ya es tarde, iniciar mañana
  const isNextDay = currentHour >= 19;

  const defaultDate = new Date(now);

  if (isNextDay) {
    defaultDate.setDate(defaultDate.getDate() + 1);
  }

  const today = formatDate(defaultDate);

  const initialStartHour = isNextDay
    ? 7
    : Math.max(7, currentHour + 1);

  const formatHour = (hour) =>
    `${String(hour).padStart(2, "0")}:00`;

  const [filters, setFilters] = useState({
    date: today,
    start: formatHour(initialStartHour),
    end: formatHour(initialStartHour + 1),
    people: "1",
  });

  // Generar lista de horas
  const generateHours = (start, end) =>
    Array.from(
      { length: end - start + 1 },
      (_, i) => formatHour(start + i)
    );

  // Hora actual redondeada
  const getCurrentHour = () =>
    new Date().getHours() + 1;

  // Horas disponibles para inicio
  const getStartHours = () => {
    let startHour = 7;

    if (filters.date === todayR) {
      startHour = Math.max(7, getCurrentHour());
    }

    return generateHours(startHour, 19);
  };

  // Horas disponibles para fin
  const getEndHours = () => {
    const startHour =
      parseInt(filters.start.split(":")[0]) + 1;

    return generateHours(startHour, 20);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    let updated = { ...filters, [name]: value };

    if (name === "start") {
      const startHour = parseInt(value);
      updated.end = formatHour(startHour + 1);
    }

    if (name === "date") {
      let startHour = 7;

      if (value === todayR) {
        startHour = Math.max(7, getCurrentHour());
      }

      updated.start = formatHour(startHour);
      updated.end = formatHour(startHour + 1);
    }

    setFilters(updated);
  };

  const handleSearch = () => {
    if (!filters.date || filters.start >= filters.end) {
      alert("Horario inválido");
      return;
    }

    onSearch(filters);
  };

  const inputClass =
    "h-10 rounded bg-gray-200 text-center text-lg font-medium focus:outline focus:outline-sky-500";

  return (
    <section className="bg-white shadow-lg rounded-lg p-4 sm:p-6">

      <div className="bg-sky-500 text-white px-6 py-2 rounded-t-md w-fit text-xl font-medium">
        Iniciar Reserva
      </div>

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
            value={filters.date}
            min={isNextDay ? today : todayR}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        {/* Hora inicio */}
        <div className="flex flex-col gap-1">
          <label className="font-medium">Hora Inicio</label>
          <select
            name="start"
            value={filters.start}
            onChange={handleChange}
            className={inputClass}
          >
            {getStartHours().map((h) => (
              <option key={h}>{h}</option>
            ))}
          </select>
        </div>

        {/* Hora fin */}
        <div className="flex flex-col gap-1">
          <label className="font-medium">Hora Fin</label>
          <select
            name="end"
            value={filters.end}
            onChange={handleChange}
            className={inputClass}
          >
            {getEndHours().map((h) => (
              <option key={h}>{h}</option>
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
            value={filters.people}
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