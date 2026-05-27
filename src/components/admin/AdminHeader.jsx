export default function AdminHeader({ Icon, ICONS }) {
  return (
    <header
      style={{
        background: "#fff",
        borderBottom: "1px solid #f0f0f0",
        padding: "0 32px",
        display: "flex",
        alignItems: "center",
        height: 60,
        gap: 12,
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: 7,
          background: "#111",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon
          d={ICONS.grid}
          size={14}
          style={{ color: "#fff", stroke: "#fff" }}
        />
      </div>

      <span
        style={{
          fontWeight: 700,
          fontSize: 15,
          letterSpacing: "-.2px",
        }}
      >
        Admin
      </span>

      <span
        style={{
          marginLeft: "auto",
          fontSize: 12,
          color: "#9ca3af",
          background: "#f3f4f6",
          padding: "3px 10px",
          borderRadius: 99,
          fontWeight: 500,
        }}
      >
        Panel de Control
      </span>
    </header>
  );
}