import Badge from "../ui/Badge";
import { idColumn } from "../../../helpers/admin/tableColumns";
import RoleBadge from "../ui/RoleBadge";
import { fmtDate } from "../../../helpers/admin/formatters";
import UserActions from "../users/UserActions";
import UserStatusToggle from "../users/UserStatusToggle";
import "../styles/admin-layout.css";

export const userColumns = (onToggleStatus, onChangeRole, isCurrentUsername, onEditUser) => [

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
    key: "emailVerified",
    label: "Verificación",
    render: (u) => (
      <Badge
        active={u.emailVerified}
        activeText="Verificado"
        inactiveText="Pendiente"
      />
    ),
  },
  
  {
    key: "enabled",
    label: "Estado",
    render: (u) => (
      <div className="admin-inline-actions">
      <Badge
        active={u.enabled}
        activeText="Activo"
        inactiveText="Inactivo"
      />
      <UserStatusToggle
        user={u}
        onToggleStatus={onToggleStatus}
        isCurrentUsername={
          u.username === isCurrentUsername
        }
      />
      </div>
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
      <div className="admin-center-cell">
      <UserActions
        user={u}
        onChangeRole={onChangeRole}
        onEditUser={onEditUser}
        isCurrentUsername= {
          u.username === isCurrentUsername
        }
      />
      </div>
    ),
  },
];