import React,  from "react";
import { cn } from "../../lib/helpers";
import styles from "./Button.module.scss";

export const Button = ({ children, className, ...props }) => {
  return (
    <button className={cn(className, styles.button)} {...props}>
      <div>{children}</div>
    </button>
  );
};
