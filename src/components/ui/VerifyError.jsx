import { useNavigate } from "react-router-dom";
import styles from "./Verify.module.css";

export default function VerifyError() {
  const navigate = useNavigate();
  useEffect(() => {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 5000);
  
      return () => clearTimeout(timer);
    }, [navigate]);

  return (
    <div className={styles.container}>
      <h1>Enlace inválido</h1>
      <p>El enlace ha expirado o no es válido.</p>
      <p>Puedes solicitar uno nuevo desde el login.</p>

      <button onClick={() => navigate("/login")}>
        Ir al login ahora
      </button>
    </div>
  );
}

