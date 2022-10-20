import React from "react";
import styles from "./Button.module.scss";

export const Button = ({ children, ...props }) => {
  return (
    <button className={styles.button} {...props}>
      <div>{children}</div>
    </button>
  );
};
