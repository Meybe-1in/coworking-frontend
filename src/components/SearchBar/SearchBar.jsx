import React, { useState } from "react";
import "./SearchBar.css";

export default function SearchBar({ onSearch }) {
  const [filters, setFilters] = useState({
    date: new Date().toISOString().split("T")[0],
    start: "07:00",
    end: "08:00",
    people: "1",
  });

  const handleChange = (e) =>
    setFilters({ ...filters, [e.target.name]: e.target.value });

  const handleSearch = () => {
    if (!filters.date || filters.start >= filters.end) {
      alert("Horario inválido");
      return;
    }
    onSearch(filters);
  };

  const hours = (start, end) =>
    Array.from({ length: end - start + 1 }, (_, i) =>
      `${String(start + i).padStart(2, "0")}:00`
    );

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
            min={filters.date}
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
            {hours(7, 19).map(h => <option key={h}>{h}</option>)}
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
            {hours(8, 20).map(h => <option key={h}>{h}</option>)}
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