import Swal from "sweetalert2";
import "./UserStatusToggle.css";

export default function UserStatusToggle({
  user,
  onToggleStatus,
  isCurrentUsername,
}) {

  const handleClick = async () => {

    if (isCurrentUsername) {
      Swal.fire({
        icon: "info",
        title: "Acción no permitida",
        text: "No puedes desactivar tu propia cuenta.",
      });

      return;
    }

    const activating = !user.enabled;

    const result = await Swal.fire({
      icon: activating
        ? "question"
        : "warning",
      title: activating
        ? "Activar usuario"
        : "Desactivar usuario",
      text: activating
        ? "El usuario podrá iniciar sesión nuevamente."
        : "El usuario no podrá iniciar sesión hasta ser activado nuevamente.",
      showCancelButton: true,
      confirmButtonText: activating
        ? "Activar"
        : "Desactivar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: activating
        ? "#10b981"
        : "#ef4444",
    });

    if (result.isConfirmed) {
      onToggleStatus(user);
    }
  };

  return (
    <div
      className="user-status-toggle"
      onClick={handleClick}
      style={{
        background: user.enabled
          ? "#10b981"
          : "#d1d5db",

        cursor: isCurrentUsername
          ? "not-allowed"
          : "pointer",

        opacity: isCurrentUsername
          ? 0.6
          : 1,
      }}
    >
      <div
        className="user-status-toggle__thumb"
        style={{
          transform: user.enabled
            ? "translateX(24px)"
            : "translateX(0)",
        }}
      />
    </div>
  );
}