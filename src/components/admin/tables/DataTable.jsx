import Loader from "../ui/Loader";
import Err from "../ui/Err";
import AdminTable from "./AdminTable";
import AdminPagination from "./AdminPagination";
import "./Table.css";

export default function DataTable({
  loading,
  error,
  cols,
  rows,
  emptyMsg,

  page,
  size,
  totalPages,
  totalElements,

  onPageChange,
  onSizeChange,
}) {
  return (
    <div className="admin-table-container">
      {loading && <Loader />}

      {error && <Err msg={error} />}

      {!loading && !error && (
        <>
          <AdminTable
            cols={cols}
            rows={rows}
            emptyMsg={emptyMsg}
          />

          <AdminPagination
            page={page}
            size={size}
            totalPages={totalPages}
            totalElements={totalElements}
            onPageChange={onPageChange}
            onSizeChange={onSizeChange}
          />
        </>
      )}
    </div>
  );
}