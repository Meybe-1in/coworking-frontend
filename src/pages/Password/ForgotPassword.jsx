import ForgotPassForm from "../../components/Auth/ForgotPassForm";
import "./Auth.css"

export default function ForgotPassword() {
    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2>¿Olvidaste tu contraseña?</h2>
                <p>Ingresa tu correo electrónico para recibir un enlace de restablecimiento de contraseña.</p>
                <ForgotPassForm />
            </div>
        </div>
    );
}