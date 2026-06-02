import AdminTable from "./AdminTable";
import Loader from "../ui/Loader";
import Err from "../ui/Err";

export default function ReservationsTable({
  reservations,
  loading,
  error,
  reloadReservations,
  resCols,
  Icon,
  ICONS,
}) {
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <div>
          <h1
            style={{
              fontSize: 20,
              fontWeight: 700,
              marginBottom: 2,
            }}
          >
            Reservas
          </h1>

          <p
            style={{
              fontSize: 13,
              color: "#9ca3af",
            }}
          >
            {reservations.length} reservas en total
          </p>
        </div>

        <button
          onClick={reloadReservations}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 7,
            padding: "8px 14px",
            border: "1px solid #e5e7eb",
            borderRadius: 8,
            background: "#fff",
            cursor: "pointer",
            fontSize: 13,
            fontWeight: 500,
            color: "#6b7280",
          }}
        >
          <Icon d={ICONS.refresh} size={14} />
          Actualizar
        </button>
      </div>

      <div
        style={{
          background: "#fff",
          borderRadius: 14,
          border: "1px solid #f0f0f0",
          overflow: "hidden",
        }}
      >
        {loading && <Loader />}

        {error && <Err msg={error} />}

        {!loading && !error && (
          <AdminTable
            cols={resCols}
            rows={reservations}
            emptyMsg="No hay reservas aún"
          />
        )}
      </div>
    </div>
  );
}