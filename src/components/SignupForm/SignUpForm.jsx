import React, { useState } from 'react';
import styles from "../SignupForm/SignUpForm.module.css"
import InputField from '../InputField/InputField';
import Button from '../Button/Button';
import googleLogo from "../../assets/google.svg";
import API from '../../api/axiosConfig';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


function SignUpForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordValid, setPasswordValid] = useState(true);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._-])[A-Za-z\d@$!%*?&._-]{8,}$/;

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (!emailRegex.test(value)) {
      setEmailError("Ingresa un email válido");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = (value) => {
    setPassword(value);
    setPasswordValid(strongPasswordRegex.test(value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!termsAccepted) {
      setError("Debes aceptar los términos y condiciones para continuar.");
      return;
    }

    try {
      const res = await API.post("/auth/register", {
        username, email, password, termsAccepted
      });

      const data = res.data;
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);
      localStorage.setItem("role", data.role);
      alert("Registro exitoso.");
      navigate("/Login");
    } catch (err) {
      console.error(err);

      const backendError = err.response?.data;

      if (backendError?.message) {
        setError(backendError.message);          // Mensaje del backend
      } else if (typeof backendError === "string") {
        setError(backendError);                  // Si backend envía string
      } else {
        setError("Error en el registro");        // Default
      }
    }

  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {error && (
        <div className={styles.alert}>
          {error}
        </div>
      )}

      <Button
        text="Sign up with Google"
        variant="google"
        icon={<img src={googleLogo} alt="Google" />}
      />

      <div className={styles.divider}></div>

      <InputField
        label="Usename"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Leslie"
      />

      <InputField
        label="Email"
        type="email"
        value={email}
        onChange={handleEmailChange}
        placeholder="example@mail.com"
      />

      {emailError && (
        <p className={styles.error}>{emailError}</p>
      )}

      <InputField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => validatePassword(e.target.value)}
        placeholder="at least 8 characteres"
      />

      {!passwordValid && (
        <p className={styles.error}>
          La contraseña debe contener mayúscula, minúscula, número y símbolo.
        </p>
      )}

      <div className={styles.options}>
        <label className={styles.checkbox}>
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            className={!termsAccepted && error ? "error" : ""}
          />
          <span>
            I agree with{" "}
            <Link to="/terms" className="text-blue-600 hover:underline">
              Terms
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="text-blue-600 hover:underline">
              Privacy Policy
            </Link>
          </span>
        </label>

      </div>

      <Button
        text="Sign up"
        type="submit"
        variant="primary"
      />
    </form>
  );
}

export default SignUpForm;