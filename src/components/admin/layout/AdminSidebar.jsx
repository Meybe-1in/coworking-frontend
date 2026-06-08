import { useState } from "react";

export default function AdminSidebar({
  tab,
  setTab,
  TABS,
  Icon,
}) {
  const [tablesOpen, setTablesOpen] = useState(true);

  return (
    <aside
      style={{
        width: 200,
        background: "#fff",
        borderRight: "1px solid #f0f0f0",
        padding: "24px 12px",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      {TABS.map((t) => {
        if (t.children) {
          return (
            <div key={t.id}>
              <button
                onClick={() => setTablesOpen(!tablesOpen)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "9px 14px",
                  borderRadius: 9,
                  border: "none",
                  cursor: "pointer",
                  background: "transparent",
                  color: "#6b7280",
                  fontWeight: 500,
                  fontSize: 13.5,
                  width: "100%",
                }}
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
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
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "9px 14px 9px 34px",
                      borderRadius: 9,
                      border: "none",
                      cursor: "pointer",
                      background:
                        tab === child.id
                          ? "#f3f4f6"
                          : "transparent",
                      color:
                        tab === child.id
                          ? "#111"
                          : "#6b7280",
                      fontWeight:
                        tab === child.id
                          ? 600
                          : 500,
                      fontSize: 13.5,
                      width: "100%",
                    }}
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
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "9px 14px",
              borderRadius: 9,
              border: "none",
              cursor: "pointer",
              background:
                tab === t.id
                  ? "#f3f4f6"
                  : "transparent",
              color:
                tab === t.id
                  ? "#111"
                  : "#6b7280",
              fontWeight:
                tab === t.id
                  ? 600
                  : 500,
              fontSize: 13.5,
              width: "100%",
            }}
          >
            <Icon d={t.icon} size={16} />
            {t.label}
          </button>
        );
      })}
    </aside>
  );
}