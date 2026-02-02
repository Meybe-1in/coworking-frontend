import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import API from "../../api/axiosConfig";
import Swal from "sweetalert2";
import styles from "./ResetPassForm.module.css";


export default function ResetPassForm() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const token = searchParams.get("token");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Las contraseñas no coinciden.",
            });
            return;
        }

        try {
            await API.post("/auth/reset-password", { token, password });
            Swal.fire({
                icon: "success",
                title: "Contraseña restablecida",
                text: "Tu contraseña ha sido actualizada exitosamente.",
            }).then(() => navigate("/login"));
        } catch {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "El enlace es inválido o expiró. Intenta solicitar un nuevo restablecimiento de contraseña.",
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <input 
            
            type="password" 
            placeholder="Nueva contraseña" 
            className={styles.input}
            onChange={(e) => setPassword(e.target.value)} 
            />
            <input 
            type="password" 
            placeholder="Confirmar contraseña" 
            className={styles.input}
            onChange={(e) => setConfirmPassword(e.target.value)} 
            />
            <button type="submit" className={styles.button}>Cambiar contraseña</button>
        </form>
    );
}