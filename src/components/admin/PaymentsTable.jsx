import AdminTable from "./AdminTable";
import Loader from "./Loader";
import Err from "./Err";

export default function PaymentsTable({
  payments,
  loading,
  error,
  load,
  setPayments,
  getAllPayments,
  payCol,
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
            Pagos
          </h1>

          <p
            style={{
              fontSize: 13,
              color: "#9ca3af",
            }}
          >
            {payments.length} transacciones
          </p>
        </div>

        <button
          onClick={() =>
            load(
              "payments",
              getAllPayments,
              setPayments
            )
          }
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
            cols={payCol}
            rows={payments}
            emptyMsg="No hay pagos registrados"
          />
        )}
      </div>
    </div>
  );
}