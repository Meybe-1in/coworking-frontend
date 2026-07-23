import useAdminResource from "./useAdminResource";

import { getUsers, } from "../../../api/adminApi";

export default function useUsers() {
  const {
    data,
    loading,
    error,
    reload,
    page,
    size,
    totalPages,
    totalElements,
    setPage,
    setSize,
  } = useAdminResource(
    getUsers,
    "Error al cargar usuarios"
  );

  return {
    users: data,
    loading,
    error,
    page,
    size,
    totalPages,
    totalElements,
    setPage,
    setSize,
    reloadUsers: reload,
  };
}