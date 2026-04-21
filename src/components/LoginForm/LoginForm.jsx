import React, { useState } from 'react';
import styles from './LoginForm.module.css';
import InputField from '../InputField/InputField';
import Button from '../Button/Button';
import googleLogo from "../../assets/google.svg";
import { useNavigate } from 'react-router-dom';
import { login, resendVerification } from "../../api/authApi";
import Swal from 'sweetalert2';
import GoogleLoginButton from '../Button/GoogleButton';


function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await login({
        email,
        password,
        rememberMe: remember
      });

      // Limpiar tokens anteriores

      localStorage.clear();
      sessionStorage.clear();

      // Guardar nuevo token

      const storage = remember ? localStorage : sessionStorage;

      storage.setItem("token", res.data.data.token);
      storage.setItem("username", res.data.data.username);
      storage.setItem("role", res.data.data.role);

      navigate("/userdashboard");
    } catch (err) {
      const status = err.response?.status;
      const data = err.response?.data;

      //EMAIL NO VERIFICADO
      if (status === 400 && data?.message === "EMAIL_NOT_VERIFIED") {
        Swal.fire({
          icon: "warning",
          title: "Cuenta no verificada",
          html: `
            <p>Tu cuenta aún no ha sido activada.</p>
            <p>¿Deseas que reenviemos el correo de verificación?</p>
          `,
          showCancelButton: true,
          confirmButtonText: "Reenviar correo",
          cancelButtonText: "Cancelar",
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              await resendVerification(email);

              Swal.fire({
                icon: "success",
                title: "Correo enviado",
                text: "Revisa tu bandeja de entrada.",
              });
            } catch {
              Swal.fire({
                icon: "error",
                title: "Error",
                text: "No se pudo reenviar el correo.",
              });
            }
          }
        });
        return;
      }
    }
    
  };


  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <GoogleLoginButton
        redirectTo="/userdashboard"
        rememberMe={remember}
        text="Log in with Google"
      />

      <div className={styles.divider}></div>

      <InputField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="leslie@pixsellz.io"
      />

      <InputField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="••••••••••••"
      />

      <div className={styles.options}>
        <label className={styles.checkbox}>
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
          />
          <span>Remember me</span>
        </label>
        <a href="/forgot-password" className={styles.forgot}>
          Forgot Password?
        </a>
      </div>

      <Button text="Log in" type="submit" variant="primary" />
    </form>
  );
}

export default LoginForm;