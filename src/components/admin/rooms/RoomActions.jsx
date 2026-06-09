import * as LucideIcons from "lucide-react";

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
            <button
                onClick={() => onEdit(room)}
                title="Editar sala"
                style={{
                    width: 38, height: 38,
                    border: "0.5px solid #c2c2c2",
                    borderRadius: 6,
                    background: "#eeeeee",
                    color: "#4b4b4b",
                    display: "flex", alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer", padding: 0,
                }}
            >
                <LucideIcons.Edit2
                    size={16}
                    color="#4b4b4b"
                />
            </button>

            <button
                onClick={() => onDelete(room)}
                title="Eliminar sala"
                style={{
                    width: 38, height: 38,
                    border: "0.5px solid #fecaca",
                    borderRadius: 6,
                    background: "#fff5f5",
                    color: "#dc2626",
                    display: "flex", alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer", padding: 0,
                }}
            >
                <LucideIcons.Trash2
                    size={16}
                    color="#dc2626"
                />
            </button>
        </div>
    );
}