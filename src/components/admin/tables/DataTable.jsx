import Loader from "../ui/Loader";
import Err from "../ui/Err";
import AdminTable from "./AdminTable";

export default function DataTable({
  loading,
  error,
  cols,
  rows,
  emptyMsg,
}) {
  return (
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
          cols={cols}
          rows={rows}
          emptyMsg={emptyMsg}
        />
      )}
    </div>
  );
}