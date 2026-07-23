import "./AdminPagination.css";

export default function AdminPagination({
  page,
  totalPages,
  size,
  totalElements,
  onPageChange,
  onSizeChange,
}) {
  return (
    <div className="admin-pagination">

      <div className="admin-pagination-info">
        Mostrando página{" "}
        <strong>{page + 1}</strong>
        {" "}de{" "}
        <strong>{totalPages || 1}</strong>

        <span>
          {" "}({totalElements} registros)
        </span>
      </div>

      <div className="admin-pagination-actions">

        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 0}
        >
          Anterior
        </button>

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page + 1 >= totalPages}
        >
          Siguiente
        </button>

        <select
          value={size}
          onChange={(e) =>
            onSizeChange(Number(e.target.value))
          }
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>

      </div>

    </div>
  );
}