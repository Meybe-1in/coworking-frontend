import { useEffect, useState }
  from "react";

import { getAllReservations }
  from "../../../api/adminApi";

export default function useReservations(
  tab
) {
  const [reservations,
    setReservations] = useState([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState(null);

  const loadReservations =
    async () => {

    setLoading(true);
    setError(null);

    try {
      const data =
        await getAllReservations();

      setReservations(data);
    } catch {
      setError(
        "Error al cargar reservas"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      tab === "reservations" &&
      reservations.length === 0
    ) {
      loadReservations();
    }
  }, [tab]);

  return {
    reservations,
    loading,
    error,
    reloadReservations:
      loadReservations,
  };
}