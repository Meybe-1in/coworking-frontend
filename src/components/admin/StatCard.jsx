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
    <div
      style={{
        background: "#fff",
        borderRadius: 14,
        padding: "22px 24px",
        border: "1px solid #f0f0f0",
        boxShadow: "0 1px 3px rgba(0,0,0,.05)",
        display: "flex",
        alignItems: "flex-start",
        gap: 16,
      }}
    >
      <div
        style={{
          width: 42,
          height: 42,
          borderRadius: 10,
          background: accent + "18",
          color: accent,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon d={icon} size={20} />
      </div>

      <div>
        <div
          style={{
            fontSize: 23,
            fontWeight: 700,
            color: "#111",
          }}
        >
          {value}
        </div>

        <div
          style={{
            fontSize: 12.5,
            color: "#9ca3af",
            marginTop: 3,
            fontWeight: 500,
          }}
        >
          {label}
        </div>
      </div>
    </div>
  );
}