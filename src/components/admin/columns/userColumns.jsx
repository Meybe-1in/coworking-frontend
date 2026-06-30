import Badge from "../ui/Badge";
import { idColumn } from "../../../helpers/admin/tableColumns";
import RoleBadge from "../ui/RoleBadge";
import { fmtDate } from "../../../helpers/admin/formatters";
import UserActions from "../users/UserActions";

export const userColumns = (handleToggleStatus) => [

  idColumn,

  {
    key: "username",
    label: "Usuario",
  },

  {
    key: "email",
    label: "Correo",
  },

  {
    key: "roles",
    label: "Rol",
    render: (u) =>
      u.roles.map((role) => (
        <RoleBadge key={role} role={role} />
      )),
  },

  {
    key: "enabled",
    label: "Estado",
    render: (u) => (
      <Badge
        active={u.enabled}
        activeText="Activo"
        inactiveText="Inactivo"
      />
    ),
  },

  {
    key: "createdAt",
    label: "Fecha registro",
    render: (u) => fmtDate(u.createdAt),
  },

  {
    key: "actions",
    label: "Acciones",
    render: (u) => (
      <UserActions
        user={u}
        onToggleStatus={
          handleToggleStatus
        }
      />
    ),
  },
];