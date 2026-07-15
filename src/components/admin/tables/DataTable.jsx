import Loader from "../ui/Loader";
import Err from "../ui/Err";
import AdminTable from "./AdminTable";
import "./Table.css";

export default function DataTable({
  loading,
  error,
  cols,
  rows,
  emptyMsg,
}) {
  return (
    <div className="admin-table-container">
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