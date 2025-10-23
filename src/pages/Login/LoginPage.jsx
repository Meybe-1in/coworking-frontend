import React from "react";
import styles from "./LoginPage.module.css";
import LoginForm from "../../components/LoginForm/LoginForm";
import backgroundImg from "../../assets/background.png";

function LoginPage() {
  return (
    <div className={styles.loginPage}>
      <div className={styles.formPanel}>
        <h1 className={styles.title}>Log in</h1>
        <LoginForm />
        <p className={styles.footer}>
          Don’t have an account? <a href="/register">Sign up</a>
        </p>
      </div>

      <div className={styles.imagePanel}>
        <img src={backgroundImg} alt="Coworking" className={styles.image} />
      </div>
    </div>
  );
}

export default LoginPage;