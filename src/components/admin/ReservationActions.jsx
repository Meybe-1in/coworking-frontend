import Swal from "sweetalert2";
import { cancelReservationAdmin } from "../../api/adminApi";

export default function ReservationActions({
  reservation,
  reloadReservations,
}) {

  const handleCancel = async () => {

    const result = await Swal.fire({
      title: "¿Cancelar reserva?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, cancelar",
      cancelButtonText: "Volver",
    });

    if (!result.isConfirmed) return;

    try {

      await cancelReservationAdmin(
        reservation.id
      );

      await Swal.fire({
        title: "Reserva cancelada",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      reloadReservations();

    } catch {

      Swal.fire({
        title: "Error",
        text: "No se pudo cancelar la reserva",
        icon: "error",
      });
    }
  };

  const disabled =
    reservation.status === "CANCELLED" ||
    reservation.status === "EXPIRED";

  return (
    <button
      disabled={disabled}
      onClick={handleCancel}
    >
      Cancelar
    </button>
  );
}