import { useState } from "react";
import Swal from "sweetalert2";
import Modal from "../ui/Modal";
import { deleteRoom } from "../../../api/roomApi";

export default function DeleteRoomModal({
    room,
    open,
    onClose,
    reloadRooms,
}) {
    const [loading, setLoading] =
        useState(false);

    if (!open || !room) return null;

    const handleDelete = async () => {

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
            setLoading(true);

            await deleteRoom(room.id);

            await reloadRooms();

            onClose();

            Swal.fire({
                icon: "success",
                title: "Sala eliminada",
                timer: 1500,
                showConfirmButton: false,
            });

        } catch (error) {

            if (error.response?.status === 409) {
                Swal.fire({
                    icon: "warning",
                    title: "No se puede eliminar la sala",
                    text: `${error.response.data.message}. Cancela o elimina las reservas asociadas primero.`,
                });

                return;
            }

            const msg =
                error.response?.data?.message ||
                "No fue posible eliminar la sala";

            Swal.fire({
                icon: "error",
                title: "Error",
                text: msg,
            });

        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            title="Eliminar sala"
            open={open}
            onClose={onClose}
        >
            <p>
                ¿Deseas eliminar la sala
                <strong>
                    {" "}
                    {room.name}
                </strong>
                ?
            </p>

            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 8,
                    marginTop: 20,
                }}
            >
                <button
                    onClick={onClose}
                >
                    Cancelar
                </button>

                <button
                    onClick={handleDelete}
                    disabled={loading}
                >
                    {loading
                        ? "Eliminando..."
                        : "Eliminar"}
                </button>
            </div>
        </Modal>
    );
}