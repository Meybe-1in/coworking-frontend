import { useEffect, useState } from "react";

import { getAllRooms } from "../../../api/roomApi";

export default function useRooms(tab) {
  const [rooms, setRooms] = useState([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState(null);

  const loadRooms = async () => {
    setLoading(true);
    setError(null);

    try {
      const data =
        await getAllRooms();

      setRooms(data);
    } catch {
      setError(
        "Error al cargar salas"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      tab === "rooms" &&
      rooms.length === 0
    ) {
      loadRooms();
    }
  }, [tab]);

  return {
    rooms,
    loading,
    error,
    reloadRooms: loadRooms,
  };
}