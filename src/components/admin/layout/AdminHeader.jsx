import { useNavigate } from "react-router-dom";
import { clearAuth } from "../../../utils/authStorage";
import "./AdminHeader.css";
import Swal from "sweetalert2";

export default function AdminHeader({ Icon, ICONS }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "¿Cerrar sesión?",
      text: "Tu sesión actual finalizará.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Cerrar sesión",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#111827",
    }).then((result) => {
      if (result.isConfirmed) {
        clearAuth();
        navigate("/Login", { replace: true });
      }
    });
  };

  return (
    <header className="admin-header">
      <div className="admin-header__logo">
        <Icon
          d={ICONS.grid}
          size={14}
          className="admin-header__icon"
        />
      </div>

      <div className="admin-header__actions">
        <span className="admin-header__badge">
          Panel de Control
        </span>

        <button
          type="button"
          onClick={handleLogout}
          className="admin-header__logout"
        >
          Cerrar sesión
        </button>
      </div>
    </header>
  );
}