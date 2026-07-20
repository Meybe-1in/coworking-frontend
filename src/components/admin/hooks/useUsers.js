import useAdminResource from "./useAdminResource";

import { getUsers, } from "../../../api/adminApi";

export default function useUsers() {
  const {
    data,
    loading,
    error,
    reload,
  } = useAdminResource(
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