import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./AdminSidebar.css";

import { TABS } from "../../../helpers/admin/tabs";

export default function AdminSidebar({ Icon, }) {
  const [tablesOpen, setTablesOpen] = useState(true);

  return (
    <aside className="admin-sidebar">
      {TABS.map((t) => {
        if (t.children) {
          return (
            <div key={t.id}>
              <button
                onClick={() => setTablesOpen(!tablesOpen)}
                className="admin-sidebar__group-btn"
              >
                <span className="admin-sidebar__label">
                  <Icon d={t.icon} size={16} />
                  {t.label}
                </span>

                <span>
                  {tablesOpen ? "▼" : "▶"}
                </span>
              </button>

              {tablesOpen &&
                t.children.map((child) => (
                  <NavLink
                    key={child.id}
                    to={child.path}
                    className={({ isActive }) =>
                      `
                      admin-sidebar__item
                      admin-sidebar__child
                      ${isActive
                        ? "admin-sidebar__item--active"
                        : ""
                      }
                    `
                    }
                  >
                    <Icon
                      d={child.icon}
                      size={14}
                    />
                    {child.label}
                  </NavLink>
                ))}
            </div>
          );
        }

        return (
          <NavLink
            key={t.id}
            to={t.path}
            className={({ isActive }) =>
              `
              admin-sidebar__item
              ${isActive
                ? "admin-sidebar__item--active"
                : ""
              }
            `
            }
          >
            <Icon d={t.icon} size={16} />
            {t.label}
          </NavLink>
        );
      })}
    </aside>
  );
}