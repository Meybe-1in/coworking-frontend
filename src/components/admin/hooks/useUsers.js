import useAdminResource from "./useAdminResource";

import { getUsers, } from "../../../api/adminApi";

export default function useUsers(
  tab
) {
  const {
    data,
    loading,
    error,
    reload,
  } = useAdminResource(
    tab,
    "users",
    getUsers,
    "Error al cargar usuarios"
  );

  return {
    users: data,
    loading,
    error,
    reloadUsers: reload,
  };
}