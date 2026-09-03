import { useState } from "react";
import UsersTable from "../../components/admin/tables/UsersTable";
import { userColumns, } from "../../components/admin/columns/userColumns";

import useUsers from "../../components/admin/hooks/useUsers";
import useUserActions from "../../components/admin/hooks/useUserActions";

import EditUserModal from "../../components/admin/users/EditUserModal";

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
    editUser,
  } = useUserActions(
    reloadUsers
  );

  const [selectedUser, setSelectedUser] =
    useState(null);

  const isCurrentUsername =
    localStorage.getItem("username") ||
    sessionStorage.getItem("username");

  const handleEditUser = (user) => {
    setSelectedUser(user);
  };

  const handleCloseEdit = () => {
    setSelectedUser(null);
  };

  const handleUpdateUser = async (
    userId,
    userData
  ) => {
    return await editUser(
      userId,
      userData
    );
  };
  return (
    <>
      <UsersTable
        users={users}
        loading={loading}
        error={error}
        reloadUsers={reloadUsers}
        userCols={userColumns(
          toggleStatus,
          changeRole,
          isCurrentUsername,
          handleEditUser
        )}
        Icon={Icon}
        ICONS={ICONS}
      />

    {/* Modal para editar usuario */}
      <EditUserModal
        open={!!selectedUser}
        onClose={handleCloseEdit}
        user={selectedUser}
        onSubmit={handleUpdateUser}
      />
    </>
  );
}