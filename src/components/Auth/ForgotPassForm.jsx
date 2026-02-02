import { useState } from "react";
import API from "../../api/axiosConfig";
import Swal from "sweetalert2";
import styles from "./ForgotPassForm.module.css";

export default function ForgotPassForm() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/forgot-password", { email });
      Swal.fire({
        icon: "success",
        title: "Correo enviado",
        text: "Si el correo existe, te enviamos un enlace para restablecer tu contraseña.",
      });
    } catch {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo procesar la solicitud. Intenta más tarde.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input type="email"
        className={styles.input} 
        placeholder="Ingresa tu correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit" className={styles.button}>Enviar enlace</button>
    </form>
  );
}