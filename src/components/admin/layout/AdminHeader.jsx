import "./AdminHeader.css";
import { Bell } from "lucide-react";
import AdminUserMenu from "./AdminUserMenu";

export default function AdminHeader({ Icon, ICONS, title = "Panel de administración" }) {
  return (
    <header className="admin-header">
      <div className="admin-header__brand">
        <div className="admin-header__logo">
          <Icon d={ICONS.grid} size={14} className="admin-header__icon" />
        </div>
        <span className="admin-header__title">{title}</span>
      </div>

      <div className="admin-header__actions">
        <button className="admin-header__icon-btn" aria-label="Notificaciones">
          <Bell size={18} strokeWidth={2} />
          <span className="admin-header__dot" />
        </button>

        <span className="admin-header__divider" />

        <AdminUserMenu />
      </div>
    </header>
  );
}