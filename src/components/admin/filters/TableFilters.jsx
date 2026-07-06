import "./TableFilters.css";

import { inputStyle, buttonStyle } from "./filterStyles";
import { Plus } from "lucide-react";
import FiltersDropdown from "./FiltersDropdown";
import FilterSelect from "./FilterSelect";
import FilterGroup from "./FilterGroup";

export default function TableFilters({
  title,
  totalCount,
  filteredCount,

  search,
  setSearch,
  searchPlaceholder,

  filters = [],

  onRefresh,
  refreshing,

  onCreate,
  createLabel,

  onExport,
  exportLabel = "Exportar CSV",

  Icon,
  ICONS,
}) {
  return (
    <div className="table-filters">
      <div className="table-filters__info">
        <h1>{title}</h1>

        <p>
          Mostrando {filteredCount} de {totalCount}
        </p>
      </div>

      <div className="table-filters__actions">
        <input
          type="text"
          placeholder={searchPlaceholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="table-filters__search"
          style={inputStyle}
        />

        <FiltersDropdown>
          {filters.map((filter) => (
            <div
              key={filter.key}
              className="table-filters__filter"
            >
              <FilterGroup label={filter.label}>
                <FilterSelect
                  value={filter.value}
                  onChange={filter.onChange}
                  options={filter.options}
                  minWidth={220}
                />
              </FilterGroup>
            </div>
          ))}
        </FiltersDropdown>

        <button
          onClick={onRefresh}
          disabled={refreshing}
          style={buttonStyle}
          className={refreshing ? "table-filters__refreshing" : ""}
        >
          <span
            className={`table-filters__icon ${
              refreshing ? "table-filters__icon--spin" : ""
            }`}
          >
            <Icon
              d={ICONS.refresh}
              size={14}
            />
          </span>

          Actualizar
        </button>

        {onCreate && (
          <button
            onClick={onCreate}
            style={buttonStyle}
            className="table-filters__create"
          >
            <Plus size={16} />
            {createLabel}
          </button>
        )}

        {onExport && (
          <button
            onClick={onExport}
            style={buttonStyle}
          >
            {exportLabel}
          </button>
        )}
      </div>
    </div>
  );
}