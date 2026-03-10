import { useLocation } from "react-router-dom";
import NavbarUser from "../../components/NavbarUser/NavbarUser";

export default function CheckoutPage() {

  const location = useLocation();
  const { room, filters } = location.state || {};

  if (!room) {
    return <p>No hay datos de reserva</p>;
  }

  const hours =
    Number(filters.end.split(":")[0]) -
    Number(filters.start.split(":")[0]);

  const total = hours * room.price;

  return (
    <div className="bg-slate-100 min-h-screen">

      <NavbarUser />

      <main className="pt-28 max-w-6xl mx-auto grid md:grid-cols-2 gap-10">

        {/* FORMULARIO */}
        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="text-2xl font-semibold mb-6">
            Datos de contacto
          </h2>

          <input
            className="w-full border p-3 rounded mb-4"
            placeholder="Email"
          />

          <input
            className="w-full border p-3 rounded mb-4"
            placeholder="Nombre"
          />

          <input
            className="w-full border p-3 rounded"
            placeholder="Notas"
          />

        </div>


        {/* RESUMEN */}
        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="text-xl font-semibold mb-4">
            Resumen de reserva
          </h2>

          <p><b>Sala:</b> {room.name}</p>
          <p><b>Fecha:</b> {filters.date}</p>
          <p><b>Hora:</b> {filters.start} - {filters.end}</p>
          <p><b>Personas:</b> {filters.people}</p>

          <hr className="my-4"/>

          <p className="text-xl font-bold">
            Total: ${total}
          </p>

        </div>

      </main>

    </div>
  );
}