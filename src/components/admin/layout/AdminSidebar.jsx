export default function AdminSidebar({
  tab,
  setTab,
  TABS,
  Icon,
}) {
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
      {TABS.map((t) => (
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
            textAlign: "left",
            width: "100%",
            transition: "all .12s",
          }}
        >
          <Icon d={t.icon} size={16} />
          {t.label}
        </button>
      ))}
    </aside>
  );
}