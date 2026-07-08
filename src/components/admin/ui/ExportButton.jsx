import "./styles/ExportButton.css";

export default function ExportButton({
  label,
  onClick,
  loading = false,
}) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="export-button"
    >
      {loading
        ? "Descargando..."
        : label}
    </button>
  );
}