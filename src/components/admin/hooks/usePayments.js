import useAdminResource from "./useAdminResource";
import { getAllPayments,} from "../../../api/adminApi";

export default function usePayments(
  tab
) {
  const {
    data,
    loading,
    error,
    reload,
  } = useAdminResource(
    tab,
    "payments",
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