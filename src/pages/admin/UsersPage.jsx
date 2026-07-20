import UsersTable from "../../components/admin/tables/UsersTable";
import { userColumns, } from "../../components/admin/columns/userColumns";

import useUsers from "../../components/admin/hooks/useUsers";
import useUserActions from "../../components/admin/hooks/useUserActions";

import Icon from "../../components/admin/ui/Icon";
import { ICONS } from "../../helpers/admin/icons";

export default function UsersPage() {
  const {
    users,
    loading,
    error,
    reloadUsers,
  } = useUsers();

  const {
    toggleStatus,
    changeRole,
  } = useUserActions(
    reloadUsers
  );

  const isCurrentUsername =
    localStorage.getItem("username") ||
    sessionStorage.getItem("username");

  return (
    <UsersTable
      users={users}
      loading={loading}
      error={error}
      reloadUsers={reloadUsers}
      userCols={userColumns(
        toggleStatus,
        changeRole,
        isCurrentUsername
      )}
      Icon={Icon}
      ICONS={ICONS}
    />
  );
}