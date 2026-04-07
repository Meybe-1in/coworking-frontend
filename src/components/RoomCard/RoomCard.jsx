import { useNavigate } from "react-router-dom";
import salaImg from "../../assets/sala.png";
import { getAvailabilityMessage, getMessageColor, getButtonText } from "../../utils/timeUtils";

export default function RoomCard({ room, filters, preview = false }) {
  const isAvailable = room.isAvailable ?? room.available;
  const navigate = useNavigate();

  const handleReserve = () => {
    if (!filters) {
      navigate(`/rooms/${room.id}`);
      return;
    }
    navigate("/checkout", { state: { room, filters } });
  };

  const goToRoom = () => {
    navigate(`/rooms/${room.id}`, {
      state: { filters }
    });
  };

  if (preview) {
    return (
      <div
        onClick={goToRoom}
        className="cursor-pointer bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
      >
        <img
          src={room.imageUrl || salaImg}

          alt={room.name}
          className="w-full h-40 object-cover"
        />

        <div className="p-4 flex flex-col gap-2">

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
    <article onClick={(e) => { e.stopPropagation(); goToRoom(); }} className="bg-white rounded-2xl shadow-xl p-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-2">
          <span
            className={`px-4 py-2 rounded-br-xl text-white font-medium ${isAvailable ? "bg-sky-300" : "bg-red-300"
              }`}
          >
            {isAvailable ? "Disponible" : "No disponible en este horario"}
          </span>

          {!isAvailable && room.nextAvailable && (
            <span className={`text-sm animate-fadeIn ${getMessageColor(room.nextAvailable)}`}>
              <strong>{getAvailabilityMessage(room.nextAvailable)}</strong>
            </span>
          )}
        </div>

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

          <p className="text-gray-600 line-clamp-1">
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
        </div>

        <img
          src={room.imageUrl || salaImg}
          alt={room.name}
          className="rounded-xl object-cover w-full h-full max-h-72"
        />
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={goToRoom}
          className={`
      px-6 py-2 rounded-xl
      text-white font-semibold
      hover:scale-105 hover:shadow-lg
      transition-all duration-300
      ${isAvailable
              ? "bg-linear-to-r from-sky-500 to-blue-600"
              : "bg-linear-to-r from-gray-400 to-gray-500"}
    `}
          disabled={!isAvailable && !room.nextAvailable}
        >
          {getButtonText(isAvailable, room)}
        </button>
      </div>
    </article>
  );
}