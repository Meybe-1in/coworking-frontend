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
  const [password, setPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
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
      setError(err.response?.data || "Error en el registro");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
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
        onChange={(e) => setEmail(e.target.value)}
        placeholder="example@mail.com"
      />

      <InputField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="at least 8 characteres"
      />

      <div className={styles.options}>
        <label className={styles.checkbox}>
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
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