import React from "react";
import styles from "./Button.module.css"

function Button({ text, type = "button", onClick, variant = "primary", icon }) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`${styles.btn} ${styles[variant]}`}
        >
            {icon && <span className={styles.icon}>{icon}</span>}
            {text}
        </button>
    );
}
export default Button;