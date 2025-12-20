import React, { useState } from 'react';
import styles from './LoginForm.module.css';
import InputField from '../InputField/InputField';
import Button from '../Button/Button';
import googleLogo from "../../assets/google.svg";
import { useNavigate } from 'react-router-dom';
import API from "../../api/axiosConfig";


function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await API.post("/auth/login", { email, password});

      localStorage.setItem("token", res.data.token);
      if (res.data.username) {
          localStorage.setItem("username", res.data.username);
      }
      
      if (res.data.role) {
          localStorage.setItem("role", res.data.role);
      }
      navigate("/userdashboard");

    } catch (err) {
      console.error("Error en login:", err);

      const message =
        err.response?.data?.message ||
        err.response?.status === 403
          ? "Acceso denegado (403)"
          : "Credenciales incorrectas";
      setError(message);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Button
        text="Log in with Google"
        variant="google"
        icon={<img src={googleLogo} alt="Google" />}
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