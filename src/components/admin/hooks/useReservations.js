import useAdminResource from "./useAdminResource";

import { getAllReservations,} from "../../../api/adminApi";

export default function useReservations() {
  const {
    data,
    loading,
    error,
    reload,
  } = useAdminResource(
    getAllReservations,
    "Error al cargar reservas"
  );

  return {
    reservations: data,
    loading,
    error,
    reloadReservations: reload,
  };
}