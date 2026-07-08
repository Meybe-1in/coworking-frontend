import { X } from "lucide-react";
import { useEffect } from "react";
import "./styles/Modal.css";

export default function Modal({ title, subtitle, open, onClose, children }) {
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (e.key === "Escape")
        onClose();
    };
    window.addEventListener(
      "keydown",
      handler
    );

    return () =>
      window.removeEventListener(
        "keydown",
        handler
      );
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className="modal-overlay"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal-container"
      >
        {/* header */}
        <div className="modal-header">
          <div>
            <p className="modal-title">
              {title}
            </p>
            {subtitle && (
              <p className="modal-subtitle">
                {subtitle}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="modal-close-btn"
          >
            {/* X inline */}
            < X size={12} color="#fff" />
          </button>
        </div>

        {/* body — scrollable si el contenido crece */}
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
}