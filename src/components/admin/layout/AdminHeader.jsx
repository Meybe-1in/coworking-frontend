import { useNavigate } from "react-router-dom";
import { clearAuth } from "../../../utils/authStorage";
import "./AdminHeader.css";
export default function AdminHeader({ Icon, ICONS }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuth();
    navigate("/Login", { replace: true });
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