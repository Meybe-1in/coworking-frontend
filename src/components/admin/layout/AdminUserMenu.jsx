import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, User, Settings, LogOut } from "lucide-react";
import { getAuthItem } from "../../../utils/authStorage";
import useLogout from "../hooks/useLogout";

import "./AdminUserMenu.css";

export default function AdminUserMenu() {
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);

    const username = getAuthItem("username") || "Administrador";
    const role = getAuthItem("role") || "ROLE_ADMIN";

    const roleLabel =
        role === "ROLE_ADMIN"
            ? "Administrador"
            : role;
    const { logout } = useLogout();

    const navigate = useNavigate();

    useEffect(() => {
        function handleOutsideClick(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpen(false);
            }
        }

        function handleEscape(event) {
            if (event.key === "Escape") setOpen(false);
        }

        document.addEventListener("mousedown", handleOutsideClick);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
            document.removeEventListener("keydown", handleEscape);
        };
    }, []);

    return (
        <div ref={menuRef} className="admin-user-menu">
            <button
                className={`admin-user-menu__trigger ${open ? "admin-user-menu__trigger--open" : ""}`}
                onClick={() => setOpen((prev) => !prev)}
                aria-haspopup="menu"
                aria-expanded={open}
            >
                <div className="admin-user-menu__avatar">
                    {username.charAt(0).toUpperCase()}
                </div>

                <div className="admin-user-menu__info">
                    <span className="admin-user-menu__name">{username}</span>
                    <span className="admin-user-menu__role">Admin</span>
                </div>

                <ChevronDown
                    size={15}
                    strokeWidth={2.2}
                    className={`admin-user-menu__arrow ${open ? "admin-user-menu__arrow--open" : ""}`}
                />
            </button>

            <div
                className={`admin-user-menu__dropdown ${open ? "admin-user-menu__dropdown--open" : ""}`}
                role="menu"
            >
                <div className="admin-user-menu__header">
                    <strong>{username}</strong>
                    <span>{roleLabel}</span>
                </div>

                <div className="admin-user-menu__body">
                    <button
                        className="admin-user-menu__item"
                        role="menuitem"
                        onClick={() => navigate("/admin/profile")}
                    >
                        <User size={16} strokeWidth={2} />
                        Mi perfil
                    </button>
                </div>

                <div className="admin-user-menu__footer">
                    <button
                        onClick={logout}
                        className="admin-user-menu__item admin-user-menu__item--danger"
                        role="menuitem"
                    >
                        <LogOut size={16} strokeWidth={2} />
                        Cerrar sesión
                    </button>
                </div>
            </div>
        </div>
    );
}