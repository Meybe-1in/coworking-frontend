import { useNavigate } from "react-router-dom";

export default function RoomCard({ room, filters, preview = false }) {
  const isAvailable = room.available;
  const navigate = useNavigate();

  const handleReserve = () => {
    if (!filters) return;
    navigate("/checkout", { state: { room, filters } });
  };

  const goToRoom = () => {
    navigate(`/rooms/${room.id}`);
  };

  if (preview) {
    return (
      <div
        onClick={goToRoom}
        className="cursor-pointer bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
      >
        <img
          src={
            room.imageUrl
              ? `${import.meta.env.VITE_API_URL}${room.imageUrl}`
              : "https://via.placeholder.com/400x300?text=No+Image"
          }
          alt={room.name}
          className="w-full h-40 object-cover"
        />

        <div className="p-4 flex flex-col gap-1">

          <h3 className="font-semibold text-lg">{room.name}</h3>

          <p className="text-gray-600 text-sm">
            {room.capacity} personas
          </p>

          <p className="font-bold text-blue-800">
            ${room.price}/h
          </p>

        </div>
      </div>
    );
  }

  return (
    <article className="bg-white rounded-2xl shadow-xl p-6">
      {/* Header */}
      <div className="flex justify-between">
        <span
          className={`px-6 py-2 rounded-br-xl text-white font-semibold ${isAvailable ? "bg-sky-500" : "bg-red-500"
            }`}
        >
          {isAvailable ? "Disponible" : "No disponible"}
        </span>

        <span className="text-3xl font-bold text-blue-800">
          ${room.price}
          <span className="text-xl">/h</span>
        </span>
      </div>

      {/* Content */}
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-semibold">{room.name}</h3>

          <p className="font-medium">
            {room.capacity} personas | {room.location}
          </p>

          <p className="text-gray-600 line-clamp-2">
            {room.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {room.features?.map((f, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full bg-gray-100 text-blue-800"
              >
                {f}
              </span>
            ))}
          </div>

          {/* Botón reserva */}
          <button
            disabled={!isAvailable}
            onClick={handleReserve}
            className={`
              mt-4 px-6 py-3 rounded-full font-medium transition
              ${isAvailable
                ? "bg-sky-500 text-white hover:bg-blue-800 cursor-pointer"
                : "bg-gray-400 text-gray-700 cursor-not-allowed opacity-70"
              }
            `}
          >
            {isAvailable ? "Solicitar reserva" : "No disponible"}
          </button>
        </div>

        <img
          src={
            room.imageUrl
              ? `${import.meta.env.VITE_API_URL}${room.imageUrl}`
              : "https://via.placeholder.com/400x300?text=No+Image"
          }
          alt={room.name}
          className="rounded-xl object-cover w-full h-full max-h-72"
        />
      </div>
    </article>
  );
}