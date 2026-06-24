import { useState } from "react";
import Swal from "sweetalert2";

import Modal from "../ui/Modal";
import AdminForm from "./AdminForm";

import { createAdmin } from "../../../api/adminApi";

export default function CreateAdminModal({
  open,
  onClose,
  reloadUsers,
}) {
  const [loading, setLoading] =
    useState(false);

  const handleCreate =
    async (userData) => {

      try {
        setLoading(true);

        await createAdmin(
          userData
        );

        await reloadUsers();

        Swal.fire({
          icon: "success",
          title:
            "Administrador creado",
          timer: 1500,
          showConfirmButton:
            false,
        });

        onClose();

      } catch (error) {

        const msg =
          error.response?.data
            ?.message ||
          "No fue posible crear el administrador";

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
      title="Crear administrador"
      open={open}
      onClose={onClose}
    >
      <AdminForm
        onSubmit={handleCreate}
        loading={loading}
      />
    </Modal>
  );
}