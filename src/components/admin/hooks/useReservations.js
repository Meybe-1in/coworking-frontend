import useAdminResource from "./useAdminResource";

import { getAllReservations,} from "../../../api/adminApi";

export default function useReservations() {
  const {
    data,
    loading,
    error,
    reload,
    page,
    size,
    totalPages,
    totalElements,
    setPage,
    setSize,
  } = useAdminResource(
    getAllReservations,
    "Error al cargar reservas"
  );

  return {
    reservations: data,
    loading,
    error,
    page,
    size,
    totalPages,
    totalElements,
    setPage,
    setSize,
    reloadReservations: reload,
  };
}