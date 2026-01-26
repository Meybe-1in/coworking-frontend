import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Verify.module.css";

export default function VerifySuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className={styles.container}>
      <h1>Cuenta verificada</h1>
      <p>Tu cuenta ha sido verificada correctamente.</p>
      <p>Serás redirigido al login en unos segundos…</p>

      <button onClick={() => navigate("/login")}>
        Ir al login ahora
      </button>
    </div>
  );
}
