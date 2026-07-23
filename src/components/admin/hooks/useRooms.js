import useAdminResource from "./useAdminResource";
import { getAllRooms } from "../../../api/roomApi";

export default function useRooms() {
  const {
    data,
    loading,
    error,
    page,
    size,
    totalPages,
    totalElements,
    setPage,
    setSize,
    reload,
  } = useAdminResource(
    getAllRooms,
    "Error al cargar salas"
  );

  return {
    rooms: data,
    loading,
    error,
    page,
    size,
    totalPages,
    totalElements,
    setPage,
    setSize,
    reloadRooms: reload,
  };
}