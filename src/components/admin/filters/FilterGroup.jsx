import "./TableFilters.css";

export default function FilterGroup({
  label,
  children,
}) {
  return (
    <div className="filter-group">
      <label className="filter-label">
        {label}
      </label>

      {children}
    </div>
  );
}