import AdminActionButton from "../ui/AdminActionButton";
import "./Room.css";

export default function RoomActions({
    room,
    onEdit,
    onDelete,
}) {
    return (
        <div className="room-actions">
            <AdminActionButton
                icon="Edit2"
                title="Editar sala"
                variant="secondary"
                onClick={() => onEdit(room)}
            />

            <AdminActionButton
                icon="Trash2"
                title="Eliminar sala"
                variant="danger"
                onClick={() => onDelete(room)}
            />
        </div>
    );
}