import useAdminResource from "./useAdminResource";

import { getAllReservations,} from "../../../api/adminApi";

export default function useReservations(
  tab
) {
  const {
    data,
    loading,
    error,
    reload,
  } = useAdminResource(
    tab,
    "reservations",
    getAllReservations,
    "Error al cargar reservas"
  );

  return {
    reservations: data,
    loading,
    error,
    reloadReservations:
      reload,
  };
}