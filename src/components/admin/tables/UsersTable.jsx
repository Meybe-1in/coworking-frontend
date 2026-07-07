import { useState, useMemo } from "react";
import DataTable from "./DataTable";
import AdminSection from "./AdminSection";
import useRefresh from "../hooks/useRefresh";
import useTableFilters from "../hooks/useTableFilters";
import CreateAdminModal from "../users/CreateAdminModal";

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

  const [
    showCreateModal,
    setShowCreateModal,
  ] = useState(false);

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
          user.enabled) ||
        (statusFilter === "INACTIVE" &&
          !user.enabled);
      return (
        matchesSearch &&
        matchesRole &&
        matchesStatus);
    });
  }, [users, search, roleFilter, statusFilter]);

  //handler
  const handleCreateAdmin =
    () => {
      setShowCreateModal(true);
    };

  //filters
  const tableFilters = [
    {
      key: "role",
      label: "Rol",
      value: roleFilter,
      onChange: setRoleFilter,
      options: ROLE_OPTIONS,
    },
    {
      key: "status",
      label: "Estado",
      value: statusFilter,
      onChange: setStatusFilter,
      options: STATUS_OPTIONS,
    },
  ];

  return (
    <div>
      <AdminSection
        title="Usuarios"
        totalCount={users.length}
        filteredCount={filtered.length}
        filters={{
          search,
          setSearch,
          searchPlaceholder: "Buscar usuario o correo...",

          filters: [
            {
              key: "role",
              label: "Rol",
              value: roleFilter,
              onChange: setRoleFilter,
              options: ROLE_OPTIONS,
            },
            {
              key: "status",
              label: "Estado",
              value: statusFilter,
              onChange: setStatusFilter,
              options: STATUS_OPTIONS,
            },
          ],

          onRefresh: refresh,
          refreshing,

          onCreate: handleCreateAdmin,
          createLabel: "Crear administrador",

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
      <CreateAdminModal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        reloadUsers={reloadUsers}
      />
    </div>
  );
}