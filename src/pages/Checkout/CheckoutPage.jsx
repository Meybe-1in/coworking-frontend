import { useLocation, useNavigate } from "react-router-dom";
import NavbarUser from "../../components/NavbarUser/NavbarUser";
import { createReservation } from "../../api/axiosConfig";
import { useState } from "react";
import { formatDateTime } from "../../utils/dateFormatter";
import Swal from "sweetalert2";

export default function CheckoutPage() {

  const location = useLocation();
  const navigate = useNavigate();
  const { room, filters } = location.state || {};

  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  if (!room || !filters) {
    return <p>Error cargando reserva</p>;
  }

  const startAt = formatDateTime(filters.date, filters.start);
  const endAt = formatDateTime(filters.date, filters.end);

  const total =
    room.price *
    (parseInt(filters.end.split(":")[0]) -
      parseInt(filters.start.split(":")[0]));

  const handleReservation = async () => {
    try {
      setLoading(true);

      const reservationData = {
        roomId: room.id,
        startAt,
        endAt,
        people: filters.people,
        note: note || "Reserva Coworking"
      };

      await createReservation(reservationData);

      Swal.fire({
        icon: "success",
        title: "Reserva confirmada",
        text: "Tu sala ha sido reservada correctamente"
      }).then(() => {
        navigate("/calendar");
      });

    } catch (error) {
      console.error("Error creando reserva:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un error al crear la reserva. Intenta nuevamente."
      });
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="bg-slate-100 min-h-screen">

      <NavbarUser />

      <main className="pt-28 max-w-3xl mx-auto px-4">

        <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-6">

          <h1 className="text-2xl font-semibold">
            Confirmar Reserva
          </h1>

          <div className="flex justify-between">
            <span>Sala</span>
            <span>{room.name}</span>
          </div>

          <div className="flex justify-between">
            <span>Fecha</span>
            <span>{filters.date}</span>
          </div>

          <div className="flex justify-between">
            <span>Horario</span>
            <span>{filters.start} - {filters.end}</span>
          </div>

          <div className="flex justify-between">
            <span>Personas</span>
            <span>{filters.people}</span>
          </div>

          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${total}</span>
          </div>

          <textarea
            placeholder="Nota para la reserva (opcional)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="border rounded-lg p-3"
          />

          <button
            onClick={handleReservation}
            disabled={loading}
            className="bg-sky-500 text-white py-3 rounded-lg hover:bg-blue-800"
          >
            {loading ? "Reservando..." : "Confirmar Reserva"}
          </button>

        </div>

      </main>

    </div>
  );
}