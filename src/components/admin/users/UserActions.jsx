import Swal from "sweetalert2";
import AdminActionButton from "../ui/AdminActionButton";

export default function UserActions({
  user,
  onChangeRole,
  isCurrentUsername,
}) {

  const handleRoleChange = async () => {

    if (isCurrentUsername) {
      Swal.fire({
        icon: "info",
        title: "Acción no permitida",
        text: "No puedes remover tus propios privilegios administrativos.",
      });

      return;
    }

    const isAdmin =
      user.roles.includes("ROLE_ADMIN");

    const result = await Swal.fire({
      icon: "question",
      title: isAdmin
        ? "Remover privilegios administrativos"
        : "Convertir en administrador",
      text: isAdmin
        ? "¿Desea remover privilegios administrativos de este usuario?"
        : "¿Desea convertir este usuario en administrador?",
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      onChangeRole(user);
    }
  };

  return (
    <AdminActionButton
      onClick={handleRoleChange}
      disabled={isCurrentUsername}
      variant="primary"
    >
      Cambiar rol
    </AdminActionButton>
  );
}