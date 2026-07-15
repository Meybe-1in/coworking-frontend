import useAdminResource from "./useAdminResource";
import { getAllRooms } from "../../../api/roomApi";

export default function useRooms(
  tab
) {
  const {
    data,
    loading,
    error,
    reload,
  } = useAdminResource(
    tab,
    "rooms",
    getAllRooms,
    "Error al cargar salas"
  );

  return {
    rooms: data,
    loading,
    error,
    reloadRooms: reload,
  };
}