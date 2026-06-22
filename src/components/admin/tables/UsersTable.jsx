import { useState } from "react";

import Loader from "../ui/Loader";
import Err from "../ui/Err";
import AdminTable from "./AdminTable";
import TableFilters from "../filters/TableFilters";

const EMPTY_STATUSES = [
  {
    value: "ALL",
    label: "Todos",
  },
];

export default function UsersTable({
  users,
  loading,
  error,
  reloadUsers,
  userCols,
  Icon,
  ICONS,
}) {
  const [refreshing, setRefreshing] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [statusFilter,
    setStatusFilter] =
    useState("ALL");

  const handleRefresh =
    async () => {
      setRefreshing(true);

      await reloadUsers();

      setRefreshing(false);
    };

  return (
    <div>
      <TableFilters
        title="Usuarios"
        totalCount={users.length}
        filteredCount={users.length}
        search={search}
        setSearch={setSearch}
        searchPlaceholder="Buscar..."
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        statuses={EMPTY_STATUSES}
        onRefresh={handleRefresh}
        refreshing={refreshing}
        Icon={Icon}
        ICONS={ICONS}
      />

      <div
        style={{
          background: "#fff",
          borderRadius: 14,
          border: "1px solid #f0f0f0",
          overflow: "hidden",
        }}
      >
        {loading && <Loader />}

        {error && (
          <Err msg={error} />
        )}

        {!loading &&
          !error && (
            <AdminTable
              cols={userCols}
              rows={users}
              emptyMsg="No hay usuarios registrados"
            />
          )}
      </div>
    </div>
  );
}