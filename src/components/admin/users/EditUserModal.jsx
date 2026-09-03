import { useState } from "react";
import Swal from "sweetalert2";

import Modal from "../ui/Modal";
import UserForm from "./AdminForm";

export default function EditUserModal({
    open,
    onClose,
    user,
    onSubmit,
}) {
    const [loading, setLoading] = useState(false);

    if (!user) {
        return null;
    }

    const currentRole = user.roles?.includes("ROLE_ADMIN")
        ? "ADMIN"
        : "USER";

    const initialData = {
        username: user.username || "",
        email: user.email || "",
        role: currentRole,
    };

    const handleSubmit = async (userData) => {
        const result = await Swal.fire({
            icon: "question",
            title: "Guardar cambios",
            text: "¿Deseas guardar los cambios realizados en este usuario?",
            showCancelButton: true,
            confirmButtonText: "Guardar",
            cancelButtonText: "Cancelar",
        });

        if (!result.isConfirmed) {
            return;
        }

        try {
            setLoading(true);

            const success = await onSubmit(
                user.id,
                userData
            );

            if (success) {
                onClose();
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            title="Editar usuario"
            open={open}
            onClose={onClose}
        >
            <UserForm
                mode="edit"
                initialData={initialData}
                onSubmit={handleSubmit}
                loading={loading}
            />
        </Modal>
    );
}