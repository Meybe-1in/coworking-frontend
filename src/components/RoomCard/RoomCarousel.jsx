import { useState } from "react";
import RoomCard from "../RoomCard/RoomCard";

export default function RoomCarousel({ rooms }) {

  const [index, setIndex] = useState(0);

  const visibleRooms = rooms.slice(index, index + 6);

  const next = () => {
    if (index + 6 < rooms.length) {
      setIndex(index + 6);
    }
  };

  const prev = () => {
    if (index - 6 >= 0) {
      setIndex(index - 6);
    }
  };

  return (

    <div className="flex flex-col gap-6">

      <div className="flex justify-between items-center">

        <h2 className="text-xl font-semibold">
          Salas disponibles
        </h2>

        <div className="flex gap-2">

          <button
            onClick={prev}
            className="px-3 py-1 rounded bg-gray-200"
          >
            ←
          </button>

          <button
            onClick={next}
            className="px-3 py-1 rounded bg-gray-200"
          >
            →
          </button>

        </div>

      </div>

      <div className="grid grid-cols-6 gap-4">

        {visibleRooms.map(room => (
          <RoomCard
            key={room.id}
            room={room}
            preview
          />
        ))}

      </div>

    </div>

  );
}