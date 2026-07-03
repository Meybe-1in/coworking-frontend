import Swal from "sweetalert2";

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
    <button
      type="button"
      onClick={handleRoleChange}
      disabled={isCurrentUsername}
      style={{
        height: 28,
        border: "1px solid #4338ca",
        borderRadius: 999,
        background: "#eef2ff",
        color: "#4338ca",
        padding: "0 12px",
        fontSize: 12,
        fontWeight: 600,
        display: "flex",
        alignItems: "center",
        gap: 6,
        cursor: isCurrentUsername
          ? "not-allowed"
          : "pointer",
        opacity: isCurrentUsername ? 0.6 : 1,
      }}
    >
      Cambiar rol
    </button>
  );
}