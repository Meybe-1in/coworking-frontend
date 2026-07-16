export default function AdminField({
  label,
  hint,
  error,
  children,
}) {
  return (
    <div className="admin-form-field">

      <label className="admin-form-label">
        {label}

        {hint && (
          <span className="admin-form-hint">
            {hint}
          </span>
        )}
      </label>

      {children}

      {error && (
        <p className="admin-form-error">
          {error}
        </p>
      )}

    </div>
  );
}