import "./StatCard.css";
const Icon = ({ d, size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d={d} />
  </svg>
);

export default function StatCard({
  label,
  value,
  icon,
  accent,
}) {
  return (
    <div className="stat-card">
      <div
        className="stat-card__icon"
        style={{
          background: accent + "18",
          color: accent,
        }}
      >
        <Icon d={icon} size={20} />
      </div>

      <div>
        <div className="stat-card__value">
          {value}
        </div>

        <div className="stat-card__label">
          {label}
        </div>
      </div>
    </div>
  );
}