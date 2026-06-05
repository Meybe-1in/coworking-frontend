export default function ExportButton({
  label,
  onClick,
  loading = false,
}) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      style={{
        padding: "8px 14px",
        borderRadius: "8px",
        border: "1px solid #d1d5db",
        background: "#fff",
        cursor: loading
          ? "not-allowed"
          : "pointer",
      }}
    >
      {loading
        ? "Descargando..."
        : label}
    </button>
  );
}