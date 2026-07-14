import Swal from "sweetalert2";
import { deleteRoom } from "../../../api/roomApi";

export default function useRoomActions(
  reloadRooms
) {
  const deleteRoomAction = async (
    room
  ) => {
    const result =
      await Swal.fire({
        title: "¿Eliminar sala?",
        text: `Se eliminará "${room.name}"`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText:
          "Sí, eliminar",
        cancelButtonText:
          "Cancelar",
      });

    if (!result.isConfirmed) return;

    try {
      await deleteRoom(room.id);

      await reloadRooms();

      Swal.fire({
        icon: "success",
        title: "Sala eliminada",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      if (
        error.response?.status === 409
      ) {
        Swal.fire({
          icon: "warning",
          title:
            "No se puede eliminar la sala",
          text: `${error.response.data.message}. Cancela o elimina las reservas asociadas primero.`,
        });

        return;
      }

      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data?.message ||
          "No fue posible eliminar la sala",
      });
    }
  };

  return {
    deleteRoomAction,
  };
}