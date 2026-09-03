import Swal from "sweetalert2";
import { updateUserStatus, updateUserRole, updateUser as updateUserApi } from "../../../api/adminApi";

export default function useUserActions(
  reloadUsers
) {

  const toggleStatus = async (user) => {

    try {

      await updateUserStatus(
        user.id,
        !user.enabled
      );

      await reloadUsers();

      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "Estado actualizado correctamente",
        timer: 1500,
        showConfirmButton: false,
      });

    } catch (error) {

      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data?.message ||
          "No fue posible actualizar el estado",
      });
    }
  };

  const changeRole = async (user) => {

    try {

      const isAdmin =
        user.roles.includes("ROLE_ADMIN");

      const newRole =
        isAdmin
          ? "ROLE_USER"
          : "ROLE_ADMIN";

      await updateUserRole(
        user.id,
        newRole
      );

      await reloadUsers();

      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "Rol actualizado correctamente",
        timer: 1500,
        showConfirmButton: false,
      });

    } catch (error) {

      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data?.message ||
          "No fue posible actualizar el rol",
      });
    }
  };

  const editUser = async (userId, userData) => {
    try {
      await updateUserApi(userId, userData);
      await reloadUsers();
      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "Usuario actualizado correctamente",
        timer: 1500,
        showConfirmButton: false,
      });

      return true; // Indica que la actualización fue exitosa
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data?.message ||
          "No fue posible actualizar el usuario",
      });

      return false; // Indica que la actualización fallo
    }
  };

  return {
    toggleStatus,
    changeRole,
    editUser,
  };
}