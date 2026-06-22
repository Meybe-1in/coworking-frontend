export default function Badge({
  active,
  activeText,
  inactiveText,
}) {
  return (
    <span
      style={{
        padding: "4px 10px",
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 600,
        background: active
          ? "#dcfce7"
          : "#fee2e2",
        color: active
          ? "#166534"
          : "#991b1b",
      }}
    >
      {active
        ? activeText
        : inactiveText}
    </span>
  );
}