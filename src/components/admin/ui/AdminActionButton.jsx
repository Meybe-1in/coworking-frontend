import * as LucideIcons from "lucide-react";
import "./styles/AdminActionButton.css";

export default function AdminActionButton({
  icon,
  children,
  title,
  onClick,
  disabled = false,
  variant = "primary",
}) {
  const Icon =
    icon && LucideIcons[icon];

  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      disabled={disabled}
      className={`
        admin-action-btn
        admin-action-btn--${variant}
      `}
    >
      {Icon && <Icon size={16} />}

      {children}
    </button>
  );
}