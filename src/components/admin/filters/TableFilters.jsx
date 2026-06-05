import {
  CONTROL_HEIGHT,
  inputStyle,
  buttonStyle,
} from "./filterStyles";

export default function TableFilters({
  title,
  totalCount,
  filteredCount,
  search,
  setSearch,
  searchPlaceholder,
  statusFilter,
  setStatusFilter,
  statuses,
  onRefresh,
  refreshing,
  Icon,
  ICONS,
}) {
  return (
    <>
      <style>
        {`
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
          marginBottom: 20,
        }}
      >
        <div>
          <h1
            style={{
              fontSize: 20,
              fontWeight: 700,
              margin: 0,
              lineHeight: 1.2,
            }}
          >
            {title}
          </h1>

          <p
            style={{
              fontSize: 13,
              color: "#9ca3af",
              margin: "3px 0 0",
            }}
          >
            Mostrando {filteredCount} de {totalCount}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            style={{
              ...inputStyle,
              width: 220,
            }}
          />

          <div
            style={{
              position: "relative",
              height: CONTROL_HEIGHT,
              display: "flex",
              alignItems: "center",
            }}
          >
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(
                  e.target.value
                )
              }
              style={{
                ...inputStyle,
                minWidth: 160,
                paddingRight: 30,
                appearance: "none",
                WebkitAppearance:
                  "none",
                cursor: "pointer",
              }}
            >
              {statuses.map((s) => (
                <option
                  key={s.value}
                  value={s.value}
                >
                  {s.label}
                </option>
              ))}
            </select>

            <svg
              viewBox="0 0 10 6"
              width="10"
              height="6"
              style={{
                position: "absolute",
                right: 10,
                top: "50%",
                transform:
                  "translateY(-50%)",
                pointerEvents: "none",
                fill: "none",
                stroke: "#9ca3af",
                strokeWidth: 1.6,
                strokeLinecap: "round",
                strokeLinejoin: "round",
              }}
            >
              <path d="M1 1l4 4 4-4" />
            </svg>
          </div>

          <button
            onClick={onRefresh}
            disabled={refreshing}
            style={{
              ...buttonStyle,
              opacity:
                refreshing ? 0.6 : 1,
            }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                animation: refreshing
                  ? "spin 1s linear infinite"
                  : "none",
              }}
            >
              <Icon
                d={ICONS.refresh}
                size={14}
              />
            </span>

            Actualizar
          </button>
        </div>
      </div>
    </>
  );
}