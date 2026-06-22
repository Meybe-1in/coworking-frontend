import TableFilters from "../filters/TableFilters";
import DataTable from "./DataTable";

export default function AdminSection({
  title,
  totalCount,
  filteredCount,
  filters,
  table,
}) {
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
      />
    </>
  );
}