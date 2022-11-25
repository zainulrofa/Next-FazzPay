import React from "react";
import styles from "styles/Button.module.css";

function Button({ variant, text, onClick }) {
  return (
    <div className={`${styles.btn} ${styles[variant]}`} onClick={onClick}>
      <p className={styles["btn-text"]}>{text}</p>
    </div>
  );
}

export default Button;
