import ResetPassForm from "../../components/Auth/ResetPassForm";
import "./Auth.css"

export default function ResetPassword() {
    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2>Restablecer contraseña</h2>
                <p>Ingresa tu nueva contraseña a continuación.</p>
                <ResetPassForm />
            </div>
        </div>
    );
}