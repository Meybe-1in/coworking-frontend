import React, { useState } from "react";
import "./SearchBar.css";

export default function SearchBar({ onSearch }) {
    const [filters, setFilters] = useState({
        date: new Date().toISOString().split("T")[0],
        start: "07:00",
        end: "08:00",
        people: "1"
    });

    const handleChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const handleSearch = () => {
        if (!filters.date || !filters.start || !filters.end) {
            alert("Por favor selecciona una fecha y horario");
            return;
        }

        if (filters.start >= filters.end) {
            alert("La hora de inicio debe ser menor que la de fin");
            return;
        }
        // Llamar a la función de búsqueda con los filtros
        onSearch(filters);
    };
    const generateStartTimes = () => {
        const times = [];
        for (let h = 7; h <= 19; h++) {
            times.push(`${h.toString().padStart(2, "0")}:00`);
        }
        return times;
    };

    const generateEndTimes = () => {
        const times = [];
        for (let h = 8; h <= 20; h++) {
            times.push(`${h.toString().padStart(2, "0")}:00`);
        }
        return times;
    };

    const startOptions = generateStartTimes();
    const endOptions = generateEndTimes();



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