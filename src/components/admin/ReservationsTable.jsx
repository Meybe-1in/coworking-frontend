import AdminTable from "./AdminTable";
import Loader from "./Loader";
import Err from "./Err";

export default function ReservationsTable({
  reservations,
  loading,
  error,
  load,
  setReservations,
  getAllReservations,
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
          onClick={() =>
            load(
              "reservations",
              getAllReservations,
              setReservations
            )
          }
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