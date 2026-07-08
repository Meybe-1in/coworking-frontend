import "./styles/Badge.css";

export default function Badge({
  active,
  activeText,
  inactiveText,
}) {
  return (
    <span
      className={`badge ${active
          ? "badge--active"
          : "badge--inactive"
        }`}
    >
      {active
        ? activeText
        : inactiveText}
    </span>
  );
}