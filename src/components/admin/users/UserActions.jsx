import Swal from "sweetalert2";

export default function UserActions({
  user,
  onToggleStatus,
}) {
  const handleClick = async () => {
    const activating = !user.enabled;

    const result = await Swal.fire({
      icon: activating ? "question" : "warning",
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
      onClick={handleClick}
      style={{
        width: 42,
        height: 22,
        borderRadius: 999,
        background: user.enabled
          ? "#10b981"
          : "#d1d5db",
        position: "relative",
        cursor: "pointer",
        transition: ".2s",
      }}
    >
      <div
        style={{
          width: 18,
          height: 18,
          borderRadius: "50%",
          background: "#fff",
          position: "absolute",
          top: 2,
          left: 2,
          transform: user.enabled
            ? "translateX(20px)"
            : "translateX(0)",
          transition: ".2s",
          boxShadow:
            "0 1px 3px rgba(0,0,0,.15)",
        }}
      />
    </div>
  );
}