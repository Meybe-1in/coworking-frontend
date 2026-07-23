import useAdminResource from "./useAdminResource";
import { getAllPayments,} from "../../../api/adminApi";

export default function usePayments() {
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
    getAllPayments,
    "Error al cargar pagos"
  );

  return {
    payments: data,
    loading,
    error,
    page,
    size,
    totalPages,
    totalElements,
    setPage,
    setSize,
    reloadPayments: reload,
  };
}