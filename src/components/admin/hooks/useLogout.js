import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { clearAuth } from "../../../utils/authStorage";

export default function useLogout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "¿Cerrar sesión?",
      text: "Tu sesión actual finalizará.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Cerrar sesión",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#111827",
    });

    if (!result.isConfirmed) {
      return;
    }

    clearAuth();

    navigate("/Login", {
      replace: true,
    });
  };

  return {
    handleLogout,
  };
}