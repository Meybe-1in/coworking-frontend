import "./AdminHeader.css";
import useLogout from "../hooks/useLogout";

export default function AdminHeader({ Icon, ICONS }) {
  const { handleLogout } = useLogout();

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