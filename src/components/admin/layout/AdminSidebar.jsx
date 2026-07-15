import { useState } from "react";
import "./AdminSidebar.css";

export default function AdminSidebar({
  tab,
  setTab,
  TABS,
  Icon,
}) {
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
                  <button
                    key={child.id}
                    onClick={() => setTab(child.id)}
                    className={`
                    admin-sidebar__item
                    admin-sidebar__child
                    ${tab === child.id ? "admin-sidebar__item--active" : ""}
                  `}
                  >
                    <Icon
                      d={child.icon}
                      size={14}
                    />
                    {child.label}
                  </button>
                ))}
            </div>
          );
        }

        return (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`
              admin-sidebar__item
              ${tab === t.id ? "admin-sidebar__item--active" : ""}
            `}
          >
            <Icon d={t.icon} size={16} />
            {t.label}
          </button>
        );
      })}
    </aside>
  );
}