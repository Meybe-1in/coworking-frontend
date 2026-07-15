export default function AdminInput({
  icon: Icon,
  dollar,
  className = "",
  ...props
}) {
  return (
    <div className="admin-form-input-wrapper">

      {Icon && (
        <Icon
          size={14}
          className="admin-form-icon"
        />
      )}

      {dollar && (
        <span
          className="admin-form-icon"
          style={{ fontSize: 13 }}
        >
          $
        </span>
      )}

      <input
        {...props}
        className={`admin-form-input ${className}`}
        style={{
          paddingLeft:
            Icon || dollar
              ? 32
              : 10,
        }}
      />
    </div>
  );
}