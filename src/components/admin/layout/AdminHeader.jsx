import { useEffect, useRef, useState } from "react";
import "./AdminHeader.css";
import { Bell } from "lucide-react";
import AdminUserMenu from "./AdminUserMenu";
import AdminNotificationPanel from "../notifications/AdminNotificationPanel";
import { getAdminUnreadNotificationCount } from "../../../api/adminNotificationApi";

export default function AdminHeader({ Icon, ICONS, title = "Panel de administración" }) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const notificationsRef = useRef(null);

  useEffect(() => {
    const loadUnreadCount = async () => {
      try {
        const count = await getAdminUnreadNotificationCount();
        setUnreadCount(Number(count) || 0);
      } catch {
        setUnreadCount(0);
      }
    };
    loadUnreadCount();
    const intervalId = window.setInterval(loadUnreadCount, 5000); 
    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setNotificationsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setNotificationsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <header className="admin-header">
      <div className="admin-header__brand">
        <div className="admin-header__logo">
          <Icon d={ICONS.grid} size={14} className="admin-header__icon" />
        </div>
        <span className="admin-header__title">{title}</span>
      </div>

      <div className="admin-header__actions">
        <div ref={notificationsRef} className="admin-header__notifications" >
          <button
            type="button"
            className="admin-header__icon-btn"
            aria-label="Notificaciones"
            aria-haspopup="dialog"
            aria-expanded={notificationsOpen}
            onClick={() => setNotificationsOpen((prev) => !prev)}
          >
            <Bell size={18} strokeWidth={2} />

            {unreadCount > 0 && (
              <span className="admin-header__badge">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            )}
          </button>
          {notificationsOpen && (
            <div className="admin-header__notification-panel">
              <AdminNotificationPanel
                onClose={() => setNotificationsOpen(false)}
                onUnreadCountChange={setUnreadCount}
              />
            </div>
          )}
        </div>

        <span className="admin-header__divider" />

        <AdminUserMenu />
      </div>
    </header>
  );
}