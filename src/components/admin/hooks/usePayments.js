import { useEffect, useState }
  from "react";

import { getAllPayments }
  from "../../../api/adminApi";

export default function usePayments(
  tab
) {
  const [payments,setPayments] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);

  const loadPayments =
    async () => {

    setLoading(true);
    setError(null);

    try {
      const data =
        await getAllPayments();

      setPayments(data);
    } catch {
      setError(
        "Error al cargar pagos"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      tab === "payments" &&
      payments.length === 0
    ) {
      loadPayments();
    }
  }, [tab]);

  return {
    payments,
    loading,
    error,
    reloadPayments:
      loadPayments,
  };
}