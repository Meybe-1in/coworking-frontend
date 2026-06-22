import { useState, useMemo } from "react";
import DataTable from "./DataTable";
import AdminSection from "./AdminSection";
import useRefresh from "../hooks/useRefresh";
import useTableFilters from "../hooks/useTableFilters";

const EMPTY_STATUSES = [
  {
    value: "ALL",
    label: "Todos",
  },
];

const ROLE_OPTIONS = [
  {
    value: "ALL",
    label: "Todos los roles",
  },
  {
    value: "ROLE_USER",
    label: "Usuarios",
  },
  {
    value: "ROLE_ADMIN",
    label: "Administradores",
  },
];

const STATUS_OPTIONS = [
  {
    value: "ALL",
    label: "Todos los estados",
  },
  {
    value: "ACTIVE",
    label: "Activos",
  },
  {
    value: "INACTIVE",
    label: "Inactivos",
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
  const {
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
  } = useTableFilters();

  const {
    refreshing,
    refresh,
  } = useRefresh(reloadUsers);


  const [roleFilter,
    setRoleFilter] =
    useState("ALL");

  const filtered = useMemo(() => {
    return users.filter((user) => {
      const term =
        search.toLowerCase().trim();

      const matchesSearch =
        !term ||
        user.username
          ?.toLowerCase()
          .includes(term) ||
        user.email
          ?.toLowerCase()
          .includes(term);

      const matchesRole =
        roleFilter === "ALL" ||
        user.roles.includes(roleFilter);
      const matchesStatus =
        statusFilter === "ALL" ||
        (statusFilter === "ACTIVE" &&
          user.active) ||
        (statusFilter === "INACTIVE" &&
          !user.active);
      return (
        matchesSearch &&
        matchesRole &&
        matchesStatus);
    });
  }, [users, search, roleFilter, statusFilter]);

  return (
    <div>
      <AdminSection
        title="Usuarios"
        totalCount={users.length}
        filteredCount={filtered.length}
        filters={{
          search,
          setSearch,
          searchPlaceholder: "Buscar...",
          statusFilter,
          setStatusFilter,
          statuses: EMPTY_STATUSES,
          onRefresh: refresh,
          refreshing,
          Icon,
          ICONS,
        }}
        table={{
          loading,
          error,
          cols: userCols,
          rows: filtered,
          emptyMsg: "No hay usuarios registrados",
        }}
      />
    </div>
  );
}