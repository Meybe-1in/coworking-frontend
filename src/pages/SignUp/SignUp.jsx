import React from "react";
import { Link } from "react-router-dom";
import styles from "../SignUp/SignUp.module.css"
import SignUpForm from "../../components/SignupForm/SignUpForm";
import backgroundImg from "../../assets/background.png";

function SignUp() {
  return (
    <div className={styles.signUpPage}>
      <div className={styles.formPanel}>
        <h1 className={styles.title}>Sign Up</h1>
        <SignUpForm />
        <p className={styles.footer}>
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>

      <div className={styles.imagePanel}>
        <img src={backgroundImg} alt="Coworking" className={styles.image} />
      </div>
    </div>
  );
}

export default SignUp;