import useAdminResource from "./useAdminResource";
import { getAllPayments,} from "../../../api/adminApi";

export default function usePayments() {
  const {
    data,
    loading,
    error,
    reload,
  } = useAdminResource(
    getAllPayments,
    "Error al cargar pagos"
  );

  return {
    payments: data,
    loading,
    error,
    reloadPayments: reload,
  };
}