import Badge from "../ui/Badge";
import { idColumn } from "../../../helpers/admin/tableColumns";
import RoleBadge from "../ui/RoleBadge";

export const userColumns = [

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
];