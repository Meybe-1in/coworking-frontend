import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const today = new Date().toISOString().split("T")[0];

  const getInitialHours = () => {
    const currentHour = new Date().getHours() + 1;
    const startHour = Math.max(7, currentHour);
    return {
      start: `${String(startHour).padStart(2, "0")}:00`,
      end: `${String(startHour + 1).padStart(2, "0")}:00`,
    };
  };

  const initialHours = getInitialHours();

  const [filters, setFilters] = useState({
    date: today,
    start: initialHours.start,
    end: initialHours.end,
    people: "1",
  });

  // Genera horas entre un rango
  const generateHours = (start, end) => {
    const hours = [];

    for (let i = start; i <= end; i++) {
      hours.push(`${String(i).padStart(2, "0")}:00`);
    }

    return hours;
  };

  // Hora actual redondeada a la siguiente
  const getCurrentHour = () => {
    return new Date().getHours() + 1;
  };

  // Horas disponibles para inicio
  const getStartHours = () => {
    let startHour = 7;

    if (filters.date === today) {
      startHour = Math.max(7, getCurrentHour());
    }

    return generateHours(startHour, 19);
  };

  // Horas disponibles para fin
  const getEndHours = () => {
    const startHour = parseInt(filters.start.split(":")[0]) + 1;
    return generateHours(startHour, 20);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    let updated = { ...filters, [name]: value };

    if (name === "start") {
      const startHour = parseInt(value.split(":")[0]);
      updated.end = `${String(startHour + 1).padStart(2, "0")}:00`;
    }

    if (name === "date") {
      let startHour = 7;

      if (value === today) {
        startHour = Math.max(7, new Date().getHours() + 1);
      }

      updated.start = `${String(startHour).padStart(2, "0")}:00`;
      updated.end = `${String(startHour + 1).padStart(2, "0")}:00`;
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
        <div className="flex flex-col gap-1">
          <label className="font-medium">Fecha</label>
          <input
            type="date"
            name="date"
            value={filters.date}
            min={today}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

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

        <button
          onClick={handleSearch}
          className="h-10 flex items-center justify-center
          border-2 border-sky-500 text-sky-500
          font-bold rounded
          hover:bg-sky-500 hover:text-white transition"
        >
          Buscar Sala
        </button>
      </div>
    </section>
  );
}