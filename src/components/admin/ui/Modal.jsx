import { X } from "lucide-react";
import { useEffect } from "react";

export default function Modal({ title, subtitle, open, onClose, children }) {
  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 50,
        background: "rgba(0,0,0,.45)",
        display: "flex", alignItems: "center", justifyContent: "center", padding: 16,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%", maxWidth: 500,
          background: "#fff", borderRadius: 12,
          border: "1px solid #e5e7eb", overflow: "hidden",
        }}
      >
        {/* header */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "10px 18px", borderBottom: "1px solid #f3f4f6",
        }}>
          <div>
            <p style={{ margin: 0, fontSize: 15, fontWeight: 600, color: "#1d4ed8" }}>{title}</p>
            {subtitle && <p style={{ margin: "2px 0 0", fontSize: 12, color: "#9ca3af" }}>{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            style={{
              borderRadius: 5, border: "none",
              background: "#ef4444", color: "#fff", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}
          >
            {/* X inline */}
            < X size={12} color="#fff" />
          </button>
        </div>

        {/* body — scrollable si el contenido crece */}
        <div style={{ padding: "16px 18px", maxHeight: "75vh", overflowY: "auto" }}>
          {children}
        </div>
      </div>
    </div>
  );
}