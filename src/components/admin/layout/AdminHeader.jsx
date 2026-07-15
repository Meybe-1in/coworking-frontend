import "./AdminHeader.css";
export default function AdminHeader({ Icon, ICONS }) {
  return (
    <header className="admin-header">
      <div className="admin-header__logo">
        <Icon
          d={ICONS.grid}
          size={14}
          className="admin-header__icon"
        />
      </div>

      <span className="admin-header__title">
        Admin
      </span>

      <span className="admin-header__badge">
        Panel de Control
      </span>
    </header>
  );
}