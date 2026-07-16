export default function AdminToggle({
  value,
  onChange,
  activeLabel = "Sí",
  inactiveLabel = "No",
}) {
  return (
    <div
      className="admin-toggle"
      onClick={() => onChange(!value)}
    >
      <div
        className="admin-toggle-track"
        style={{
          background: value
            ? "#10b981"
            : "#d1d5db",
        }}
      >
        <div
          className="admin-toggle-thumb"
          style={{
            transform: value
              ? "translateX(13px)"
              : "translateX(0)",
          }}
        />
      </div>

      <span
        className="admin-toggle-label"
        style={{
          color: value
            ? "#059669"
            : "#9ca3af",
        }}
      >
        {value
          ? activeLabel
          : inactiveLabel}
      </span>
    </div>
  );
}