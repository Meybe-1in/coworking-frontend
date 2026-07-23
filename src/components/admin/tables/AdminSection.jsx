import TableFilters from "../filters/TableFilters";
import DataTable from "./DataTable";
import usePagination from "../hooks/usePagination";

export default function AdminSection({
  title,
  totalCount,
  filteredCount,
  filters,
  table,
}) {

  const pagination = usePagination(table.rows);

  return (
    <>
      <TableFilters
        {...filters}
        title={title}
        totalCount={totalCount}
        filteredCount={filteredCount}
      />

      <DataTable
        {...table}

        rows={pagination.paginatedItems}

        page={pagination.page}
        size={pagination.size}

        totalPages={pagination.totalPages}
        totalElements={pagination.totalElements}

        onPageChange={pagination.changePage}
        onSizeChange={pagination.changeSize}
      />
    </>
  );
}