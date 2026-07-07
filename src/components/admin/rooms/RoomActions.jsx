import AdminActionButton from "../ui/AdminActionButton";

export default function RoomActions({
    room,
    onEdit,
    onDelete,
}) {
    return (
        <div
            style={{
                display: "flex",
                gap: 8,
            }}
        >
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